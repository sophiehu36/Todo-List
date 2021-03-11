//获取当前时间
const currentTime = function() {
    const d = new Date()
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekdayArray = ['Sunday', 'Monday', 'Tuesday', ' Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = monthArray[d.getMonth()]
    const date = d.getDate()
    const weekday = weekdayArray[d.getDay()]
    const timeString = `${weekday}, ${month} ${date}`
    return timeString
}
//显示当前时间
const showCurrentTime = function() {
    const timeDiv = e('#current-time')
    const time = currentTime()
    timeDiv.innerHTML = time
}

//把输入的todo保存起来
//初始化todoList为一个空数组
let todoList = []

//点击Add Task获取input的内容添加新的task
const bindEventAddTask = function() {
    const addButton = e('#todo-add')
    bindEvent(addButton, 'click', function(){
        //获取input输入框内容
        const task = e('#todo-input').value
        log('input content', task)
        const todo = {
            'task': task,
        }
        //把新内容添加到todoList
        todoList.push(todo)
        log(todoList)
        //保存
        saveTodos()
        //插入todo
        insertTodo(todo)
    })
}
//todo模板
const todoTemplate = function(todo) {
    const t = `
        <div class="todo-item">
            <i class="fa fa-check-square-o"></i>
            <p contenteditable="true">${todo.task}</p>
            <i class="fa fa-trash-o"></i>
        </div>
        `
    return t
}

const insertTodo = function(todo) {
    const t = todoTemplate(todo)
    const todoDiv = e('#todo-content')
    appendHtml(todoDiv,'beforeend', t)
}

//保存todoList
const saveTodos = function() {
    const s = JSON.stringify(todoList)
    localStorage.todoList = s
}
//读取todoList
const loadTodos = function() {
    const s = localStorage.todoList
    return JSON.parse(s)
}

//程序加载后把todoList添加到页面中
const initTodoList = function() {
    todoList = loadTodos()
    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i]
        insertTodo(todo)
    }
}
//点击垃圾桶图标将task删除
const bindEventDeleteTask = function() {
    const todoDiv = e('#todo-content')
    //1.在父元素上绑定事件
    bindEvent(todoDiv, 'click', function(event) {
        const target = event.target
        const parent = target.parentElement
        //2.点击时获取到对应的todoList下标
        const index = indexOfElement(parent, todoDiv.children)
        log('index', index)
        //删除todoList对应下标的这一项
        todoList.splice(index,1)
        //删掉对应的div的html
        parent.remove()
        //3.保存todoList
        saveTodos()
    })
}


//添加completed tasks页面内容
//点击完成图标将task移动到completed tasks
//点击task内容可以修改并保存
const __main = function() {
    showCurrentTime()
    initTodoList()
    bindEventAddTask()
    bindEventDeleteTask()
}

__main()
