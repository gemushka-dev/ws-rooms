import { useParams } from "react-router";

export const Chat = () => {
  const { id } = useParams();
  return <h1>Room: {id}</h1>;
};
