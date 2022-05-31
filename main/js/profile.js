const user = document.querySelector(".user");
const usernameInput = document.querySelector(".profileName_input");

const profileBtn = document.querySelector(".profileImg_btn");
const profileInput = document.querySelector(".profile_img");
const profileIcon = document.querySelector(".fa-user-plus");
const img = document.querySelector(".profileImg_btn img");
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

const USERNAME_KEY = "user";
const PROFILE_IMG = "profile_IMG";
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
  const currentFiles = profileInput.files;
  if (profileBtn.children.length > 0) {
    // 프로필 사진이 두개이면 처음 사진을 지운다.
    localStorage.removeItem(PROFILE_IMG);
    //profileBtn.children[0].remove();
  }

  if (currentFiles.length === 0) {
    alert("No files currently selected for upload");
  } else {
    // for of 는 배열
    for (const file of currentFiles) {
      if (validFileType(file)) {
        const reader = new FileReader();
        console.log(reader);
        reader.addEventListener("load", () => {
          localStorage.setItem(PROFILE_IMG, reader.result);
          loadImgUrl(reader.result);
          console.log(file);
        });
        reader.readAsDataURL(file);
      } else {
        alert("Not a valid file type. Update your selection.");
      }
    }
  }
}

function loadImgUrl(DataUrl) {
  img.src = DataUrl;
}

function validFileType(file) {
  return fileTypes.includes(file.type);
}
console.log(img.src);
profileInput.addEventListener("change", handleProfileImg);
user.addEventListener("click", handleUserNameInput);

const savedImg = localStorage.getItem(PROFILE_IMG);
// 저장된 사진이 없으면 기본이미지 나옴
if (savedImg !== null) {
  console.log(savedImg);
  loadImgUrl(savedImg);
}
