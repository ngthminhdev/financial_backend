import {HttpStatus, Injectable} from '@nestjs/common';
import * as moment from 'moment';
import {Sort} from 'src/enums';

import {ExceptionResponse} from 'src/exceptions/common.exception';
import {getSortType} from 'src/helpers/functional.helper';
import {ICategory} from 'src/postgresql/interfaces/category.interface';
import {ITCategoryGroup} from 'src/postgresql/interfaces/transaction-category-group.interface';
import {ITransactionHistory} from 'src/postgresql/interfaces/transaction_history.interface';
import {IWallet} from 'src/postgresql/interfaces/wallet.interface';
import {PostgresqlService} from 'src/postgresql/postgresql.service';
import {TransactionType} from './constants';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {TransactionListDto} from './dto/get-list.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly pg: PostgresqlService,
  ) {}

  async create(userId: string, body: CreateTransactionDto) {
    const {
      amount,
      category_id: categoryId,
      wallet_id: walletId,
      goat_id: goatId,
      date,
      note,
      type,
    } = body;

    const [[wallet], [category]] = await Promise.all([
      this.pg.execute<IWallet>(`SELECT id, balance FROM public.wallet WHERE id = $1`, [walletId]),
      this.pg.execute<ICategory>(`SELECT id FROM public.category WHERE id = $1`, [categoryId]),
      // this.pg.execute<IGoat>(`SELECT id FROM public.goat WHERE id = $1`, [goatId]),
    ]);

    if (!wallet) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Ví không tồn tại');
    }

    if (!category) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Danh mục không tồn tại');
    }

    const amountInstance = type == TransactionType.Income ? amount : -amount;
    const currentBalance = +wallet.balance;
    const newBalance = currentBalance + amountInstance;

    await Promise.all([
      this.pg.execute(`
        INSERT INTO public.transaction_history (user_id, wallet_id, category_id, type, date, amount, balance_from, balance_to, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `
        , [userId, walletId, categoryId, type, date, amountInstance, currentBalance, newBalance, note,]),
      this.pg.execute(`UPDATE public.wallet SET balance = $1 WHERE id = $2`, [newBalance, walletId]),
    ])

    return null;
  }

  async getList(userId: string, query: TransactionListDto) {
    const {
      skip = 0,
      limit = 50,
      sort_by: sortBy = 'date',
      sort_type: sortType = Sort.Desc,
      wallet_id: walletId,
    } = query;

    const pgSortType = getSortType(sortType);
  
    const [ data, [count] ] = await Promise.all([
      this.pg.execute<ITransactionHistory>(`
        SELECT 
          t.*, 
          c.icon as icon, 
          c.name as category_name
        FROM public.transaction_history t
        INNER JOIN public.category c
          ON t.category_id = c.id
        WHERE user_id = $1 AND wallet_id = $2
        ORDER BY ${sortBy} ${pgSortType}, created_at DESC
        OFFSET $3
        LIMIT $4
      `, [userId, walletId, skip, limit]
      ),
      this.pg.execute<Record<string, number>>(`
        SELECT count(*) AS total FROM public.transaction_history
        WHERE user_id = $1 AND wallet_id = $2
      `, [userId, walletId]
      ),
    ])

    return {
      skip: +skip,
      total: +count.total || 0,
      data
    }
  } 


  async getCategoryTransaction(userId: string, query: TransactionListDto) {
    const {
      wallet_id: walletId,
      type = TransactionType.Spent,
      from_date: fromDate = moment().startOf('month').format('YYYY/MM/DD'),
      to_date: toDate = moment().endOf('month').format('YYYY/MM/DD'),
    } = query;

  
    const data = await this.pg.execute<ITCategoryGroup>(`
        SELECT 
              c.id as id,
              c.name as name,
              SUM(t.amount) as amount_used
          FROM public.transaction_history t
          INNER JOIN public.category c
          ON t.category_id = c.id
          WHERE t.wallet_id = $1
          AND date >= '${fromDate}' AND date <= '${toDate}'
          AND t.type = ${type}
          GROUP BY c.id, c.name
          ORDER BY amount_used ASC;
      `, [walletId]
      );

    return data;
  } 
}
