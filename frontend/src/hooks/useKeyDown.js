import { useState, useEffect } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../pages/DrawScreen";

const useKeyDown = (context, socket) => {
  const downHandler = (e) => {
    if (e.key === 'Backspace') {
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      socket.emit("clear-content");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
        window.removeEventListener("keydown", downHandler);
      };
  }, [context]);
};

export default useKeyDown; 