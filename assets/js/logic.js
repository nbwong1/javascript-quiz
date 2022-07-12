// start buttons => timer starts and question appears
var questionsIndex = 0;
var quizTime = questions.length * 15;
var timer;

// variables for the DOM
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// answer the question, receive the next question
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.setAttribute("class");

  timerId = setInterval(clockTick, 1000);

  getQuestion();
}


// sounds for correct and wrong answers

// end of the quiz (answer all questions or timer hits 0) and the game is over

// can save initials on high score page

