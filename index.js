$(document).ready(function() { 
    console.log('Script Loaded')
    
    const fullName = localStorage.getItem('full-name');

    if(fullName !== null && fullName !== '') {
        $('#name-input-wrapper').css('display', 'none');
        $('#todo-input-wrapper').css('display', 'block');
        $('#first-name').html(fullName);
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
            localStorage.setItem('major-todo', e.target.value);

            $('#major-todo-wrapper').css('display', 'none');
            $('#major-todo-item').css('display', 'block');


            console.log(e.target.value);
            console.log($('#todo-text'));

            $('#major-todo-label').html(e.target.value)
        }
    })

    $('#major-todo-checkbox').change(function(e) {
        $('#major-todo-label').toggleClass('todo-item-completed')
    })
});