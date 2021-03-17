const log = function() {
    console.log.apply(console, arguments)
}

const e = selector => {
    return document.querySelector(selector)
}

const es = selector => {
    return document.querySelectorAll(selector)
}

const appendHtml = (element, position, html) => {
	element.insertAdjacentHTML(position, html)
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const removeClassAll = className => {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = (elements, eventName, callback) => {
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
const find = (element, selector) => {
    return element.querySelector(selector)
}

const indexOfElement = (target, elements) => {
    for(let i = 0; i < elements.length; i++) {
        if(target == elements[i]) {
            return i
        }
    }
}

const addClass = (index, selector, className) => {
    var elements = es(selector)
    var e = elements[index]
    removeClassAll(className)
    e.classList.add(className)
}

