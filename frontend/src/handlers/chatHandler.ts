import type { FrontendMessageType, Message } from "../type/MessageType";

export const createMessageHandler = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<FrontendMessageType[]>>;
}) => {
  return (e: MessageEvent) => {
    const data: FrontendMessageType = JSON.parse(e.data);
    const newMes: FrontendMessageType = { ...data, isMe: false };
    setMessages((prev) => [...prev, newMes]);
  };
};

export const createSendMessage = ({
  setMessages,
  socket,
  inputRef,
  userId,
  username,
}: {
  setMessages: React.Dispatch<React.SetStateAction<FrontendMessageType[]>>;
  socket: WebSocket;
  inputRef: React.RefObject<HTMLInputElement | null>;
  userId: number;
  username: string;
}) => {
  return () => {
    if (!inputRef.current?.value.trim() || !socket) return;
    const mes: Message = {
      type: "MESSAGE",
      data: {
        text: inputRef.current.value,
      },
    };
    socket.send(JSON.stringify(mes));
    const myMes = {
      userId: userId,
      username: username,
      text: inputRef.current.value,
      isMe: true,
    };
    setMessages((prev) => [...prev, myMes]);
  };
};
