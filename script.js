let tasks = [];
window.onload = function () {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        doTask();
    }
    // if(localStorage.getItem("id")){ 
    
    //     id=JSON.parse(localStorage.getItem("id"));
    // }
};
document.getElementById("todo").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addValue();
    }
});

function formatTextWithLineBreaks(text, wordsPerLine = 20) {
    let words = text.split(" ");
    let result = "";

    for (let i = 0; i < words.length; i++) {
        result += words[i] + " ";

        if ((i + 1) % wordsPerLine === 0) {
            result += "<br>";
        }
    }
    return result.trim();
}

function addValue() {
    let taskInput = document.getElementById("todo");
    let message = document.getElementById("message");

    if (taskInput.value.trim() === "") {
        message.innerText = "Please enter a task";
        return;
    }

    message.innerText = "";

    let taskObj = {
        id: Date.now(),
        name: formatTextWithLineBreaks(taskInput.value),
        status: "pending"
    };

    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    doTask();
}


function doTask() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.map(task => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.status === "completed";

        let span = document.createElement("span");
        span.innerHTML = task.name;

        if (task.status === "completed") {
            span.style.textDecoration = "line-through";
        }

        checkbox.onchange = function () {
            task.status = checkbox.checked ? "completed" : "pending";
            span.style.textDecoration = checkbox.checked ? "line-through" : "none";
            localStorage.setItem("tasks", JSON.stringify(tasks));
        };

        let del = document.createElement("button");
        del.innerText = "Delete";
        del.onclick = function () {
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            doTask();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(del);

        list.appendChild(li);
    });
}
