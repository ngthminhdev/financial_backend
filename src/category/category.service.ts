import {Injectable} from '@nestjs/common';
import {PostgresqlService} from 'src/postgresql/postgresql.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly postgresService: PostgresqlService,
  ) {}

  async getList() {
    const data = await this.postgresService.execute(`SELECT * FROM public.category ORDER BY modified_at ASC LIMIT 100 `);
    return data;

  }
}
