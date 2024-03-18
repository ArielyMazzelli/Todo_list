const d = document;
const $date = d.getElementById("date");
const $input = d.querySelector("input");
const $list = d.getElementById("list");
const $btnEnter = d.getElementById("enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let tasksList;

//Creacion de fecha
const FECHA = new Date();
$date.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//Funcion agregar tarea
function addTask(task, id, done, removed) {
  if (removed) {
    return;
  }

  const DONE = done ? check : uncheck;
  const LINE = done ? lineThrough : "";

  const $li = `
  <li id= "elemento">
  <i class="far ${DONE}" data="done" id="${id}"></i>
<p class="text ${LINE}">${task}</p>
<i class="fas fa-trash de" data="removed" id="${id}"></i>
</li>`;

  $list.insertAdjacentHTML("beforeend", $li);
}

//Funcion de tarea realizada
function taskDone(e) {
  e.classList.toggle(check);
  e.classList.toggle(uncheck);
  e.parentNode.querySelector(".text").classList.toggle(lineThrough);
  tasksList[e.id].done = tasksList[e.id].done ? false : true;
}

//Tarea Eliminada
function taskRemoved(e) {
  e.parentNode.parentNode.removeChild(e.parentNode);
  tasksList[e.id].removed = true;
}

//Agregar tarea con boton
$btnEnter.addEventListener("click", (e) => {
  //Evaluamos que no vaya vacio el input y envio de tareas a la lista
  const task = $input.value;
  if (task) {
    addTask(task, id, false, false);
    tasksList.push({
      name: task,
      id: id,
      done: false,
      removed: false,
    });
    localStorage.setItem("TODO", JSON.stringify(tasksList));
    $input.value = "";
    id++;
  }

  console.log(tasksList);
});

//Agregar la tarea por hacer pulsado los 2 botones de enter
d.addEventListener("keypress", (e) => {
  //Evaluamos que no vaya vacio el input
  if (e.code.match("Enter") || e.code.match("NumpadEnter")) {
    const task = $input.value;
    if (task) {
      addTask(task, id, false, false);
      tasksList.push({
        name: task,
        id: id,
        done: false,
        removed: false,
      });
      localStorage.setItem("TODO", JSON.stringify(tasksList));
      $input.value = "";
      id++;
    }

    console.log(tasksList);
  }
});

$list.addEventListener("click", (e) => {
  const element = e.target;
  if (element.attributes.data.value === "done") {
    taskDone(element);
  } else if (e.target.attributes.data.value === "removed") {
    taskRemoved(element);
  }
  localStorage.setItem("TODO", JSON.stringify(tasksList));
});

//Local storage get item

let data = localStorage.getItem("TODO");
if (data) {
  tasksList = JSON.parse(data);
  id = tasksList.length;
  loadList(tasksList);
} else {
  tasksList = [];
  id = 0;
}

function loadList(DATA) {
  DATA.forEach((i) => {
    addTask(i.name, i.id, i.done, i.removed);
  });
}
