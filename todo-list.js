//获取当前时间
const currentTime = () => {
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
const showCurrentTime = () => {
    const timeDiv = e('#current-time')
    const time = currentTime()
    timeDiv.innerHTML = time
}

//把输入的todo保存起来
//初始化todoList为一个空数组
let todoList = []
//初始化odoCompletedList为一个空数组
let todoCompletedList = []

//点击Add Task获取input的内容添加新的task
const bindEventAddTask = () => {
    const addButton = e('#todo-add')
    bindEvent(addButton, 'click', () => {
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
const todoTemplate = todo => {
    const t = `
        <div class="todo-item">
            <i class="fa fa-check-square-o"></i>
            <p class="todo-task" contenteditable="true">${todo.task}</p>
            <i class="fa fa-trash-o" title="delete"></i>
        </div>
        `
    return t
}

//插入incomplete todo
const insertTodo = todo => {
    const t = todoTemplate(todo)
    const todoDiv = e('#todo-incomplete')
    appendHtml(todoDiv,'beforeend', t)
}

//保存todoList
const saveTodos = () => {
    const s = JSON.stringify(todoList)
    localStorage.todoList = s
}
//读取todoList,排除没有todo记录的情况
const loadTodos = () => {
    const s = localStorage.todoList
    if(s !== undefined) {
        return JSON.parse(s)
    } else {
        return []
    }
}

//程序加载后把todoList添加到页面中
const initTodoList = () => {
    todoList = loadTodos()
    todoCompletedList = loadCompletedTodos()
    initList(todoList, insertTodo)
    initList(todoCompletedList, insertCompletedTodo)
}
//遍历localstorage的list对应插入incomplete或completed
const initList = (list, func) => {
    for (let i = 0; i < list.length; i++) {
        const todo = list[i]
        func(todo)
    }
}

//点击垃圾桶图标将task删除
const bindEventDeleteTask = () => {
    const todoDiv = e('#todo-incomplete')
    //删除未完成todoList中的task
    deleteTask(todoDiv, todoList, saveTodos)
    const todoCompletedDiv = e('#todo-completed')
    //删除已完成的todoList中的task
    deleteTask(todoCompletedDiv, todoCompletedList, saveCompletedTodos)
}

const deleteTask = (element, list, saveFunc) => {
    //1.在父元素上绑定事件
    bindEvent(element, 'click', event => {
        const target = event.target
        if (target.classList.contains('fa-trash-o')) {
            const parent = target.parentElement
            //2.点击时获取到对应的todoList下标
            const index = indexOfElement(parent, element.children)
            log('index', index)
            //删除todoList对应下标的这一项
            list.splice(index, 1)
            //删掉对应的div的html
            parent.remove()
            //3.保存todoList
            saveFunc()
        }
    })
}

//点击task内容可以修改并保存，未完成
const bindEventEditTask = () => {
    log('bindEventBlur function')
    //直接把事件绑定在编辑的对象上
    const todos = es('.todo-task')
    bindAll(todos, 'blur', event => {
        //失去焦点的时候获取内容
        const target = event.target
        //log('container blur', event, target)
        const parent = target.parentElement
        const grandparent = parent.parentElement
        //2.点击时获取到对应的todoList下标
        const index = indexOfElement(parent, grandparent.children)
        log('index', index)
        //删除todoList对应下标的这一项
        todoList[index].task = target.innerHTML
        //3.保存todoList
        saveTodos()
    },true)
}

//添加completed tasks页面内容
//点击按钮切换显示Incomplete和completed页面
const bindEventChangePage = () => {
    const pageButtons = es('.todo-page') 
    bindAll(pageButtons, 'click', event => {
        const target = event.target
        log(target)
        if(target.id == 'incomplete') {
            //因为只有两个button，点击incomplete的时候给incomplete加效果
            addClass(0, '.todo-page', 'page-chosen')
            //显示incomplete页面
            addClass(0, '.todo-content', 'page-active')
        }
        if(target.id == 'completed') {
            addClass(1, '.todo-page', 'page-chosen')
            //显示incomplete页面
            addClass(1, '.todo-content', 'page-active')
        }
    })
}

//complete页面模板
const todoCompletedTemplate = todo => {
    const t = `
        <div class="todo-itemCompleted">
            <i class="fa fa-copy"></i>
            <p class="todo-task" contenteditable="false">${todo.task}</p>
            <i class="fa fa-trash-o" title="delete"></i>
        </div>
        `
    return t
}

//插入completed todo
const insertCompletedTodo = todoCompleted => {
    const t = todoCompletedTemplate(todoCompleted)
    const todoDiv = e('#todo-completed')
    appendHtml(todoDiv,'beforeend', t)
}

//保存completed todoList
const saveCompletedTodos = () => {
    const s = JSON.stringify(todoList)
    localStorage.todoCompletedList = s
}
//读取completed todoList,排除没有todo记录的情况
const loadCompletedTodos = () => {
    const s = localStorage.todoCompletedList
    if(s !== undefined) {
        return JSON.parse(s)
    } else {
        return []
    }
}

//点击完成图标将task移动到completed tasks, 保存到localstorage
const bindEventCompleteTask = () => {
    const todoDiv = e('.todo-content')
    //1.在父元素上绑定事件
    bindEvent(todoDiv, 'click', event => {
        const target = event.target
        if (target.classList.contains('fa-check-square-o')) {
            const parent = target.parentElement
            //2.点击时获取到对应的todoList下标
            const index = indexOfElement(parent, todoDiv.children)
            log('index', index)
            //把对应的task内容添加到completed页面中
            const completedTask = todoList[index].task
            const todoCompleted = {
                'task': completedTask,
            }
            todoCompletedList.push(todoCompleted)
            //插入completed task
            insertCompletedTodo(todoCompleted)
            //保存completed task list
            saveCompletedTodos()
            //删除(incomplete)todoList对应下标的这一项
            todoList.splice(index, 1)
            //删掉对应的div的html
            parent.remove()
            //3.保存todoList
            saveTodos()
        }
    })
} 


const __main = () => {
    showCurrentTime()
    initTodoList()
    bindEventAddTask()
    bindEventDeleteTask()
    bindEventEditTask()
    bindEventChangePage()
    bindEventCompleteTask()
}

__main()
