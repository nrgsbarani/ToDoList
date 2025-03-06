// دریافت عناصر HTML
const $ = (selector) => document.querySelector(selector);

const submit = $("#input-task"),
      addTask = $("#hide"),
      input_title = $("#title"),
      input_assign = $("#assign"),
      create_task = $("#create"),
      cancel_task = $("#cancel"),
      show_task = $("#show-task"),
      error_message = $("#Error");

const close_sign = "\u00D7";

// change display 
const toggleDisplay = (element, show) => {
    element.style.display = show ? 'block' : 'none';
};

// clear inputs
const clearInputs = () => {
    input_title.value = '';
    input_assign.value = '';
};

// get list data of local storage
const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

// save list data to local storage
const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Create new tasks handler
const CreateTaskItem = (title, assign , checked = false , save = true , id = Date.now()) => {
    // Title Error handler
    if (!title.trim()) {
        toggleDisplay(error_message, true);
        clearInputs();
        return;
    }

    const item = document.createElement("li");
    item.textContent = title;
    item.setAttribute("data-id", id);
    
    // add checked class to list
    if (checked) item.classList.add("checked");

    // Create close button
    const span = document.createElement("SPAN");
    span.textContent = close_sign;
    span.className = "close";

    // Create assign field
    const span_assign = document.createElement("SPAN");
    span_assign.textContent = assign.trim() || "بدون مسئول";
    span_assign.className = "assign-tab";

    // add new elements to list
    item.append(span, span_assign);
    show_task.appendChild(item);

    // save new task to local storage
    if (save) {
        const tasks = getTasks();
        tasks.push({ id, title, assign , checked });
        saveTasks(tasks);
    }

    clearInputs();
};

// load list data of local storage when page loading
const loadTasks = () => {
    const tasks = getTasks();
    tasks.forEach(({ id, title, assign , checked }) => CreateTaskItem(title, assign, checked, false , id));
};

// submit display handler
submit.addEventListener('click', () => {
    toggleDisplay(submit, false);
    toggleDisplay(error_message, false);
    toggleDisplay(addTask, true);
});

// Cancel desired task
cancel_task.addEventListener('click', () => {
    toggleDisplay(submit, true);
    toggleDisplay(addTask, false);
    clearInputs();
});

// Create new task
create_task.addEventListener('click', () => {
    CreateTaskItem(input_title.value, input_assign.value);
    toggleDisplay(addTask, false);
    toggleDisplay(submit, true);
});

// close or checked tasks
show_task.addEventListener("click", (event) => {
    const tasks = getTasks();

    if (event.target.classList.contains("close")) {
        const item = event.target.parentElement;
        const id = item.getAttribute("data-id"); // get task id

        // remove list of local storage
        const updatedTasks = tasks.filter(task => task.id != id);
        saveTasks(updatedTasks);

        // remove list of DOM
        item.remove();
    } else if (event.target.tagName === 'LI') {
        const item = event.target;
        const id = item.getAttribute("data-id");

        item.classList.toggle("checked");

        // update list data to local storage
        const updatedTasks = tasks.map(task => 
            task.id == id ? { ...task, checked: item.classList.contains("checked") } : task
        );
        saveTasks(updatedTasks);
    }
});

// load list data of local storage when page open for the first
document.addEventListener("DOMContentLoaded", loadTasks);