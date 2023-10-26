var questions = [
    {
      question: "What color is the sky?",
      answers: [
        { Text: "Blue", correct: true },
        { Text: "Pink", correct: false },
        { Text: "Orange", correct: false },
        { Text: "Green", correct: false }
      ]
    },
    {
      question: "What color is the grass?",
      answers: [
        { Text: "Red", correct: false },
        { Text: "Green", correct: true },
        { Text: "Purple", correct: false },
        { Text: "Black", correct: false }
      ]
    },
    {
      question: "This is Question 3",
      answers: [
        { Text: "text for question", correct: false },
        { Text: "text for question", correct: false },
        { Text: "text for question", correct: true },
        { Text: "text for question", correct: false }
      ]
    },
    {
      question: "This is Question 4",
      answers: [
        { Text: "text for question", correct: false },
        { Text: "text for question", correct: false },
        { Text: "text for question", correct: false },
        { Text: "text for question", correct: true }
      ]
    }
  ];
  
  var startButton = document.getElementById('btn');
  var questionElement = document.getElementById('question');
  var answerButtonsContainer = document.getElementById('answer-buttons');
  var currentQuestionIndex = 0;
  var timerInterval;
  
  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      var currentQuestion = questions[currentQuestionIndex];
      questionElement.innerHTML = currentQuestion.question;
      questionElement.style.display = "block";
      answerButtonsContainer.style.display = "block";
      startButton.style.display = "none"; // Hide the start button
      Array.from(answerButtonsContainer.children).forEach((button, index) => {
        if (currentQuestion.answers[index]) {
          button.textContent = currentQuestion.answers[index].Text;
          button.disabled = false; // Re-enable the answer buttons
        }
      });
  
      // Hide the Next button
      var nextButton = document.getElementById('next-btn');
      nextButton.style.display = 'none';
    }
  }
  
  function handleAnswerButtonClick(index) {
    var currentQuestion = questions[currentQuestionIndex];
    var answerResponseElement = document.getElementById('answer-response');
    answerResponseElement.textContent = "none";
  
    if (currentQuestion.answers[index].correct) {
      answerResponseElement.textContent = 'Correct!';
      answerResponseElement.classList.add('correct');
      answerResponseElement.classList.remove('incorrect');
    } else {
      answerResponseElement.textContent = 'Incorrect!';
      answerResponseElement.classList.add('incorrect');
      answerResponseElement.classList.remove('correct');
      timeLeft -= 10;
    }
  
    // Show the Next button after answering
    var nextButton = document.getElementById('next-btn');
    nextButton.style.display = 'block';
  
    // Disable the answer buttons until the next question is displayed
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
  
    // Calculate the score based on the time left
    var score = timeLeft;
  
    // Display the score
    questionElement.textContent = "Quiz Over! Your Score: " + score;
    answerButtonsContainer.style.display = "none";
  
    // Prompt the user for their initials
    var initials = window.prompt("Enter your initials:");
  
    // Save the initials and score to local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    startButton.style.display = "block";
    startButton.textContent = "Play Again?";
    nextButton.style.display = "none";
  }
  
  function startQuiz() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    timeLeft = 60;
  
    // Reset the timer display
    document.getElementById('timer').textContent = timeLeft;
  
    // Reset the answer response element
    document.getElementById('answer-response').textContent = '';
  
    // Reset the question and answer buttons
    displayQuestion();
  
    // Hide the next button
    document.getElementById('next-btn').style.display = 'none';
  
    // Enable the answer buttons
    Array.from(answerButtonsContainer.children).forEach((button) => {
      button.disabled = false;
    });
  
    // Start the timer
    timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
  
      // Check if time is up
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
  
  // Add event listener to the Next button
  var nextButton = document.getElementById('next-btn');
  nextButton.addEventListener('click', displayNextQuestion);
  
  var highScoresButton = document.getElementById('high-scores-button');
  var highScoresList = document.getElementById('high-scores-list');
  
  highScoresButton.addEventListener('click', function() {
    // Retrieve high scores from local storage
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    // Clear the high scores list
    highScoresList.innerHTML = '';
  
    // Display each high score in the list
    highScores.forEach(function(score) {
      var listItem = document.createElement('li');
      listItem.textContent = score.initials + ': ' + score.score;
      highScoresList.appendChild(listItem);
    });
  });
  var clearButton = document.getElementById('clear-button');
  
  clearButton.addEventListener('click', function() {
    // Remove high scores from local storage
    localStorage.removeItem('highScores');
  
    // Clear the high scores list in the DOM
    highScoresList.innerHTML = '';
  });