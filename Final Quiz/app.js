const firebaseConfig = {
  apiKey: "AIzaSyCHD65l6gcs1jY37aEL1QGKXdERoafvCBs",
  authDomain: "quiz-app-df399.firebaseapp.com",
  databaseURL: "https://quiz-app-df399-default-rtdb.firebaseio.com",
  projectId: "quiz-app-df399",
  storageBucket: "quiz-app-df399.firebasestorage.app",
  messagingSenderId: "111660359669",
  appId: "1:111660359669:web:8958aa72de451418a2cabc"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var currentQuestionIndex = 0;
var score = 0;
var questions = [];

function initializeQuiz() {
  console.log("Initializing quiz...");

  firebase.database().ref('quiz-questions').once('value', function(snapshot) {
    if (!snapshot.exists()) {
      console.log("No questions found, adding sample questions...");
      addSampleQuestions(); 
    } else {
      console.log("Questions found in Firebase, loading...");
      loadQuestions(); 
    }
  });
}


function addSampleQuestions() {
  questions = [
    {
      question: 'Q1: Pakistan ka qaumi phool konsa hai?',
      options: ['Rose', 'Jasmine', 'Lotus', 'Sunflower'],
      answer: 1 
    },
    {
      question: 'Q2: Pakistan ka qaumi phironsa konsa hai?',
      options: ['Markhor', 'Lion', 'Tiger', 'Eagle'],
      answer: 0 
    },
    {
      question: 'Q3: Pakistan ki qaumi zaban kya hai?',
      options: ['Urdu', 'Pashto', 'Punjabi', 'Sindhi'],
      answer: 0 
    },
    {
      question: 'Q4: Pakistan ki azadi kis din hui thi?',
      options: ['14 August 1947', '15 August 1947', '23 March 1940', '25 December 1947'],
      answer: 0 
    },
    {
      question: 'Q5: Pakistan ka pehla president kaun the?',
      options: ['Liaquat Ali Khan', 'Iskander Mirza', 'Zulfiqar Ali Bhutto', 'Ayub Khan'],
      answer: 1 
    },
    {
      question: 'Q6: Pakistan ka qoumi chihra (flag) kis rang ka hai?',
      options: ['Red and Green', 'Green and White', 'Blue and White', 'Yellow and Green'],
      answer: 1 
    },
    {
      question: 'Q7: Pakistan ki pehli jang kis ke saath thi?',
      options: ['India', 'Afghanistan', 'China', 'Bangladesh'],
      answer: 0 
    },
    {
      question: 'Q8: Pakistan ka qaumi mausam kaunsa hai?',
      options: ['Winter', 'Summer', 'Spring', 'Monsoon'],
      answer: 1 
    },
    {
      question: 'Q9: Pakistan ka pehla Prime Minister kaun the?',
      options: ['Zulfiqar Ali Bhutto', 'Liaquat Ali Khan', 'Nawaz Sharif', 'Benazir Bhutto'],
      answer: 1 
    },
    {
      question: 'Q10: Pakistan ka qaumi rang konsa hai?',
      options: ['Green', 'Red', 'Blue', 'Yellow'],
      answer: 0 
    }
  ];


  
  console.log("Adding new questions to Firebase...");
  firebase.database().ref('quiz-questions').set({}); 
  questions.forEach(function(q, index) {
    firebase.database().ref('quiz-questions/question' + (index + 1)).set(q);  
  });

  loadQuestions(); 
}


function loadQuestions() {
  questions = [];
  
  console.log("Loading questions from Firebase...");
  
  firebase.database().ref('quiz-questions').once('value', function(snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot) {
        questions.push(childSnapshot.val()); 
      });
      console.log('Loaded questions:', questions);  
      displayQuestion();  
    } else {
      console.log("No data available");
    }
  });
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    var questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    var optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    questionData.options.forEach(function(option, index) {
      var optionElement = document.createElement('label');
      optionElement.className = 'option';

      var inputElement = document.createElement('input');
      inputElement.type = 'radio';
      inputElement.name = 'answer';
      inputElement.value = index;
      inputElement.id = 'option' + index;

      var optionText = document.createElement('span');
      optionText.innerText = option;

      optionElement.appendChild(inputElement);
      optionElement.appendChild(optionText);

      optionsDiv.appendChild(optionElement);
    });
  } else {
    alert('Quiz Finished! Your score is ' + score + '/' + questions.length);
    saveUserScore(); 
    resetQuiz(); 
  }
}


function submitAnswer() {
  var selectedRadio = document.querySelector('input[name="answer"]:checked');
  if (!selectedRadio) {
    alert('Please select an answer!');
    return;
  }

  var selectedOptionIndex = parseInt(selectedRadio.value);
  var questionData = questions[currentQuestionIndex];
  if (questionData.answer === selectedOptionIndex) {
    score++; 
  }

  currentQuestionIndex++;
  displayQuestion(); 
}


function saveUserScore() {
  const userId = 'user_' + Math.floor(Math.random() * 1000000); 

  
  firebase.database().ref('scores/' + userId).set({
    score: score
  }).then(function() {
    console.log("Score saved successfully!");
  }).catch(function(error) {
    console.error("Error saving score: ", error);
  });
}


function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  initializeQuiz();  
}


window.onload = initializeQuiz;
