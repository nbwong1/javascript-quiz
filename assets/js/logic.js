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


// hiding the start menu, answer and moving through the questions
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.setAttribute("class");

  timerId = setInterval(clockTick, 1000);

  getQuestion();
}
//getting the question from the questions.js
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
//based on the answer the user selects
function questionClick() {
  if(this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time<0) {
      time = 0;
    }
    // if the user selects the wrong answer, play the incorrect audio.
    timerEl.textContent = time;
    sfwWrong.play();
    feedbackEl.textContent = "Wrong!";
    
    //if the correct answer, play the correct audio.
  } else {
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  
// update the index that is being selected to move to the next question.
  currentQuestionIndex++;

//checking if there are still some questions to select from
  if (currentQuestionIndex == questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
// once the quiz is done, finish and show end screen
function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}
// save the high score along with initials
function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores = 
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    var newScore = {
      score: time,
      initials: initials
    };
// the high score is saved on the highscores.html
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(enent) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;