import { database } from "../src/database/init";

export const getUserByEmail = async (email: string) =>
  database.getUserByEmail(email);

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => database.createUser({ username, email, password });
