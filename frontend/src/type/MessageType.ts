export type FrontendMessageType = {
  userId: number;
  username: string;
  text: string;
  isMe: boolean;
};

export type Message = {
  type: "MESSAGE";
  data: {
    text: string;
  };
};
