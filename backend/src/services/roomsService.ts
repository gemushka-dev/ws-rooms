import { rooms } from "../modules/rooms/rooms.store";

export const createRoom = () => {
  const room = rooms.createRoom();
  return room;
};
