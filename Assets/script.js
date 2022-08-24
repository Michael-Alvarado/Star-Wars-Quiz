var timer = document.getElementById('timer');
var timeLeft = 60;
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
var questCount = 0;
var records = [];


highscoreBtn.addEventListener('click', function(event) {
    viewHighscores();
});
startButton.addEventListener('click', function(event) {
    
    startButton.style.visibility = 'hidden';
    frame.style.visibility = 'visible';
    
    startTimer();
    startQuiz();
});

function startTimer () {
    timeInterval = setInterval(countdown, 1000);
}

function countdown() {
        timeLeft--;
        timer.innerText = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.style.display = 'none';
            highscores();
        }
}

function firstQuestion() {
    questSet.textContent = "Choose letter b."
    firAnsBtn.textContent = "a";
    secAnsBtn.textContent = "b";
    thiAnsBtn.textContent = "c";
    fouAnsBtn.textContent = "d";

    firAnsBtn.addEventListener('click', function(event) {
        var element = event.target;

        if (questCount === 2) {
            rightAns();
        } else {
            wrongAns();
        }
    });
    secAnsBtn.addEventListener('click', function(event) {
        var element = event.target;

        if (questCount === 1 || questCount === 3) {
            rightAns();
        } else {
            wrongAns();
        }
    });
    thiAnsBtn.addEventListener('click', function(event) {
        var element = event.target;

        if (questCount === 5) {
            rightAns();
        } else {
            wrongAns();
        }
    });
    fouAnsBtn.addEventListener('click', function(event) {
        var element = event.target;

        if (questCount === 4) {
            rightAns();
        } else {
            wrongAns();
        }
    });
}

function secondQuestion() {
    questSet.textContent = "Choose number 1."
    firAnsBtn.textContent = "1";
    secAnsBtn.textContent = "2";
    thiAnsBtn.textContent = "3";
    fouAnsBtn.textContent = "4";
}

function thirdQuestion() {
    questSet.textContent = "Choose letter q."
    firAnsBtn.textContent = "p";
    secAnsBtn.textContent = "q";
    thiAnsBtn.textContent = "r";
    fouAnsBtn.textContent = "s";
}

function fourthQuestion() {
    questSet.textContent = "Choose number 17."
    firAnsBtn.textContent = "7";
    secAnsBtn.textContent = "11";
    thiAnsBtn.textContent = "13";
    fouAnsBtn.textContent = "17";
}

function fifthQuestion() {
    questSet.textContent = "Choose letter x."
    firAnsBtn.textContent = "s";
    secAnsBtn.textContent = "3";
    thiAnsBtn.textContent = "x";
    fouAnsBtn.textContent = "y";
}

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
    })

    viewHighscores();

    var restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart Quiz';
    frame.append(restartBtn);

    restartBtn.addEventListener('click', function(event) {
        timeLeft = 60;
        questCount = 0; 

        highForm.style.visibility = 'hidden';
        
        firAnsBtn.style.display = 'initial';
        secAnsBtn.style.display = 'initial';
        thiAnsBtn.style.display = 'initial';
        fouAnsBtn.style.display = 'initial';

        restartBtn.style.display = 'none';
        
        startTimer();
        startQuiz();
    });

}

function rightAns() {
    feedback.textContent = 'correct!';
    feedback.style.visibility = 'visible'; 
    setTimeout(function() {
        feedback.style.visibility = 'hidden';
    },2000)
    startQuiz();
}

function wrongAns() {
    feedback.textContent = 'wrong answer!';
    feedback.style.visibility = 'visible';
    setTimeout(function() {
        feedback.style.visibility = 'hidden';
    },2000)

    if (timeLeft < 10) {
        timeLeft = 1;
    } else {
        timeLeft - 10;
    }
    startQuiz();
}

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

function viewHighscores() {
    var storedHighscores = JSON.parse(localStorage.getItem("user"));

    if (storedHighscores !== null) {
        records.push(storedHighscores);
    }
    console.log(records.indexOf('MHA') + " " + records.indexOf(56));

    for (var i=0; i<records.length; i++) {

        var li = document.createElement("li");
        li.textContent = records[i].initials + " " + records[i].score;

        li.setAttribute("data-index", i);

        recordList.appendChild(li);
    }
}