export type Room = {
  id: number;
  timer?: NodeJS.Timeout;
  clients: Set<any>;
  expiresAt: number;
};
