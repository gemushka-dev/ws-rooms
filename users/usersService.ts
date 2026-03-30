import { getUserByEmail, createUser } from "./usersRepository";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { HttpError } from "../error/HttpError";

config();

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<{ message: string }> => {
  const registredUser = await getUserByEmail(email);
  if (registredUser) {
    throw new HttpError("User already exists", 409);
  }
  const hashedPassword = await hash(password, 10);
  await createUser(username, email, hashedPassword);
  return { message: "User registred" };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; userId: number; username: string }> => {
  const registredUser = await getUserByEmail(email);
  if (!registredUser) {
    throw new HttpError("Unauthorized", 401);
  }
  if (!registredUser.password) {
    throw new HttpError("Invalid user data", 400);
  }
  const isSame = await compare(password, registredUser.password);
  if (!isSame) {
    throw new HttpError("Incorrect Credentials", 401);
  }
  const token = sign(
    {
      userId: registredUser.user_id,
    },
    process.env.SECRET as string,
    {
      algorithm: "HS512",
      expiresIn: "24h",
    },
  );
  return {
    token,
    userId: registredUser.user_id,
    username: registredUser.username,
  };
};
