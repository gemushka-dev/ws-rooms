import { useParams } from "react-router";
import { useState } from "react";
import type { FrontendMessageType } from "../type/MessageType";

export const Chat = ({ socket }: { socket: WebSocket }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState<FrontendMessageType>();
  return (
    <section className="chat">
      <h1 className="chat__id">Room id: {id}</h1>
      <div className="chat__window"></div>
      <div className="chat__footer">
        <input className="chat__input" />
        <button className="chat__button">➤</button>
      </div>
    </section>
  );
};
