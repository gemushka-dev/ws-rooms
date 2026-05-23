import { verify } from "jsonwebtoken";
import { WebSocket } from "ws";
import { CustomWebSocket } from "../types/CustomWebSocket";
import { parse } from "cookie";
import { roomService } from "../modules/rooms/rooms.service";
import { rooms } from "../modules/rooms/rooms.store";

class RoomGateway {
  handleConnection(ws: WebSocket, req: any) {
    const csWs = ws as CustomWebSocket;

    if (!req?.headers?.cookie) {
      ws.close(4001, "Unauthorized: No cookies");
      return;
    }

    const cookies = parse(req.headers.cookie);
    const jwt = cookies["access_token"];

    if (!jwt) {
      ws.close(4001, "Unauthorized: No token");
      return;
    }

    try {
      const payload = verify(jwt, process.env.SECRET as string) as {
        userId: number;
      };

      csWs.user = payload;
    } catch (e) {
      ws.close(4003, "Unauthorized: Invalid token");
      return;
    }

    csWs.on("message", (data: Buffer) => {
      try {
        const parsed = JSON.parse(data.toString());
        roomService.handleMessage(csWs, parsed);
      } catch (error) {
        console.error("Invalid JSON format received:", error);
      }
    });

    csWs.on("close", () => {
      if (csWs.roomId) {
        rooms.deleteUser(csWs.roomId, csWs);
      }
    });
  }
}

export const roomGateway = new RoomGateway();
