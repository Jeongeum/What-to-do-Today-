const user = document.querySelector(".user");
const usernameInput = document.querySelector(".profileName_input");

const profileBtn = document.querySelector(".profileImg_btn");
const profileInput = document.querySelector(".profile_img");
const profileIcon = document.querySelector(".fa-user-plus");

const savedUsername = localStorage.getItem("user");
const USERNAME_KEY = "user";
const PROFILE_IMG = "userImg";
// const HIDDEN_CLASSNAME = "hidden";
// const HIDE = "hide";
// const SHOW = "show";

/* 이름 변경 */
function handleUserNameInput() {
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

/* 프로필 사진 변경 */
profileBtn.addEventListener("click", () => {
  profileInput.click();
});

function handleProfileImg() {
  if (profileBtn.children.length > 0) {
    // 프로필 사진이 두개이면 처음 사진을 지운다.
    localStorage.removeItem(PROFILE_IMG);
    profileBtn.children[0].remove();
    console.log(profileBtn.children);
  }

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem(PROFILE_IMG, reader.result);
    loadImgUrl(reader.result);
  };

  reader.readAsDataURL(profileInput.files[0]);
}

function loadImgUrl(DataUrl) {
  const image = document.createElement("img");
  profileIcon.remove();
  profileBtn.appendChild(image);
  image.src = DataUrl;
}

profileInput.addEventListener("change", handleProfileImg);
user.addEventListener("click", handleUserNameInput);
