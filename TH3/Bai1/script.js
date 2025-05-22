let tasks = [];

// Load danh sách từ localStorage
window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => renderTask(task));
  }
};

// Hàm hiển thị công việc
function renderTask(task) {
  const li = document.createElement("li");

  // Tạo checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    taskSpan.style.textDecoration = task.completed ? "line-through" : "none";
    saveTasks();
  });

  // Nội dung công việc
  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;
  taskSpan.style.marginLeft = "10px";
  taskSpan.style.flexGrow = "1";
  taskSpan.style.textDecoration = task.completed ? "line-through" : "none";

  // Nút Sửa
  const editBtn = document.createElement("button");
  editBtn.textContent = "Sửa";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", function () {
    const newText = prompt("Chỉnh sửa công việc:", task.text);
    if (newText && newText.trim() !== "") {
      task.text = newText.trim();
      taskSpan.textContent = task.text;
      saveTasks();
    }
  });

  // Nút Xóa
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Xóa";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  document.getElementById("todo-list").appendChild(li);
}

// Hàm lưu vào localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Hàm thêm công việc mới
function addTask() {
  const input = document.getElementById("todo-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Vui lòng nhập nội dung công việc!");
    return;
  }

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  input.value = "";
}

// Gắn sự kiện cho nút "Thêm"
document.getElementById("add-button").addEventListener("click", addTask);
