const userLogin = document.querySelector(".user_login");
const userInput = document.querySelector(".user_login input");
const userBtn = document.querySelector(".user_btn");
const savedUsername = localStorage.getItem("user"); // 로컬스토리지 저장 여부
console.log(savedUsername);
const USERNAME_KEY = "user";

function send() {
  // + 버튼 클릭 시
  userLogin.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".user_btn")) {
      const text = userInput.value;
      console.log("text:", text);
      saveName(text);
    }
  });

  // 엔터 버튼 누를 시
  userInput.addEventListener("keydown", (event) => {
    let text = event.target.value;
    if (event.keyCode === 13) {
      console.log(text);
      saveName(text);
    }
  });
}

function saveName(username) {
  localStorage.setItem(USERNAME_KEY, username);
  nextPage();
}

if (savedUsername === null) {
  send();
} else {
  nextPage();
}
function nextPage() {
  document.location.href = "main/index.html";
}
