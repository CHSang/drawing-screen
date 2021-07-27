import React, { useState } from "react";
import DrawScreen from "./pages/DrawScreen";
import RoomManager from "./pages/RoomManager";

function App() {
  const [state, setState] = useState("");
  const onChangeRoomId = (id) => {
    setState(id);
  };

  return (
    <>
      {state && <DrawScreen roomId={state}/>}
      {!state && <RoomManager onChangeRoomId={onChangeRoomId} />}
    </>
  );
}

export default App;
