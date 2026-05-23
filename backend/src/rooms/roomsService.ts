import { randomInt } from "node:crypto";
import { WebSocket } from "ws";

type Room = {
  id: number;
  clients: Set<any>;
  expiresAt: number;
};

export const rooms = new Map<number, Room>();

export const createRoom = () => {
  let uniqId: number;
  do {
    uniqId = randomInt(100000, 999999);
  } while (rooms.has(uniqId));
  const room: Room = {
    id: uniqId,
    clients: new Set<WebSocket>(),
    expiresAt: Date.now() + 60 * 60 * 1000,
  };
  rooms.set(uniqId, room);
  setTimeout(
    () => {
      rooms.delete(uniqId);
    },
    60 * 60 * 1000,
  );
  return room;
};
