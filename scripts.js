
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    /*------Add Task Features------*/
    // Function to add a new task
    const addTask = (event) => {
        event.preventDefault(); // Prevent form submission
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.className = 'taskItem';

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'taskCheckbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
        });

        // Create task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        // Append elements to list item
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    };

    /*------Adds Local Storage feature------*/
    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        //  loop through each task item
        document.querySelectorAll('.taskItem').forEach(item => {
            // get checkbox status
            const checkbox = item.querySelector('.taskCheckbox');
            //  get task text
            const taskText = item.querySelector('span').textContent;
            //  create task object
            tasks.push({
                // set task text to taskText
                text: taskText,
                // set completed status as checkbox checked status
                completed: checkbox.checked
            });
        });
        //  add to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    /*------Load Tasks from Local Storage------*/
    // Load tasks from localStorage
    const loadTasks = () => {
        // get tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // loop through each task and create list items
        tasks.forEach(task => {
            // create list item
            const li = document.createElement('li');
            // set class based on completion status
            li.className = 'taskItem' + (task.completed ? ' completed' : '');

            // create checkbox for task
            const checkbox = document.createElement('input');

            // defines checkbox type
            checkbox.type = ' checkbox';

            // set checkbox class
            checkbox.className = 'taskCheckbox';

            // set checkbox status as completed or not; used to load tasks
            checkbox.checked = task.completed;

            // add event listener to toggle completed class and save tasks on change
            checkbox.addEventListener('change', () => {
                // toggles completed class, which sets tasks to completed or not
                li.classList.toggle('completed');
                // save tasks to local storage
                saveTasks();
            });

            // create span for task text; displays task text
            const taskSpan = document.createElement('span');
            // set task text
            taskSpan.textContent = task.text;

            // create delete button for task
            const deleteBtn = document.createElement('button');
            // create x icon on delete button
            deleteBtn.textContent = 'x';
            // set delete button class for styling
            deleteBtn.className = 'deleteBtn';
            // add event listener to delete task and save tasks on click
            deleteBtn.addEventListener('click', () => {
                // remove task item from list
                li.remove();
                // save tasks to local storage
                saveTasks();
            });

            // add elements to the list item
            li.appendChild(checkbox);
            // add task text to list item
            li.appendChild(taskSpan);
            // add delete button to list item
            li.appendChild(deleteBtn);
            // add list item to task list
            taskList.appendChild(li);
        });
    };

    //load tasks on page load
    loadTasks();


    /*Enable form submission*/
    const form = document.querySelector('.inputArea');
    form.addEventListener('submit', addTask);

    /*Enable enter key to add tasks*/
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(event);
        }
    });
});


