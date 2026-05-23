import { pool } from "./pool";

type User = {
  username: string;
  email: string;
  password: string;
};

type DBdata = {
  user_id: number;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
};

class Database {
  async init() {
    const usersQuery: string = `
            CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                password VARCHAR(64) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );`;
    await pool.query(usersQuery);
  }

  async getUserByEmail(email: string): Promise<DBdata | null> {
    const query: string = `SELECT * FROM users WHERE email = $1`;
    const data = await pool.query(query, [email]);
    return data.rows[0];
  }
  async createUser(user: User): Promise<DBdata> {
    const query: string = `INSERT INTO users(username , email,password) VALUES($1,$2,$3) RETURNING user_id , username , email , created_at`;
    const data = await pool.query(query, [
      user.username,
      user.email,
      user.password,
    ]);
    return data.rows[0];
  }
}

export const database = new Database();
