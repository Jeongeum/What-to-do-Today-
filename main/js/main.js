const loadUserName = localStorage.getItem("user");
console.log(loadUserName);

const userName = document.querySelector(".user");
userName.textContent = loadUserName; // 처음 적은 이름 출력
