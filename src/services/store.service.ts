import { createClient } from "redis";
import { Entity, Repository, Schema } from "redis-om";

type EntityType<T> = { key: keyof T; value: T[keyof T] };
type ClientType = ReturnType<typeof createClient>;
export class StoreService extends Repository {
  constructor(schema: Schema, client: ClientType) {
    super(schema, client);
  }

  async findOne({ key, value }: EntityType<Entity>) {
    return await super
      .search()
      .where(key as string)
      .equals(value as string)
      .return.first();
  }
}
