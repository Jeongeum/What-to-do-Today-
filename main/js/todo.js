const todoList = document.querySelector(".todolist_box");
const todoInput = document.querySelector(".todolist_box input");
const lists = document.querySelector(".lists");

const TODOLIST_KEY = "TODOLIST";

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const todo = document.createElement("li");
  todo.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  todo.appendChild(span);
  todo.appendChild(button);
  lists.appendChild(todo);
}

function handleTodoSubmit(event) {
  const target = event.target;
  event.preventDefault();
  if (target.matches(".todo_btn")) {
  }
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

const savedTodos = localStorage.getItem(TODOLIST_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

todoAdd();
