// get HTML Element for handle element
const submit = document.querySelector("#input-task")
const addTask = document.querySelector("#hide")
const input_title = document.querySelector("#title")
const input_assign = document.querySelector("#assign")
const create_task = document.querySelector("#create")
const cancel_task = document.querySelector("#cancel")
const show_task = document.querySelector("#show-task")
const close_task = document.querySelector(".close")
const error_message = document.querySelector("#Error")
const close_sign = "\u00D7"

const CreateTaskItem = (title , assign) => {
    if (!title | !title.trim()) {
        error_message.style.display = 'block';
        input_title.value = null;
        input_assign.value = null;
        return;
    }
    const item = document.createElement("li");
    item.textContent = title;
    show_task.appendChild(item);
    input_title.value = null;

    // create button
    const span = document.createElement("SPAN");
    span.textContent = close_sign;
    span.className = "close";
    item.appendChild(span);

    // create assign 
    const span_assign = document.createElement("SPAN");
    span_assign.textContent = (assign && assign.trim()) ? assign : "بدون مسئول";
    span_assign.className = "assign-tab";
    item.appendChild(span_assign);
    input_assign.value = null;
}

submit.addEventListener('click' , function() {
    submit.style.display = 'none';
    error_message.style.display = 'none';
    addTask.style.display = 'block';
})

cancel_task.addEventListener('click' , function() {
    submit.style.display = 'block';
    addTask.style.display = 'none';
    input_title.value = null;
    input_assign.value = null;
})

create_task.addEventListener('click' , function() {
    let title = input_title.value;
    let assign = input_assign.value;
    //console.log(title , ', ' , description , ', ' , assign)
    CreateTaskItem(title , assign);
    addTask.style.display = 'none';
    submit.style.display = 'block';
})

// close task when click on close class
show_task.addEventListener("click" , function(event) {
    if (event.target.classList.contains("close")) {
        event.target.parentElement.remove();
    } else if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
})
