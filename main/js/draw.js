const list = document.querySelector(".list");
const todo = document.querySelector(".todo");
const draw = document.querySelector(".draw");
const tool = document.querySelector(".tool");
const toolBtn = document.querySelector(".toolBtn");
const todoListShow = document.querySelector(".todolist_show");
const controls = document.querySelector(".controls");
const palette = document.querySelector(".fa-palette");
const closed = document.querySelector(".closed");

/* 캔버스 */
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const pen = document.getElementById("jsPen");
const paint = document.getElementById("jsPaint");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const ClearBtn = document.getElementById("jsClear");
let color = "rgb(0,0,0)";
const HIDDEN_CLASSNAME = "hidden";
const HIDE = "hide";
const SHOW = "show";

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WSIZE = 650;
const CANVAS_HSIZE = 910;
canvas.width = CANVAS_WSIZE;
canvas.height = CANVAS_HSIZE;

ctx.fillStyle = "white"; // 캔버스 기본 배경 색
ctx.fillRect(0, 0, canvas.width, canvas.height); // 캔버스 기본 색으로 지정한 캔버스 크기만큼 채워준다.
ctx.strokeStyle = INITIAL_COLOR; // 선의 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; // 그리기 기본 값 : false
let filling = false; // 채우기 기본 값 : false

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 그림 그리지 않을 때 마우스만 움직여도 선은 시작된다.
    ctx.beginPath();
    ctx.moveTo(x, y); // 눈에는 안보이지만 이동하면서 좌표가 생성된다.
  } else {
    // 그림 그릴 때 (마우스 동작할 때) 마다 생긴다!
    ctx.lineTo(x, y); // path가 그려지고
    ctx.stroke(); // 그 path를 선으로 눈에 보이게 그린다.
  }
}

function changeColor(event) {
  if (!event.target.classList.contains("randomColor")) {
    color = event.target.style.backgroundColor;
  } else {
    color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)})`;
  }

  ctx.strokeStyle = color; // 선의 색을 팔레트에서 클릭한 색으로 바꾼다.
  ctx.fillStyle = color; // 채우기 색과 선의 색이 같아지도록 한다.
  pen.style.color = color;
}

// 선의 굵기
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 채우기
function handleModeClick(e) {
  if (e.target === pen) {
    console.log("펜");
    filling = false;
  } else {
    console.log("롤러");
    filling = true;
  }
}

function handleCanvasClick() {
  if (filling) {
    //채우기가 true가 되면 캔버스 크기만큼 사각형으로 색을 채운다.
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL(); // 캔버스의 데이터를 url로 만든다. 기본값은 png이고 jpeg등으로 설정 가능하다.
  const link = document.createElement("a");
  link.href = image; // 다운로드 할 이미지의 주소를 a태그의 href에 넣는다.
  link.download = "MEMO📝🎨"; // PaintJS라는 이름으로 파일을 다운로드 받는다.
  link.click(); // 가짜클릭
}

function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 기본 배경인 white로 캔버스 크기만큼 사각형을 채운다.
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// 각 컬러들을 배열로 만든다.
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (pen && paint) {
  pen.addEventListener("click", handleModeClick);
  paint.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (ClearBtn) {
  ClearBtn.addEventListener("click", handleClearClick);
}

function handleToolTrans() {
  canvas.classList.remove(HIDE);
  canvas.classList.add(SHOW);
  todoListShow.classList.remove(SHOW);
  todoListShow.classList.add(HIDE);
  //toolBtn.classList.toggle("show");
  toolBtn.classList.toggle("trans");

  // draw 버튼 눌렀을 때 팔레트가 계속 보이는 것을 막음
  if (controls.classList !== HIDE) {
    controls.classList.remove(SHOW);
    controls.classList.add(HIDE);
  }
}

function handleTodo() {
  todoListShow.classList.remove(HIDE);
  todoListShow.classList.add(SHOW);
  canvas.classList.remove(SHOW);
  canvas.classList.add(HIDE);
  controls.classList.add(HIDE);
}

function handlePalette() {
  if (controls.className === HIDE || true) {
    controls.classList.toggle(HIDE);
    controls.classList.toggle("show");
  }
}

function handleClosed() {
  console.log("뒤로가기");
  document.location.href = "/index.html";
  localStorage.removeItem(USERNAME_KEY);
}

/* list 버튼 클릭 시 */
function handleToolColor(event) {
  const target = event.target;
  /*
  switch (target) {
    case target.matches(".fa-pen-nib"):
      console.log("펜 색깔");
      target.classList.toggle("btn_focuse");
      paint.classList.remove("btn_focuse");
      palette.classList.remove("btn_focuse");
      break;
    case target.matches(".fa-paint-roller"):
      console.log("롤러 색깔");
      target.classList.toggle("btn_focuse");
      pen.classList.remove("btn_focuse");
      palette.classList.remove("btn_focuse");
      break;
    case target.matches(".fa-palette"):
      target.classList.toggle("btn_focuse");
      pen.classList.remove("btn_focuse");
      paint.classList.remove("btn_focuse");
      break;
  } 
  */
  if (target.matches(".fa-pen-nib")) {
    target.classList.toggle("btn_focuse");
    paint.classList.remove("btn_focuse");
    palette.classList.remove("btn_focuse");
  } else if (target.matches(".fa-paint-roller")) {
    target.classList.toggle("btn_focuse");
    pen.classList.remove("btn_focuse");
    palette.classList.remove("btn_focuse");
  } else if (target.matches(".fa-palette")) {
    target.classList.toggle("btn_focuse");
    pen.classList.remove("btn_focuse");
    paint.classList.remove("btn_focuse");
  } else {
    pen.classList.remove("btn_focuse");
    paint.classList.remove("btn_focuse");
    palette.classList.remove("btn_focuse");
  }
}

closed.addEventListener("click", handleClosed);
list.addEventListener("click", handleToolColor);
draw.addEventListener("click", handleToolTrans);
todo.addEventListener("click", handleTodo);
palette.addEventListener("click", handlePalette);
