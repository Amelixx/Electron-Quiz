const fs = require(`fs`)

loadResults = () => {
    let questionText = document.getElementById('question-text'),
    title = document.getElementById('title'),
    answerSpace = document.getElementById('answerSpace'),
    stats = require(`../js/stats.json`),
    questions = require(`../js/questions.json`)[stats.currentQuiz.topic],

    percentage = Math.round(stats.currentQuiz.correct / questions.length * 100),
    timeTaken = Date.now() - stats.currentQuiz.startTime, passMsg, color;

    if (percentage >= 60) {passMsg = `As you have achieved a score above 60%, you have <span class="green">passed</span> the quiz!`; color="green"}
    else {passMsg = `You have <span class="red">failed</span> the quiz. To pass, you must achieve above 60% score.`; color="red"}

    title.innerHTML = `${stats.currentQuiz.title}<br>Results`
    questionText.innerHTML = `You scored <span class="${color}">${percentage}%!</span>`
    answerSpace.innerHTML = `<span class="${color}">${stats.currentQuiz.correct}/${questions.length}</span> questions correct.<br><br>You took ${getTimeString(timeTaken)} to complete the quiz.<br><br>${passMsg}`

    if (stats[stats.currentQuiz.topic] && stats[stats.currentQuiz.topic] < stats.currentQuiz.correct) {
        // New high score
        stats[stats.currentQuiz.topic] = stats.currentQuiz.correct
        fs.writeFileSync(`./js/stats.json`, JSON.stringify(stats, null, 4))
    }
}

getTime = (date) => {
    let seconds = Math.round(date / 1000),
    minutes = Math.floor(seconds / 60);
    seconds =  seconds % 60;

    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return {
        hours: Math.round(hours),
        minutes: Math.round(minutes),
        seconds: Math.round(seconds)
    }
}

getTimeString = (date) => {
    let times = this.getTime(date)
    
    if (times.hours == 0) times.hours = false
    if (times.minutes == 0) times.minutes = false
    if (times.seconds == 0) times.seconds = false

    if (times.hours > 1) { hourS = "s"; } else hourS = ""
    if (times.minutes > 1) minuteS = "s"; else minuteS = ""
    if (times.seconds > 1) secondS = "s"; else secondS = ""

    if (times.hours && !times.minutes && !times.seconds) return `${times.hours} hour${hourS}`
    if (!times.hours && times.minutes && !times.seconds) return `${times.minutes} minute${minuteS}`
    if (!times.hours && !times.minutes && times.seconds) return `${times.seconds} second${secondS}`

    if (times.hours && times.minutes && times.seconds) return `${times.hours} hour${hourS}, ${times.minutes} minute${minuteS} and ${times.seconds} second${secondS}`
    if (times.hours && times.minutes && !times.seconds) return `${times.hours} hour${hourS} and ${times.minutes} minute${minuteS}`
    if (times.hours && !times.minutes && times.seconds) return `${times.hours} hour${hourS} and ${times.seconds} second${secondS}`
    if (!times.hours && times.minutes && times.seconds) return `${times.minutes} minute${minuteS} and ${times.seconds} second${secondS}`
    if (!times.hours && !times.minutes && !times.seconds) return new String(`0 seconds. (About now)`)

    return new String(`${hours} ${minutes} ${seconds}`)
}