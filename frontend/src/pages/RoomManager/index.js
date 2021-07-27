import React, { useEffect, useState } from "react";
import { WrapperStyled } from "./Styled";
import { Button, ListGroup } from "react-bootstrap";
import { Service } from "./Service";

function RoomManager({onChangeRoomId}) {
  const [state, setstate] = useState({});

  useEffect(() => {
    async function getRooms() {
      let response = await Service.getRooms();
      setstate(response.data);
    }
    getRooms();
  }, []);

  async function handleCreateRoom() {
    let response = await Service.createRoom();
    let newState = { ...state };
    newState.list.unshift(response.data);
    setstate(newState);
  }

  const roomClickHandler = id => {
    onChangeRoomId(id);
  }

  const { list } = state;

  return (
    <WrapperStyled>
      <div className="dialog">
        <Button variant="secondary" onClick={handleCreateRoom}>
          Create new room
        </Button>
        <ListGroup>
          {list &&
            list.length > 0 &&
            list.map((item) => (
              <ListGroup.Item
                action
                key={item.id}
                onClick={() => roomClickHandler(item.id)}
              >
                {item.id}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </WrapperStyled>
  );
}

export default RoomManager;
