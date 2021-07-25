import { useEffect } from "react";
import { drawOnMouseEvent } from "../utils";

const useMousePosition = (context, socket, option) => {

  const onMouseMove = (e) => {
    drawOnMouseEvent(e, context, socket, option);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [context, option]);
};

export default useMousePosition;
