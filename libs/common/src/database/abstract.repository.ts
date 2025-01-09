import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly repository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async create(entity: Partial<T>): Promise<Partial<T>> {
    return await this.entityManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne({ where });

    if (!entity) {
      this.logger.warn(`Could not find entity by ${JSON.stringify(where)}`);
      throw new NotFoundException(`Entity not found.`);
    }

    return entity;
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.findBy(where);
  }

  async update(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.repository.update(where, partialEntity);

    if (!updateResult.affected) {
      this.logger.warn(`Could not find entity by ${JSON.stringify(where)}`);
      throw new NotFoundException(`Entity not found.`);
    }

    return this.findOne(where);
  }

  async delete(where: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(where);
  }
}
