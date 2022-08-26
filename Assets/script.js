var timer = document.getElementById('timer');
var timeLeft;
var timeInterval;
const startButton = document.getElementById('quizStarter');
const highscoreBtn = document.getElementById('highscores');
const firAnsBtn = document.getElementById('firstAnswer');
const secAnsBtn = document.getElementById('secondAnswer');
const thiAnsBtn = document.getElementById('thirdAnswer');
const fouAnsBtn = document.getElementById('fourthAnswer');
const highForm = document.getElementById('highForm');
const submitBtn = document.getElementById('submit');
const frame = document.getElementById('frame');
var initialsInput = document.querySelector('#initials');
var recordList = document.querySelector('#recordList');
var questSet = document.getElementById('questions');
var feedback = document.getElementById('feedback');
var questCount;
var records = [];

// Creating a restart button to display at the end of the quiz
var restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart Quiz';
restartBtn.style.display = 'none';
frame.append(restartBtn);

// Restart the quiz, hide the form and show the answer buttons, then call functions to run quiz
restartBtn.addEventListener('click', function(event) {

    highForm.style.visibility = 'hidden';
    
    firAnsBtn.style.display = 'initial';
    secAnsBtn.style.display = 'initial';
    thiAnsBtn.style.display = 'initial';
    fouAnsBtn.style.display = 'initial';

    restartBtn.style.display = 'none';
    
    startTimer();
    startQuiz();
});

// Event listener for first answer button, setting right/wrong conditions as well
firAnsBtn.addEventListener('click', function(event) {
    var element = event.target;

    if (questCount === 2) {
        rightAns();
    } else {
        wrongAns();
    }
});

// Event listener for second answer button, setting right/wrong conditions as well
secAnsBtn.addEventListener('click', function(event) {
    var element = event.target;

    if (questCount === 1 || questCount === 3) {
        rightAns();
    } else {
        wrongAns();
    }
});

// Event listener for third answer button, setting right/wrong conditions as well
thiAnsBtn.addEventListener('click', function(event) {
    var element = event.target;

    if (questCount === 5) {
        rightAns();
    } else {
        wrongAns();
    }
});

// Event listener for fourth answer button, setting right/wrong conditions as well
fouAnsBtn.addEventListener('click', function(event) {
    var element = event.target;

    if (questCount === 4) {
        rightAns();
    } else {
        wrongAns();
    }
});

// Adding event listener to highscore button to call view Highscores function.
highscoreBtn.addEventListener('click', function(event) {
    viewHighscores();
});

// Adding event listener to start button to enable quiz to start
startButton.addEventListener('click', function(event) {
    
    startButton.style.visibility = 'hidden';
    frame.style.visibility = 'visible';
    
    startTimer();
    startQuiz();
});

// Function to start the countdown timer for the quiz and enable event listeners for answer buttons
function startTimer () {
    timeLeft = 60;
    questCount = 0;
    timeInterval = setInterval(countdown, 1000);
}

// Function for counting down timer on quiz
function countdown() {
        timeLeft--;
        timer.innerText = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.style.display = 'none';
            highscores();
        }
}

// Setting context for first question
function firstQuestion() {
    questSet.textContent = "Choose letter b."
    firAnsBtn.textContent = "a";
    secAnsBtn.textContent = "b";
    thiAnsBtn.textContent = "c";
    fouAnsBtn.textContent = "d";
}

// Setting context for second question
function secondQuestion() {
    questSet.textContent = "Choose number 1."
    firAnsBtn.textContent = "1";
    secAnsBtn.textContent = "2";
    thiAnsBtn.textContent = "3";
    fouAnsBtn.textContent = "4";
}

// Setting context for third question
function thirdQuestion() {
    questSet.textContent = "Choose letter q."
    firAnsBtn.textContent = "p";
    secAnsBtn.textContent = "q";
    thiAnsBtn.textContent = "r";
    fouAnsBtn.textContent = "s";
}

// Setting context for fourth question
function fourthQuestion() {
    questSet.textContent = "Choose number 17."
    firAnsBtn.textContent = "7";
    secAnsBtn.textContent = "11";
    thiAnsBtn.textContent = "13";
    fouAnsBtn.textContent = "17";
}

// Setting context for fifth question
function fifthQuestion() {
    questSet.textContent = "Choose letter x."
    firAnsBtn.textContent = "s";
    secAnsBtn.textContent = "3";
    thiAnsBtn.textContent = "x";
    fouAnsBtn.textContent = "y";
}

// Sets feedback for when correct answer is selected
function rightAns() {
    feedback.textContent = 'correct!';
    feedback.style.visibility = 'visible'; 
    setTimeout(function() {
        feedback.style.visibility = 'hidden';
    },2000)
    startQuiz();
}

// Sets feedback for when incorrect answer is selected
function wrongAns() {
    feedback.textContent = 'wrong answer!';
    feedback.style.visibility = 'visible';
    setTimeout(function() {
        feedback.style.visibility = 'hidden';
    },2000)

    if (timeLeft < 10) {
        timeLeft = 1;
    } else {
        timeLeft -= 10;
    }
    startQuiz();
}

// This function calls the question based on the status of the question counter
function startQuiz() {
    if (questCount === 0) {
        questCount++;
        firstQuestion();
    } else if (questCount === 1) {
        questCount++;
        secondQuestion();
    } else if (questCount === 2) {
        questCount++;
        thirdQuestion();
    } else if (questCount === 3) {
        questCount++;
        fourthQuestion();
    } else if (questCount === 4) {
        questCount++;
        fifthQuestion();
    } else {
        highscores();
    }
}

// This function captures initials and stores them with the remaining time to local storage
function highscores() {
    firAnsBtn.style.display = 'none';
    secAnsBtn.style.display = 'none';
    thiAnsBtn.style.display = 'none';
    fouAnsBtn.style.display = 'none';
    clearInterval(timeInterval);
    highForm.style.visibility = 'visible';
    
    questSet.textContent = "Enter your initials:";

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        var user = {
            initials: initialsInput.value.trim(),
            score: timeLeft
        };

        localStorage.setItem("user", JSON.stringify(user));
        initialsInput.value = '';
    })

    viewHighscores();

    restartBtn.style.display = 'initial';
}

// Display highscores in footer of page
function viewHighscores() {
    var storedHighscores = JSON.parse(localStorage.getItem("user"));

    while (recordList.firstChild) {
        recordList.removeChild(recordList.firstChild);
    }
    
    if (storedHighscores !== null) {
        records.push(storedHighscores);
    }

    for (var i=0; i<records.length; i++) {

        var li = document.createElement("li");
        li.textContent = records[i].initials + " " + records[i].score;

        li.setAttribute("data-index", i);

        recordList.appendChild(li);
    }
}