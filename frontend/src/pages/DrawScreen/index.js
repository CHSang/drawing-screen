import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { CanvasStyled, WrapperStyled } from "./Styled";
import ColorPicker from "../../components/ColorPicker";
import PaintingBrush from "../../components/PaintingBrush";
import useMousePosition from "../../hooks/useMousePosition";
import useKeyDown from "../../hooks/useKeyDown";
import { draw } from "../../utils";

const socket = io.connect("http://localhost:5000/");
export const CANVAS_WIDTH = 1300;
export const CANVAS_HEIGHT = 500;

function DrawScreen() {
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [option, setOption] = useState({
    brushType : "1",
    color : "red"
  });
  useMousePosition(canvasContext, socket, option);
  useKeyDown(canvasContext, socket);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      setCanvasContext(ctx);

      socket.on("send-message", (message) => {
        draw(message, canvasRef.current.getContext("2d"));
      });

      socket.on("clear", () => {
        console.log("clear roi");
        canvasRef.current.getContext("2d").clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      });
    }
  }, [canvasRef]);

  useEffect(() => {
    socket.emit("join-room");
  }, []);

  const handleChange = (event, key) => {
    let newOption = {...option, [key] : event.target.value};
    setOption(newOption);
  }
  return (
    <WrapperStyled>
      <div className="header">
        <h1>Let's draw</h1>
      </div>
      <CanvasStyled
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <PaintingBrush onChange={event => handleChange(event, "brushType")} selectedItem={option.brushType}/>
      <ColorPicker onChange={event => handleChange(event, "color")} selectedItem={option.color} />
    </WrapperStyled>
  );
}

export default DrawScreen;
