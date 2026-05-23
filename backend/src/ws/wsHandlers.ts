import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { WebSocket } from "ws";
import { rooms } from "../rooms/roomsService";

config();

interface CustomWebSocket extends WebSocket {
  user: { userId: number };
  roomId?: number;
}

type Message =
  | { type: "join"; roomId: number }
  | { type: "message"; text: string };

export const setupHandlers = (ws: WebSocket, req: any) => {
  if (!req?.headers?.cookie) {
    ws.close();
    return;
  }
  const cookies = parse(req.headers.cookie);
  const jwt = cookies["access_token"];
  if (!jwt) {
    ws.close();
    return;
  }
  try {
    const payload = verify(jwt, process.env.SECRET as string) as {
      userId: number;
    };
    const csWs = ws as CustomWebSocket;
    csWs.user = payload;

    handleMessages(csWs);
  } catch (e) {
    ws.close();
  }
};

function handleMessages(ws: CustomWebSocket) {
  ws.on("message", (data: Buffer) => {
    const msg: Message = JSON.parse(data.toString());
    switch (msg.type) {
      case "join":
        const room = rooms.get(msg.roomId);
        if (!room) return;
        room.clients.add(ws);
        ws.roomId = msg.roomId;
        break;
      case "message":
        if (ws.roomId === undefined) return;
        const currentRoom = rooms.get(ws.roomId);
        currentRoom?.clients.forEach((client: CustomWebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                userId: ws.user.userId,
                text: msg.text,
              }),
            );
          }
        });
        break;
    }
  });

  ws.on("close", () => {
    if (ws.roomId === undefined) return;
    const room = rooms.get(ws.roomId);
    if (!room) return;
    room.clients.delete(ws);
  });
}
