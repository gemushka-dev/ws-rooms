export interface CustomWebSocket extends WebSocket {
  user: { userId: number };
  roomId?: number;
}
