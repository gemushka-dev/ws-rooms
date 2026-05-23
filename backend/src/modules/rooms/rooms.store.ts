import { randomInt } from "crypto";
import { Room } from "../../types/roomType";

class RoomStore {
  rooms = new Map<number, Room>();

  createRoom() {
    let uniqId;
    do {
      uniqId = randomInt(100000, 999999);
    } while (this.rooms.has(uniqId));
    const room: Room = {
      id: uniqId,
      clients: new Set<WebSocket>(),
      expiresAt: Date.now() + 60 * 60 * 1000,
    };
    room.timer = setTimeout(
      () => {
        this.forceDeleteRoom(uniqId);
      },
      60 * 60 * 1000,
    );
    this.rooms.set(uniqId, room);
    return room;
  }

  forceDeleteRoom(roomId: number) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    if (room.timer) clearTimeout(room.timer);
    room.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "Room expired");
      }
    });

    room.clients.clear();
    this.rooms.delete(roomId);
  }

  addUser(roomId: number, ws: WebSocket) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.clients.add(ws);
  }

  deleteUser(roomId: number, ws: WebSocket) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.clients.delete(ws);

    if (room.clients.size === 0) {
      this.forceDeleteRoom(roomId);
    }
  }
}

export const rooms = new RoomStore();
