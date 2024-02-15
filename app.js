const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

const startPainting = () => {
  isPainting = true;
};

const cancelPainting = () => {
  isPainting = false;
  ctx.beginPath();
};

const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};

const changeColor = (event) => {
  if (event.target.dataset.color) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = ctx.fillStyle = color.value = colorValue;
  } else {
    ctx.strokeStyle = ctx.fillStyle = event.target.value;
  }
};

const onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", changeColor);

colorOptions.forEach((color) => color.addEventListener("click", changeColor));

modeBtn.addEventListener("click", onModeClick);
