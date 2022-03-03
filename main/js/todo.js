const todoList = document.querySelector(".todolist_box");
const todoInput = document.querySelector(".todolist_box input");
const lists = document.querySelector(".lists");

const TODOLIST_KEY = "TODOLIST";
const BTNSHOW = "btn_show";
const savedTodos = localStorage.getItem(TODOLIST_KEY);

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const todo = document.createElement("li");
  todo.id = newTodo.id;
  todo.setAttribute("class", "item");
  todo.innerHTML = `
    <button class="check_btn">
    <i class="fas fa-check"></i>
    </button>
    <span class="item_name">
        ${newTodo.text}
    </span>
    <button class="item_edit">
        <i class="fas fa-pen"></i>
    </button>
    <button class="item_delete">
        <i class="fas fa-trash"></i>
    </button>
    `;

  //deleteBtn.addEventListener("click", deleteTodo);
  //   const span = document.createElement("span");
  //   span.innerText = newTodo.text;
  //   const button = document.createElement("button");
  //   button.innerText = "❌";
  //   button.addEventListener("click", deleteTodo);
  //   todo.appendChild(span);
  //   todo.appendChild(button);
  lists.appendChild(todo);
}

function checkItem(target) {
  if (target.matches(".check_btn")) {
    target.childNodes[1].classList.toggle("icon_show");
    target.childNodes[1].parentElement.classList.toggle("btn_show");
    target.nextSibling.nextSibling.classList.toggle("todo_end");
  } else if (target.matches(".fa-check")) {
    target.classList.toggle("icon_show");
    target.parentElement.classList.toggle("btn_show");
    target.parentElement.nextSibling.nextSibling.classList.toggle("todo_end");
  }
}
// function editItem(target) {
//   if (target.matches(".fa-pen")) {
//     console.log(target.parentElement);
//   }
// }

function removeItem(target) {
  if (target.matches(".fa-trash")) {
    deleteTodo(target.parentElement);
  }
}
lists.addEventListener("click", (event) => {
  let target = event.target;
  checkItem(target);
  //editItem(target);
  removeItem(target);
});
function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  console.log(newTodo);
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

function todoAdd() {
  // + 버튼 클릭 시
  todoList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".todo_btn")) {
      handleTodoSubmit(event);
    }
  });

  // 엔터 버튼 누를 시
  todoInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      console.log("엔터!");
      handleTodoSubmit(event);
    }
  });
}

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

todoAdd();
