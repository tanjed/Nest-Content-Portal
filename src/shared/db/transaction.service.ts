import { Injectable, Scope } from '@nestjs/common';
import { DataSource, QueryRunner, DataSourceOptions } from 'typeorm';

@Injectable({ scope: Scope.DEFAULT })
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Execute a callback within a database transaction.
   * The callback receives a QueryRunner that can be passed to repositories
   * to execute operations within the same transaction.
   *
   * @param callback Function to execute within transaction
   * @returns Result of the callback
   */
  async execute<T>(callback: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Create a new QueryRunner for manual transaction management.
   * Useful when you need more control over the transaction lifecycle.
   *
   * Remember to call: connect, startTransaction, commit/rollback, and release
   */
  createQueryRunner(): QueryRunner {
    return this.dataSource.createQueryRunner();
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
