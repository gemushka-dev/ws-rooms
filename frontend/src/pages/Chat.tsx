import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { FrontendMessageType } from "../type/MessageType";
import {
  createMessageHandler,
  createSendMessage,
} from "../handlers/chatHandler";

export const Chat = ({
  socket,
  data,
}: {
  socket: WebSocket | null;
  data: { username: string; userId: number };
}) => {
  const { id } = useParams();
  const [messages, setMessages] = useState<FrontendMessageType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  if (!socket) return null;

  const messageHandler = createMessageHandler({ setMessages });
  const sendMessage = createSendMessage({
    setMessages,
    socket,
    inputRef,
    userId: data.userId,
    username: data.username,
  });

  useEffect(() => {
    if (socket != null) socket.onmessage = messageHandler;
  }, [socket]);
  return (
    <section className="chat">
      <h1 className="chat__id">Room id: {id}</h1>
      <div className="chat__window">
        {messages &&
          messages.map((msg) => (
            <div className={msg.isMe ? "chat__msg mine" : "chat__msg"}>
              {msg.username}
              {msg.text}
            </div>
          ))}
      </div>
      <div className="chat__footer">
        <input className="chat__input" ref={inputRef} />
        <button className="chat__button" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </section>
  );
};
