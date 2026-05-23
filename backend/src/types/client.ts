export type ClientFrontendData =
  | { type: "JOIN"; roomId: number }
  | { type: "MESSAGE"; data: { text: string } };
