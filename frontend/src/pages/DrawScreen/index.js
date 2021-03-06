import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { CanvasStyled, WrapperStyled } from "./Styled";
import ColorPicker from "../../components/ColorPicker";
import VideoCall from "../../components/VideoCall";
import PaintingBrush from "../../components/PaintingBrush";
import useMousePosition from "../../hooks/useMousePosition";
import useKeyDown from "../../hooks/useKeyDown";
import { draw } from "../../utils";
const { v4: uuidv4 } = require("uuid");
const socket = io.connect("http://localhost:5000/");
export const CANVAS_WIDTH = 1100;
export const CANVAS_HEIGHT = 500;

function DrawScreen({ roomId }) {
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [option, setOption] = useState({
    brushType: "1",
    color: "red",
  });

  useMousePosition(canvasContext, socket, option);
  useKeyDown(canvasContext, socket);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      setCanvasContext(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    console.log("room id in draw" + roomId);
    socket.emit("join-room", roomId, uuidv4());
    socket.on("send-message", (message) => {
      if (message) {
        handleDraw(message);
      }
    });
    socket.on("history", (data) => {
      if (data && data.length > 0) {
        data.forEach((message) => {
          handleDraw(message);
        });
      }
    });

    socket.on("clear-content", () => {
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });
  }, [roomId]);

  const handleDraw = (element) => {
    if (canvasRef && canvasRef.current) {
      draw(element, canvasRef.current.getContext("2d"));
    }
  };

  const handleOptionChangeHandler = (event, key) => {
    let newOption = { ...option, [key]: event.target.value };
    setOption(newOption);
  };

  return (
    <WrapperStyled>
      <div className="header">
        <h1>Let's draw</h1>
      </div>
      <div className="content">
        <div className="left">
          <CanvasStyled
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
          <div className="footer">
            <PaintingBrush
              onChange={(event) =>
                handleOptionChangeHandler(event, "brushType")
              }
              selectedItem={option.brushType}
            />
            <ColorPicker
              onChange={(event) => handleOptionChangeHandler(event, "color")}
              selectedItem={option.color}
            />
          </div>
        </div>
        <div className="right">
          <VideoCall roomId={roomId} />
        </div>
      </div>
    </WrapperStyled>
  );
}

export default DrawScreen;
