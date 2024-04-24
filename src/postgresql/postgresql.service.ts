import {
  Global,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common';
import {Client, QueryArrayResult} from 'pg';

import {userScript} from "../sql/user-sql";

import {RetryTime} from 'src/enums';
import {categoryScript} from 'src/sql/category-sql';
import {goatScript} from 'src/sql/goat-sql';
import {memberShipScript} from 'src/sql/member-ship-sql';
import {transactionHistoryScript} from 'src/sql/transaction-history-sql';
import {walletScript} from 'src/sql/wallet-sql';
import {userConfigScript} from 'src/sql/user-config-sql';
import {userCategoryScript} from 'src/sql/user-category-sql';

@Global()
@Injectable()
export class PostgresqlService implements OnModuleInit, OnModuleDestroy {
  private postgresClient: Client;
  logger = new Logger('PostgreSQL Service');
  isConnected: Boolean = false;
  async onModuleInit() {
    if (this.isConnected) return;
    await this.connectPostgreSQL();

    this.logger.log('Start initing tables...');
    if (this.isConnected) {
      await this.initTables();
    }
    this.logger.log('Init tables successfully');
  }

  async onModuleDestroy() {
    await this.postgresClient.end();
  }

  private async initTables() {
    // const userTableScript = await fs.readFileSync(join(__dirname, '..', '/sql/user.sql'));
    await this.postgresClient.query(userScript);
    this.logger.log('Init table USER successfully!')
    await this.postgresClient.query(userConfigScript);
    this.logger.log('Init table USER_CONFIG successfully!')
    await this.postgresClient.query(memberShipScript);
    this.logger.log('Init table MEMBER_SHIP successfully!')
    await this.postgresClient.query(categoryScript);
    this.logger.log('Init table CATEGORY successfully!')
    await this.postgresClient.query(walletScript);
    this.logger.log('Init table GOAT successfully!')
    await this.postgresClient.query(goatScript);
    this.logger.log('Init table WALLET successfully!')
    await this.postgresClient.query(transactionHistoryScript);
    this.logger.log('Init table TRANSACTION_HISTORY successfully!')
    await this.postgresClient.query(userCategoryScript);
    this.logger.log('Init table USER_CATEGORY successfully!')
  }

  private async connectPostgreSQL() {
    let retryTime = RetryTime.Init;
    const maxRetry = RetryTime.Ten;

    while (!this.isConnected && retryTime < maxRetry) {
      try {
        this.logger.log('Connecting to PostgreSQL...');
        this.postgresClient = new Client({
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          connectionTimeoutMillis: 5000,
          keepAlive: true,

        });
        await this.postgresClient.connect();
        this.isConnected = true;
        this.logger.log('Connect to PostgreSQL successfully');
      } catch (e) {
        this.isConnected = false;
        retryTime++;
        this.logger.error(`Error connecting to PostgreSQL at ${retryTime} times: ${e}`);
      }
    }
  }

  async execute<T>(text: string, values?: any[]): Promise<T[]> {
    const result: QueryArrayResult<T[]> = await this.postgresClient.query(
      text,
      values,
    );
    return result.rows as T[];
  }

  async executeDetail<T>(text: string, values?: any[]): Promise<QueryArrayResult<T[]>> {
    const result: QueryArrayResult<T[]> = await this.postgresClient.query(
      text,
      values,
    );
    return result;
  }

}
