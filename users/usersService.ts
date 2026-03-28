import { getUserByEmail, createUser } from "./usersRepository";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<{ message: string }> => {
  const registredUser = await getUserByEmail(email);
  if (registredUser) {
    throw new Error("User already exists");
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
    throw new Error("Unauthorized");
  }
  if (!registredUser.password) {
    throw new Error("Invalid user data");
  }
  const isSame = await compare(password, registredUser.password);
  if (!isSame) {
    throw new Error("Incorrect Credentials");
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
