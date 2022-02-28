const calMonth = document.querySelector(".cal-month");
const calDay = document.querySelector(".cal-day");
const calTable = document.querySelector(".cal-table");
const calBody = document.querySelector(".cal-body");

function toDay() {
  const dateDefine = new Date();
  const month = String(dateDefine.getMonth() + 1).padStart(2, "0");
  let day = String(dateDefine.getDate()).padStart(2, "0");

  calMonth.innerText = month;
  calDay.innerText = day;
}

toDay();
//makeCal();
