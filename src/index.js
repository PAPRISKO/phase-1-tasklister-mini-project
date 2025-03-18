document.addEventListener("DOMContentLoaded", () => {

  // Selectin the form, task list, and input fields
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  //event listener for form submission
  form.addEventListener("submit", function(event) {
      event.preventDefault();

      // Get values from the input fields
      const taskInput = document.querySelector("#new-task-description").value;
      const priority = document.querySelector("#priority").value;
      const dueDate = document.querySelector("#due-date").value;

      // Ensuring task input is not empty
      if (taskInput.trim() !== "") {
          addTask(taskInput, priority, dueDate);
          document.querySelector("#new-task-description").value = "";
          document.querySelector("#due-date").value = ""; 
      }
  });

  // Function to add a task
  function addTask(task, priority, dueDate) {
      const taskItem = document.createElement("li");

      // Apply priority color
      if (priority === "High") taskItem.style.color = "red";
      else if (priority === "Medium") taskItem.style.color = "orange";
      else taskItem.style.color = "green";

      //task text
      taskItem.innerHTML = `<strong>${task}</strong> (Due: ${dueDate || "No date"})`;

      // edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Edit";
      editBtn.addEventListener("click", () => editTask(taskItem));

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌ Delete ";
      deleteBtn.addEventListener("click", () => taskItem.remove());

      taskItem.appendChild(editBtn);
      taskItem.appendChild(deleteBtn);

      taskList.appendChild(taskItem);

      sortTasks();
  }

  // Function to edit a task
  function editTask(taskItem) {
      const newText = prompt("Edit your task:", taskItem.firstChild.textContent);
      if (newText !== null && newText.trim() !== "") {
          taskItem.firstChild.textContent = newText;
      }
  }

  // Function to sort tasks by priority
  function sortTasks() {
      const tasks = Array.from(taskList.children);
      tasks.sort((a, b) => {
          const priorityOrder = { "red": 1, "orange": 2, "green": 3 };
          return priorityOrder[a.style.color] - priorityOrder[b.style.color];
      });
      taskList.innerHTML = "";
      tasks.forEach(task => taskList.appendChild(task));
  }
});
