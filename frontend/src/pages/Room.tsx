export const Room = () => {
  return (
    <>
      <section className="room">
        <div className="create__room">
          <h1 className="room__title">Create your room</h1>
          <ul className="room__list">
            <li className="list__item">Limit time: 1 hour</li>
            <li className="list__item">Unlimited friends</li>
          </ul>
          <button className="room__button">Create room</button>
        </div>
        <div className="join__room">
          <h1 className="room__title">Join room</h1>
          <input
            type="text"
            placeholder="Enter room id"
            className="room__input"
          />
          <button className="room__button">Join room</button>
        </div>
      </section>
    </>
  );
};
