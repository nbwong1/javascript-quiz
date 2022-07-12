// start buttons => timer starts and question appears
var currentQuestionIndex = 0;
var quizTime = questions.length * 15;
var timerId;

// variables for the DOM
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var sfxRight = new Audio("assets/sfw/correct.wav");
var sfxWrong = new Audio("assets/sfw/incorrect.wav");


// answer the question, receive the next question
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.setAttribute("class");

  timerId = setInterval(clockTick, 1000);

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  
  var titleEl = document.getElementById("questions-title");
  titleEl.textContent = presentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + "." + choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}
// sounds for correct and wrong answers

// end of the quiz (answer all questions or timer hits 0) and the game is over

// can save initials on high score page

