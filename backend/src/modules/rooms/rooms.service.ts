import { ClientFrontendData } from "../../types/client";
import { rooms } from "./rooms.store";
import { CustomWebSocket } from "../../types/CustomWebSocket";
import { WebSocket } from "ws";

class RoomService {
  handleMessage(ws: CustomWebSocket, data: ClientFrontendData) {
    switch (data.type) {
      case "JOIN": {
        this.join(ws, data.roomId);
        break;
      }
      case "MESSAGE": {
        this.sendMessage(ws, data.data.text);
        break;
      }
      default: {
        console.warn("Unknown type: ", data);
        break;
      }
    }
  }

  private join(ws: CustomWebSocket, roomId: number) {
    rooms.addUser(roomId, ws);
    ws.roomId = roomId;
  }

  private sendMessage(ws: CustomWebSocket, text: string) {
    if (!ws.roomId) return;
    const curRoom = rooms.getRoom(ws.roomId);
    if (!curRoom) return;

    curRoom.clients.forEach((cl: CustomWebSocket) => {
      if (
        cl.user?.userId !== ws.user?.userId &&
        cl.readyState === WebSocket.OPEN
      ) {
        try {
          cl.send(
            JSON.stringify({
              userId: ws.user.userId,
              username: ws.user.username,
              text: text,
            }),
          );
        } catch (e) {
          console.error("Something went wrong: ", e);
          rooms.deleteUser(ws.roomId!, cl);
        }
      }
    });
  }
}

export const roomService = new RoomService();
