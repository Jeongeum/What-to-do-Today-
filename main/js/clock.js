const calendar = document.querySelector(".time p:first-child");
let weekDay = document.querySelector(".time p:nth-child(2)");
const clock = document.querySelector("h3.clock");

function getClock() {
  const dateDefine = new Date();
  const year = dateDefine.getFullYear();
  const month = String(dateDefine.getMonth() + 1).padStart(2, "0");
  const date = String(dateDefine.getDate()).padStart(2, "0");
  const hours = String(dateDefine.getHours()).padStart(2, "0");
  const minutes = String(dateDefine.getMinutes()).padStart(2, "0");

  const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let week = WEEKDAY[dateDefine.getDay()];
  calendar.innerText = `${year}.${month}.${date}`;
  weekDay.innerText = week;
  clock.innerText = `${hours}:${minutes}`;
}

//setInterval(sayHello, 5000); 5초 후 마다 함수 실행
//setTimeout(getClock, 1000); // 5초 후에 함수 실행

getClock(); // 1초 기다렸다가 출력되는게 아니라 바로 출력하고 setInterval이 돌아가도록 한다.
setInterval(getClock, 1000); // 매 초마다 새로운 Date object를 만들고 있음

// "1".padStart(2, "0") -> string의 시작부분에 padding을 추가한다. 길이 2가 되지 않는다면 "0"을 추가하여 길이를 2로 만들어 준다.
