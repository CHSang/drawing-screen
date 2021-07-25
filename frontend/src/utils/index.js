export function draw(data, context) {
  context.beginPath();
  context.moveTo(data.lastPoint.x, data.lastPoint.y);
  context.lineTo(data.x, data.y);
  context.strokeStyle = data.option.color;
  context.lineWidth = data.option.brushType;
  context.lineCap = "round";
  context.stroke();
}

var lastPoint = null;
export function drawOnMouseEvent(e, context, socket, option) {
  if (e.buttons) {
    if (!lastPoint) {
      lastPoint = { x: e.offsetX, y: e.offsetY };
    }
    let message = { lastPoint, x: e.offsetX, y: e.offsetY, option: {brushType : option.brushType, color : option.color}};
    draw(message, context);
    socket.emit("message", message);
    lastPoint = { x: e.offsetX, y: e.offsetY };
  } else {
    lastPoint = null;
  }
}
