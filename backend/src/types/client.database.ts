export type User = {
  username: string;
  email: string;
  password: string;
};

export type DBdata = {
  user_id: number;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
};
