import { Schema } from "redis-om";

export const tokenSchema = new Schema("token", {
  refreshToken: {
    type: "string",
  },
  userId: {
    type: "string",
  },
});

// export interface Token {
//   _id: string;
//   userId: string;
//   accessToken: string;
//   refreshToken: string;
// }
