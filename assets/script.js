var questions = [
    {
      question: "What is Javascript used for??",
      answers: [
        { text: "To add style to a webpage", correct: false },
        { text: "To search for information about coding", correct: false },
        { text: "To add functionality to a webpage", correct: true },
        { text: "Nothing, it's useless", correct: false }
      ]
    },
    {
      question: "How do we link Javascript to the HTML?",
      answers: [
        { text: "<script>", correct: true },
        { text: "<href>", correct: false },
        { text: "<link>", correct: false },
        { text: "<id>", correct: false }
      ]
    },
    {
      question: "Which character(s) goes after a function is called?",
      answers: [
        { text: "=", correct: false },
        { text: "->", correct: false },
        { text: "[]", correct: false },
        { text: "()", correct: true }
      ]
    },
    // to whomever grades this, this is an inside joke with our instructor
    {
      question: "According to Derek Drummond(our instructor) which of the following is typed correctly?",
      answers: [
        { text: "i+i", correct: false },
        { text: "+i+", correct: false },
        { text: "i++", correct: false },
        { text: "++i", correct: true }

      ]
    }
  ];
  
  var answerResponseElement = document.getElementById('answer-response');
  var startButton = document.getElementById('btn');
  var questionElement = document.getElementById('question');
  var answerButtonsContainer = document.getElementById('answer-buttons');
  var currentQuestionIndex = 0;
  var timerInterval;
  
  function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    questionElement.style.display = "block";
    answerButtonsContainer.style.display = "block";
    startButton.style.display = "none";
  
    Array.from(answerButtonsContainer.children).forEach((button, index) => {
      var answer = currentQuestion.answers[index];
      if (answer) {
        button.textContent = answer.text;
        button.disabled = false;
      }
    });
  
    var nextButton = document.getElementById('next-btn');
    nextButton.style.display = 'none';
  }
  
  function handleAnswerButtonClick(index) {
    var currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answers[index].correct) {
      answerResponseElement.textContent = "block";
      answerResponseElement.textContent = 'Correct!';
      answerResponseElement.classList.add('correct');
      answerResponseElement.classList.remove('incorrect');
    } else {
      answerResponseElement.textContent = "block";
      answerResponseElement.textContent = 'Incorrect!';
      answerResponseElement.classList.add('incorrect');
      answerResponseElement.classList.remove('correct');
      timeLeft -= 15;
    }
  
    var nextButton = document.getElementById('next-btn');
    nextButton.style.display = 'block';
  
    Array.from(answerButtonsContainer.children).forEach((button) => {
      button.disabled = true;
    });
  }
  
  function displayNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = timeLeft;
  
    var score = timeLeft;
  
    questionElement.textContent = "Quiz Over! Your Score: " + score;
    answerButtonsContainer.style.display = "none";
  
    var initials = window.prompt("Enter your initials:");
  
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    startButton.style.display = "block";
    startButton.textContent = "Play Again?";
    nextButton.style.display = "none";
  }
  
  function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
  
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('answer-response').textContent = '';
  
    displayQuestion();
  
    document.getElementById('next-btn').style.display = 'none';
  
    Array.from(answerButtonsContainer.children).forEach((button) => {
      button.disabled = false;
    });
  
    timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  startButton.addEventListener('click', () => {
    console.log('Start button clicked');
    startQuiz();
  });
  
  answerButtonsContainer.addEventListener('click', (event) => {
    var answerButton = event.target;
    var answerIndex = Array.from(answerButtonsContainer.children).indexOf(answerButton);
    handleAnswerButtonClick(answerIndex);
  });

  var nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', displayNextQuestion);

var highScoresButton = document.getElementById('high-scores-button');
var highScoresList = document.getElementById('high-scores-list');
var isHighScoresVisible = false;

highScoresButton.addEventListener('click', function() {
  var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
  if (!isHighScoresVisible) {
    highScoresList.innerHTML = '';
    
    highScores.forEach(function(score) {
      var listItem = document.createElement('li');
      listItem.textContent = score.initials + ': ' + score.score;
      highScoresList.appendChild(listItem);
    });
    
    isHighScoresVisible = true;
  } else {
    highScoresList.innerHTML = '';
    isHighScoresVisible = false;
  }
});

var clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
  localStorage.removeItem('highScores');
  highScoresList.innerHTML = '';
});