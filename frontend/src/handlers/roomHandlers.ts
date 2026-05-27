export const createRoomHandler = (
  roomIdRef: React.RefObject<HTMLInputElement | null>,
) => {
  return async () => {
    const response = await fetch("http://localhost:3500/rooms/create", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      console.error(response);
      return alert("Something went wrong");
    }
    const data = await response.json();
    alert("Room created");
    roomIdRef.current!.value = data.roomId;
  };
};
