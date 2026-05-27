import { useRef } from "react";
import { createRoomHandler } from "../handlers/roomHandlers";
import styles from "../style/rooms.module.css";

export const Room = () => {
  const roomIdRef = useRef<HTMLInputElement>(null);
  const roomHandler = createRoomHandler(roomIdRef);
  return (
    <>
      <section className={styles.room}>
        <div className={styles.create__room}>
          <h1 className={styles.room__title}>Create your room</h1>
          <ul className={styles.room__list}>
            <li className={styles.list__item}>Limit time: 1 hour</li>
            <li className={styles.list__item}>Unlimited friends</li>
          </ul>
          <button className={styles.room__button} onClick={roomHandler}>
            Create room
          </button>
        </div>
        <div className={styles.join__room}>
          <h1 className={styles.room__title}>Join room</h1>
          <input
            type="text"
            placeholder="Enter room id"
            className={styles.room__input}
            ref={roomIdRef}
          />
          <button className={styles.room__button}>Join room</button>
        </div>
      </section>
    </>
  );
};
