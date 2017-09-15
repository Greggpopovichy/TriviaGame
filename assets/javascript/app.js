//when the window loads, run program

window.onload=function() {
    var myQuestions = [
        {
            question: "Which band played the largest concert in human history?",
            answers: {
                a: "Radiohead",
                b: "The Rolling Stones",
                c: "Metallica",
                d: "Led Zeppelin"
            },
            correctAnswer: "c"
        },
        {
            question: "Who directed the original Bladerunner movie?",
            answers: {
                a: "James Cameron",
                b: "Ridley Scott",
                c: "David Lynch",
                d: "Stephen Spielberg"
            },
            correctAnswer: "b"
        },
        {
            question: "What final form does Pennywise take in the climax of 'IT'?",
            answers: {
                a: "Ghost",
                b: "Human",
                c: "Clown",
                d: "Spider"
            },
            correctAnswer: "d"
        },
        {
            question: "Which artist did Virgin Records give an $80 million advance to?",
            answers: {
                a: "Kanye West",
                b: "Mariah Carey",
                c: "Whitney Houston",
                d: "Madonna"
            },
            correctAnswer: "b"
        },
        {
            question: "What movie had the largest production budget of all time?",
            answers: {
                a: "Avatar",
                b: "Star Wars: The Force Awakens",
                c: "Pirates of the Caribbean: On Stranger Tides",
                d: "Batman v Superman: Dawn of Justice"
            },
            correctAnswer: "c"
        },
        {
            question: "Of the options below, who is not a member of The Wu Tang Clan?",
            answers: {
                a: "Method Man",
                b: "U-God",
                c: "AZ",
                d: "GZA"
            },
            correctAnswer: "c"
        },
        {
            question: "What album is the song 'Memory Lane(Sittin' In Da Park)' on?",
            answers: {
                a: "Illmatic",
                b: "Reasonable Doubt",
                c: "Tical",
                d: "Illadelph Halflife"
            },
            correctAnswer: "a"
        },
        {
            question: "Who played 'Cheese' in 'The Wire'?",
            answers: {
                a: "RZA",
                b: "GZA",
                c: "Redman",
                d: "Method Man"
            },
            correctAnswer: "d"
        },
        {
            question: "What movie was Dustin Hoffman's first starring role in?",
            answers: {
                a: "Pretty Woman",
                b: "The Graduate",
                c: "Fast Times at Ridgemont High",
                d: "All the President's Men"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the most played Kendrick Lamar song on Spotify?",
            answers: {
                a: "Money Trees",
                b: "DNA",
                c: "Swimming Pools(Drank)",
                d: "Humble"
            },
            correctAnswer: "d"
        }
    ];
//setting up variables to get DOM elements
    var questionContainer = document.getElementById("triviaGame");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");

//timer variables
    var number = 60;
    var intervalId;

//grabbing start button and initiating onClick function
    $("#startButton").on("click", run);

//defining run function
    function run(){
        intervalId = setInterval(decrement, 1000);
    }
//defining stopCountdown function
    function stopCountdown(){
        if(submitButton){
            clearInterval(intervalId);
        }
    }

//defining function to decrement number
    function decrement(){
        number--;
        $("#remainingTime").html("Time Remaining: " + number);
        if(number === 0){
            clearInterval(intervalId);
            alert("Out of time!");
        }
    }
    //calling run and stopCountdown functions
    run();
    stopCountdown();


//calling generateQuestions function
    generateQuestions(myQuestions, questionContainer, resultsContainer, submitButton);


//function to generate questions from myQuestions object

    function generateQuestions(questions, questionContainer, resultsContainer, submitButton) {

//function to show questions
        function showQuestions(questions, questionContainer) {

//storing output and answer choices
            var output = [];
            var answers;

//looping through questions and setting a variable to hold answers
            for (var i = 0; i < questions.length; i++) {
                answers = [];
                for (letter in questions[i].answers) {
                    answers.push('<label>' + '<input id="inputData" type="radio" name="question' + i + '" value="' + letter + '">'
                        + questions[i].answers[letter] + '</label>'
                    );
                }
//adding questions and answers to output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join() + '</div>'
                );
            }
//adding output list into string to display
            questionContainer.innerHTML = output.join('');
        }

//calling showQuestions function
        showQuestions(questions, questionContainer);

//defining showResults function
        function showResults(questions, questionContainer, resultsContainer) {
            var answerContainers = questionContainer.querySelectorAll('.answers');

//variable to keep track of users answers
            var userAnswer = '';
            var numCorrect = 0;

//for each question
            for (var i = 0; i < questions.length; i++) {

//find selected answer, save it to user answer var
                userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

//if the answer is correct
                if (userAnswer === questions[i].correctAnswer) {
                    numCorrect++;
                }
                else {
                    answerContainers[i].style.color = 'red';
                }
            }
//show number of correct answers out of total
            resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

        }

        showQuestions(questions, questionContainer);

//when the user selects submit, the results of their quiz will be displayed
        submitButton.onclick = function () {
            showResults(questions, questionContainer, resultsContainer);
            stopCountdown();
        }
    }
};
