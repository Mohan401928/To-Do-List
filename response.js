let list = document.getElementById('list');
let main = document.getElementById('min-container');

function Savedata() {
    let tasks = [];
    let listItems = list.getElementsByTagName('li');

    // Loop through all the list items and store their text and done status
    for (let item of listItems) {
        tasks.push({
            task: item.innerText.replace("\u2716", "").trim(),
            isDone: item.classList.contains('done')
        });
    }

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        savedTasks = JSON.parse(savedTasks); // Convert string back to array
        
        savedTasks.forEach(taskData => {
            let li = document.createElement('li');
            li.innerHTML = taskData.task;

            if (taskData.isDone) {
                li.classList.add('done');
            }

            let dele = document.createElement('span');
            dele.innerHTML = "\u2716";
            li.appendChild(dele);
            list.appendChild(li);

            li.addEventListener('click', function () {
                this.classList.toggle('done');
                Savedata();
            });

            dele.addEventListener('click', function () {
                li.remove();
                Savedata();
            });
        });
    }
}

function addfunction(e) {
    if (e.value === "") {
        alert("Write some task");
    } else {
        let li = document.createElement('li');
        li.innerHTML = e.value;

        let dele = document.createElement('span');
        dele.innerHTML = "\u2716";
        li.appendChild(dele);

        list.appendChild(li);

        li.addEventListener('click', function () {
            this.classList.toggle('done');
            Savedata();
        });

        dele.addEventListener('click', function () {
            li.remove();
            Savedata();
        });

        e.value = "";
        Savedata();
    }
}

// Load saved tasks from localStorage when the page loads
loadTasks();
