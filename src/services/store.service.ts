import { createClient } from "redis";
import { Entity, EntityData, Repository } from "redis-om";
import { tokenSchema } from "../models/token.model";
import { userSchema } from "../models/users.model";

type EntityType<T> = { key: keyof T; value: T[keyof T] };

class StoreService {
  client = createClient();
  tokenRepository = new Repository(tokenSchema, this.client);
  userRepository = new Repository(userSchema, this.client);
  connect = async () => {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
    await this.tokenRepository.createIndex();
    await this.userRepository.createIndex();
  };

  create = async (repo: Repository, payload: Entity) => {
    return repo.save(payload);
  };

  findOne = async (repo: Repository, { key, value }: EntityType<Entity>) => {
    return await repo
      .search()
      .where(key as string)
      .equals(value as string)
      .return.first();
  };

  remove = async (repo: Repository, key: string) => {
    const token = (await this.findOne(repo, {
      key: "refreshToken",
      value: key,
    })) as unknown as { userId: string; refreshToken: string | null };
    token.refreshToken = null;
    this.create(repo, { ...token });
  };

  // getItem = async (id: string) => {
  //   await this.client.hGetAll(id);
  // };
}

export default new StoreService();
