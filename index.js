$(document).ready(function() { 
    console.log('Script Loaded')

    let minute = new Date().getMinutes();
    minute = minute < 10 ? '0'+ minute : minute;
    $('#time').html(new Date().getHours() + ':' + minute);
    setInterval(() => {
        let minute = new Date().getMinutes();
        minute = minute < 10 ? '0'+ minute : minute;
        $('#time').html(new Date().getHours() + ':' + minute);
    }, 60000)
    
    const fullName = localStorage.getItem('full-name');

    if(fullName !== null && fullName !== '') {
        $('#name-input-wrapper').css('display', 'none');
        $('#todo-input-wrapper').css('display', 'block');
        $('#first-name').html(fullName.split(' ')[0]);
    }

    //Handle Major TODO value and status on page load
    var majorTodoObj = localStorage.getItem('major-todo');
    majorTodoObj = majorTodoObj !==null && majorTodoObj !== '' ? JSON.parse(majorTodoObj) : {};
    $('#major-todo-wrapper').css('display', 'none');
    $('#major-todo-item').css('display', 'block');
    $('#major-todo-label').html(majorTodoObj.label);
    if(majorTodoObj.completed) {
        $('#major-todo-checkbox').prop('checked', true);
        $('#major-todo-label').addClass("todo-item-completed");
    } else {
        $('#major-todo-checkbox').prop('checked', false);
        $('#major-todo-label').removeClass("todo-item-completed");
    }

    $('#name-input').keyup(function(e) {
        if(e.keyCode === 13) {
            localStorage.setItem('full-name', e.target.value);

            $('#name-input-wrapper').css('display', 'none');
            $('#todo-input-wrapper').css('display', 'block')
            $('#first-name').html(e.target.value)
        }
    })

    $('#major-todo').keyup(function(e) {
        if(e.keyCode === 13) {

            $('#major-todo-wrapper').css('display', 'none');
            $('#major-todo-item').css('display', 'block');

            addToList(e.target.value);

            console.log($('#todo-text'));

            $('#major-todo-label').html(e.target.value);
        }
    })

    $('#major-todo-checkbox').change(function(e) {
        $('#major-todo-label').toggleClass('todo-item-completed');
        let majorTodoObj = JSON.parse(localStorage['major-todo']);
        if(e.target.checked) {
            majorTodoObj.completed = true;
            $('#major-todo-label').addClass("todo-item-completed");
        } else {
            majorTodoObj.completed = false;
            $('#major-todo-label').removeClass("todo-item-completed");
        }

        localStorage.setItem('major-todo', JSON.stringify(majorTodoObj));
    })

    function addToList (listItem) {
        if (localStorage && listItem) {
            let majorTodoObj = {
                label: listItem,
                completed: false,
            }

            localStorage.setItem('major-todo', JSON.stringify(majorTodoObj));
        } 
    }

    $('#todo-btn').click(function() {
        let storedTodoList = getTodosFromLocalStorage();

        if(storedTodoList.length <= 0) {
            $('#no-todos').css('display', 'flex');
        } else {
            $('#todo-list-wrapper').html('');
            storedTodoList.map((item, pos) => {
                let newlyCreatedElem = createTodoItemDynamically(item, pos);
                $('#todo-list-wrapper').append(newlyCreatedElem);
            })
            $('#todo-list').css('display', 'block');
        }
    })

    $('#add-first-todo').click(function() {
        $('#no-todos').css('display', 'none');
        $('#todo-list').css('display', 'block');
    })

    function createTodoItemDynamically(obj, pos) {
        // <div class="todo-item">
        //     <label>
        //         <input type="checkbox">
        //         <p class="todo-text todo-item-completed">Finish Assignment</p>
        //     </label>
        //     <i class="far fa-trash-alt delete-icon"></i>
        // </div> 

        const mainDiv = document.createElement('div');
        mainDiv.className = 'todo-item';

        const labelWrapper = document.createElement('label');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';


        const checkBoxLabel = document.createElement('p');
        checkBoxLabel.className = 'todo-text';
        if(obj.checked) {
            checkBox.checked = true;
            checkBoxLabel.classList.add('todo-item-completed');
        }
        checkBoxLabel.innerHTML = obj.label;

        checkBox.onchange = function (e) {
            let checkedState = e.target.checked; //True when checked and False else wise
            let storedTodoList = getTodosFromLocalStorage();
            if(checkedState) {
                checkBoxLabel.classList.add('todo-item-completed')
                storedTodoList[pos].checked = true;
            } else {
                checkBoxLabel.classList.remove('todo-item-completed')
                storedTodoList[pos].checked = false;
            }
            localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
        }

        labelWrapper.appendChild(checkBox);
        labelWrapper.appendChild(checkBoxLabel);
        
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'far fa-trash-alt delete-icon';

        mainDiv.appendChild(labelWrapper);
        mainDiv.appendChild(deleteIcon);

        return mainDiv;
    }

    function getTodosFromLocalStorage() {
        let storedTodoList = localStorage.getItem('todo-list');
        storedTodoList = storedTodoList !== null && storedTodoList !== '' ? storedTodoList : [];
        storedTodoList = storedTodoList.length > 0 ? JSON.parse(storedTodoList) : [];

        return storedTodoList;
    }

    $('#new-todo').keyup(function(e) {
        if(e.keyCode === 13) {
            console.log(e.target.value);

            let storedTodoList = getTodosFromLocalStorage();

            let todoCount = 0;
            if(storedTodoList.length > 0) {
                todoCount = storedTodoList.length;
            }

            const currentTodoObj = {
                id: todoCount + 1,
                checked: false,
                label: e.target.value
            }

            storedTodoList.push(currentTodoObj);
            localStorage.setItem('todo-list', JSON.stringify(storedTodoList));

            const newlyCreatedTodo = createTodoItemDynamically(currentTodoObj);

            $('#todo-list-wrapper').append(newlyCreatedTodo);
            $(this).val('');
        }
    })
});