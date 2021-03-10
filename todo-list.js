const currentTime = function() {
    let d = new Date()
    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let weekdayArray = ['Sunday', 'Monday', 'Tuesday', ' Wednesday', 'Thursday', 'Friday', 'Saturday']
    let month = monthArray[d.getMonth()]
    let date = d.getDate()
    let weekday = weekdayArray[d.getDay()]
    let timeString = `${weekday}, ${month} ${date}`
    return timeString
}
const showCurrentTime = function() {
    let timeDiv = e('#current-time')
    let time = currentTime()
    timeDiv.innerHTML = time
}
showCurrentTime()