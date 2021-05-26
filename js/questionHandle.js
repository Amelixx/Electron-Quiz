const questions = require("../js/questions.json")[document.title],
{ remote, app } = require('electron'),
stats = require(`../js/stats.json`),
fs = require('fs'),
letters = ["A", "B", "C", "D", "E", "F"]

stats.currentQuiz = {
    topic: document.title,
    correct: 0,
    startTime: Date.now()
}

nextQuestion = (answer, shuffledArray) => {
    let questionNumberString = document.getElementById('question-number'),
    questionText = document.getElementById('question-text'),
    answerSpace = document.getElementById('answerSpace'),
    lastQuestionNum;
    try {
        lastQuestionNum = Number(questionNumberString.innerHTML.split(" ")[1][0])
    } catch {
        lastQuestionNum = 0
    }

    stats.currentQuiz.title = document.getElementById('title').innerText

    // Check if last answer was correct and update accordingly
    if (lastQuestionNum > 0 && checkCorrect(questions[lastQuestionNum-1], answer, shuffledArray)) {
        stats.currentQuiz.correct ++
    }
    fs.writeFileSync(`./js/stats.json`, JSON.stringify(stats, null, 4))

    let question = questions[lastQuestionNum]
    
    if (question) {
        // Actually build the next question
        questionNumberString.innerHTML = `Question ${lastQuestionNum + 1}/${questions.length}`
        questionText.innerHTML = question[0]
    
        if (Array.isArray(question[1])) {
            let answers = [...question[1]],
            answerSpaceHtml = "<ul>", array = "["
            shuffle(answers);
            answers.forEach(a => {
                array += `'${a}',`
            })
            array = array.slice(0, array.length -1) + "]"
    
            answers.forEach((a, i) => {
                answerSpaceHtml += `<li><a onclick="nextQuestion('${letters[i]}', ${array})" href="#">${letters[i]}: ${a}</a></li>`
            })
            answerSpace.innerHTML = answerSpaceHtml + `</ul>`
        }
        else {
            // Non multiple choice question - textbox?
            let answerSpaceHtml = `<input id="question-input" placeholder="Type Answer Here.." autofocus="true"></input>\n` +
            `<a onclick="nextQuestion('textbox', null)" href="#">Submit</a>`

            answerSpace.innerHTML = answerSpaceHtml
            if (answer) {
                correctAns = questions[lastQuestionNum][1]
            }
        }
    }
    else {
        remote.getCurrentWindow().loadFile('./html/results.html')
    }
}

checkCorrect = (question, answer, choices) => {
    if (choices == null) {
        // Non multiple choice question
        let answer = document.getElementById(`question-input`).value
        return answer.toLowerCase() == question[1].toLowerCase()
    }
    correctAns = question[1][0] // Written version of correct answer
    // choices.indexOf(correctAns) - Loation of correct answer in shuffled array
    correctLetter = letters[choices.indexOf(correctAns)] // Corresponding letter the user clicked on

    return answer == correctLetter
}

shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}