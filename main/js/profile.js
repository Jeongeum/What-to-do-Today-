const user = document.querySelector(".user");
const usernameInput = document.querySelector(".profileName_input");
const savedUsername = localStorage.getItem("user");

const USERNAME_KEY = "user";
// const HIDDEN_CLASSNAME = "hidden";
// const HIDE = "hide";
// const SHOW = "show";

function handleUserNameInput() {
  console.log("클릭!");
  user.classList.add(HIDE);
  usernameInput.classList.add(SHOW);
  changeName();
}

function changeName() {
  usernameInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      user.classList.remove(HIDE);
      usernameInput.classList.remove(SHOW);
      const newname = usernameInput.value;
      user.innerText = newname;
      usernameInput.value = "";
      localStorage.removeItem(USERNAME_KEY);
      localStorage.setItem(USERNAME_KEY, newname);
    }
  });
}
user.addEventListener("click", handleUserNameInput);
