const taskInput = document.getElementById('task-input');//入力フィールド取得
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

const completedHeading = document.createElement('h3');
completedHeading.textContent = '完了';
completedHeading.style.display = 'none'; 

document.addEventListener('DOMContentLoaded', loadTasks);

completedList.before(completedHeading);


const sortButton = document.getElementById('sort-btn');



function toggleCompletedHeading() {
  if (completedList.children.length > 0) {
    completedHeading.style.display = 'block';  // Show "Completed"
  } else {
    completedHeading.style.display = 'none';   // Hide "Completed" 
  }
}




// === LOCAL STORAGE FUNCTIONS ===
function saveTasks() {
  const allTasks = [
    // Active tasks (false)
    ...Array.from(taskList.children).map(li => ({
      text: li.querySelector('span').textContent,
      completed: false,
      priority: li.dataset.priority || 'medium'
      // Remove originalIndex - not needed anymore
    })),
    
    // Completed tasks (true)  
    ...Array.from(completedList.children).map(li => ({
      text: li.querySelector('span').textContent,
      completed: true,
      priority: li.dataset.priority || 'medium'
      // Remove originalIndex - not needed anymore
    }))
  ];
  
  localStorage.setItem('todoTasks', JSON.stringify(allTasks));
}


function loadTasks() {
  const saved = localStorage.getItem('todoTasks');
  if (!saved) return; // if there is nothing saved, finish the function
  
  const tasks = JSON.parse(saved);
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    if (task.completed) checkbox.checked = true;
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList.add('delete-btn');
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);
    
    // Add event listeners (copy from addTask)
        deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskItem.classList.add('deleted');
        taskItem.addEventListener('transitionend', () => {  // ← Changed from animationend
          taskItem.remove();
          toggleCompletedHeading();
          saveTasks();
            }, { once: true });
    });
    
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      if (checkbox.checked) {
        taskItem.classList.add('taskCompleted');
        taskItem.addEventListener('animationend', () => {
          taskItem.classList.remove('taskCompleted');
          taskItem.classList.add('completed');
          completedList.prepend(taskItem);
          toggleCompletedHeading();
          saveTasks();
        }, { once: true });
      } else {
  taskItem.classList.remove('completed');
  taskItem.classList.add('movingBack');
  taskList.prepend(taskItem);
  toggleCompletedHeading();
  saveTasks();
  setTimeout(() => taskItem.classList.remove('movingBack'), 250);
}
    });
    
    if (task.completed) {
      taskItem.classList.add('completed');
      completedList.appendChild(taskItem);
    } else {
      taskList.appendChild(taskItem);
      taskItem.dataset.priority = task.priority || 'medium'; 
      taskItem.classList.add('show'); 
    }
  });
  toggleCompletedHeading();
}













// Function to add a new task
function addTask() {
  addButton.classList.add('addButtonPushed');
    setTimeout(() => {
    addButton.classList.remove('addButtonPushed');
  }, 100); // matches your 0.1s-ish transition

  const taskText = taskInput.value.trim();//value in the input field  テキストボックスへ入力された値（文字等）//trim()にて空白除去

  

/// fallback plan/////////////////////////////////////////////////////////////
  if (taskText === "") {//もしテキストがなにも記入されていなかったら、
    alert("タスクを入れてください！");//アラートを鳴らし、
    return;//関数を終了。
  }
  ////////////////////////////////////////////////////////////////////////////

  const taskItem = document.createElement('li');
  const priority = document.getElementById('priority-select').value;
taskItem.dataset.priority = priority;  // Save to element
  taskItem.addEventListener('click', () => {
  console.log("LI clicked!");
});
  //checkbox on the LEFT
  const checkbox=document.createElement('input');//input 要素を生成
  checkbox.type='checkbox';//それをチェックボックスへと変化させる
  checkbox.classList.add('task-checkbox');//cssクラスを付与

// task text
const taskSpan = document.createElement('span');

  taskSpan.textContent = taskText;// spanをinputされたvalueで上書き

  //  creating a delete button 
  const deleteButton = document.createElement('button'); //button要素を作成
  deleteButton.textContent = "削除";//buttonの上にDeleteと書いた
  deleteButton.classList.add('delete-btn');//.delete-btnのcssクラスを付与した

  // delete only, no toggle

  deleteButton.addEventListener('click', (e) => {
  e.stopPropagation();
  taskItem.classList.add('deleted');
  taskItem.addEventListener('transitionend', () => {  // ← Changed from animationend
    taskItem.remove();                 // remove AFTER animation finishes
    toggleCompletedHeading();    
    saveTasks();
    
               // update "Completed" heading
  }, { once: true });                        // run only once
});
  

  //  toggle completed  when checkbox changes



checkbox.addEventListener('change', (e) => {
  e.stopPropagation();
  
  if (checkbox.checked) {
    taskItem.classList.add('taskCompleted');
    
    taskItem.addEventListener('animationend', () => {
      taskItem.classList.remove('taskCompleted');
      taskItem.classList.add('completed');
      completedList.prepend(taskItem);
      toggleCompletedHeading();
      saveTasks(); 
    }, { once: true });
    
  } else {
  taskItem.classList.remove('completed');
  taskItem.classList.add('movingBack');
  taskList.prepend(taskItem);
  toggleCompletedHeading();
  saveTasks();
  setTimeout(() => taskItem.classList.remove('movingBack'), 250);
}
});




  // order = LEFT → RIGHT

  taskItem.appendChild(checkbox);     // left

  taskItem.appendChild(taskSpan);     // center

  taskItem.appendChild(deleteButton); // right
  taskList.prepend(taskItem);
setTimeout(() => {
  taskItem.classList.add('show');
  saveTasks();
}, 10);
taskInput.value = "";
}

function sortTasks() {
  const tasks = Array.from(taskList.children);

  // Define priority order
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3
  };

  // Sort tasks according to priority
  tasks.sort((a, b) => {
    const priorityA = priorityOrder[a.dataset.priority] || 2;
    const priorityB = priorityOrder[b.dataset.priority] || 2;
    return priorityA - priorityB;
  });

  // Clear and re-append in new order
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));

  // Save new order to localStorage
  saveTasks();
}




// Event listener for the add button
addButton.addEventListener('click', addTask);//addButtonにclick handlerを付与
// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {//入力フィールドにkeypress handlerを付与//e はevent object that contains data of the user action
  if (e.key === 'Enter') {

    addTask(); //addTask()を実行
  }



});

sortButton.addEventListener('click', () => {
  sortButton.textContent = "優先度順に整列されました ✅";
  setTimeout(() => sortButton.textContent = "優先度順に並べる", 1500);
  sortTasks();
});



