import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { FrontendMessageType } from "../type/MessageType";
import {
  createMessageHandler,
  createSendMessage,
} from "../handlers/chatHandler";
import styles from "../style/chat.module.css";

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
    <section className={styles.chat}>
      <h1 className={styles.chat__id}>Room id: {id}</h1>
      <div className={styles.chat__window}>
        {messages &&
          messages.map((msg) => (
            <div
              className={
                msg.isMe
                  ? `${styles.chat__msg} ${styles.mine}`
                  : styles.chat__msg
              }
            >
              {msg.username === data.username ? "you" : msg.username}:{" "}
              {msg.text}
            </div>
          ))}
      </div>
      <div className={styles.chat__footer}>
        <input className={styles.chat__input} ref={inputRef} />
        <button className={styles.chat__button} onClick={sendMessage}>
          ➤
        </button>
      </div>
    </section>
  );
};
