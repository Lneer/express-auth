import { createClient } from "redis";

class DbService {
  client = createClient();

  dbConnect = async () => {
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    await this.client.connect();
  };

  addItem = async (login: string, password: string) => {
    const id = String(Date.now());
    console.log(id);
    await this.client.hSet(id, { login, password });

    console.log(await this.getItem(id));
  };

  getItem = async (id: string) => {
    await this.client.hGetAll(id);
  };
}

export default new DbService();
