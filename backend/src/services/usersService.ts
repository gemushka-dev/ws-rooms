import { getUserByEmail, createUser } from "../repositories/usersRepository";
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
  const registeredUser = await getUserByEmail(email);
  if (registeredUser) {
    throw new HttpError("User already exists", 409);
  }
  const hashedPassword = await hash(password, 10);
  await createUser(username, email, hashedPassword);
  return { message: "User registered" };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; userId: number; username: string }> => {
  const registeredUser = await getUserByEmail(email);
  if (!registeredUser) {
    throw new HttpError("Unauthorized", 401);
  }
  if (!registeredUser.password) {
    throw new HttpError("Invalid user data", 400);
  }
  const isSame = await compare(password, registeredUser.password);
  if (!isSame) {
    throw new HttpError("Incorrect Credentials", 401);
  }
  const token = sign(
    {
      userId: registeredUser.user_id,
      username: registeredUser.username,
    },
    process.env.SECRET as string,
    {
      algorithm: "HS512",
      expiresIn: "24h",
    },
  );
  return {
    token,
    userId: registeredUser.user_id,
    username: registeredUser.username,
  };
};
