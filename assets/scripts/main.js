const divHead = document.getElementById('div-head');
const divText = document.getElementById('div-text');
const answerContainer = document.getElementById('answer-container');
const feedback = document.getElementById('feedback');
const next = document.getElementById('next');
const buttons = document.getElementsByClassName('option');
let questionsAsked = [];
let currentQuestion = 1;
let correct = 0;
let questionText = '';
let options = [];
let optionType = '';
let correctFilmIndex = null;

/**
 * This function generates all questions at the beginning of the code
 * and is run only when the user click on the "Start Game" button.
 */
const generateQuestions = async () => {
    localStorage.startedQuiz = 'true';
    localStorage.correctlyAnswered = 0;
    await fetchFilmsArray().then(array => {
        //First generate question, save data as q1.questiontext
        for (let qNum = 1; qNum <= 5; qNum++) {
            //select random index
            const i = generateRandomQuestionNumber(array);
            correctFilmIndex = i;
            const questionTypeArray = [
                {
                    question : `"${array[i].title}", starring ${array[i].mainActor} as ${array[i].mainChar}, was released in which year?`,
                    answerType : 'year'
                },
                {
                    question : `What is the name of the actor who plays ${array[i].mainChar} in "${array[i].title}", released in ${array[i].year}?`,
                    answerType : 'mainActor'
                },
                {
                    question : `Who does ${array[i].mainActor} play in ${array[i].year}'s "${array[i].title}"?`,
                    answerType : 'mainChar'
                },
                {
                    question : `Who directed "${array[i].title}", released in ${array[i].year}?`,
                    answerType : 'director'
                }
            ]
            // generate a random integer between 0 and the length of the array(not inclusive);
            const questionTypeIndex = Math.floor(Math.random() * questionTypeArray.length);
            //assign data to local storage
            localStorage[`q${qNum}Text`] = questionTypeArray[questionTypeIndex].question;
            localStorage[`q${qNum}Answer`] = array[i][`${questionTypeArray[questionTypeIndex].answerType}`];
            // generate options and assign to localStorage
            localStorage[`q${qNum}Options`] = generateOptions(array, i, questionTypeArray[questionTypeIndex].answerType);
        }
    })
    localStorage.currentQuestion = 1;
    displayQuestion();
}

/**
 * The purpose of this function is to fetch data from an API endpoint and return the
 * whole films array.
 * @returns array of film data.
 */
const fetchFilmsArray = async () => {
    try {
        const response = await fetch('https://pvieira04.github.io/minifilmdatabase/film.json');
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
        const response = await fetch('./films.json');
        const data = await response.json();
        return data;
    }
}

/**
 * This generates a random question between 1 and the length of the films array.
 * @param {Array} array This is the whole films array taken from JSON.
 * @returns an integer which is the same as the ID for the selected film.
 */
const generateRandomQuestionNumber = array => {
    while (true) {
        const idNumber = Math.floor(Math.random() * array.length) + 1;
        console.log(idNumber);
        const correctFilmIndex = array.findIndex(((film) => film.id === idNumber));
        console.log(correctFilmIndex);
        const i = correctFilmIndex;
        console.log(i);
        if (questionsAsked.includes(array[i].id)) {
            console.log(`The 'questionsAsked' array already has the id '${array[i].id}': ${questionsAsked.includes(array[i].id)}`)
        }
        else {
            questionsAsked.push(array[i].id)
            return i;
        }
    }
}

/**
 * Generates four options which the user can shoose from. Returned as an array.
 * @param {Array} array Films aray taken directly from JSON
 * @param {Integer} i ID attribute of the selected film.
 * @param {String} answerType Allows the code to extract the correct information from the films array.
 * @returns an array containing four options which will be later pushed to the container in HTML.
 */
const generateOptions = (array, i, answerType) => {
    let answerOptions = [];
        // generate a random position for the correct answer
        const correctPosition = Math.floor(Math.random() * 4);
        // begin loop. If loop position is equal to position for correct answer, push correct answer
        let loopPosition = 0;
        while (answerOptions.length < 4) {
            if (loopPosition === correctPosition) {
                answerOptions.push(array[i][`${answerType}`]);
                localStorage.answer = array[i][`${answerType}`];
                loopPosition++;
                continue
            }
            // if loop position is not euqual to correct answer position, find a random answer that exists inside the films object
            else {
                const randomFilmIndex = Math.floor(Math.random() * array.length);
                // if it's equal to the correct answer, throw it away
                if (array[randomFilmIndex][`${answerType}`] === array[i][`${answerType}`]) continue
                // if it already exists in the array, throw it away
                if (answerOptions.includes(array[randomFilmIndex][`${answerType}`])) continue
                // otherwise add the answer
                answerOptions.push(array[randomFilmIndex][`${answerType}`]);
                loopPosition++;
                continue
            }
        }
        return answerOptions
}

/**
 * This function displays the question and four options for the user 
 * to choose.
 * When the user clicks on an option, the code checks whether the 
 * answer is correct or not.
 * Feedback will be given following the user's selection and a 
 * "Next Question" button will be displayed.
 * This function takes in no properties and does not return anything. 
 * It is a state the page stays in until the user interacts with it.
 */
const displayQuestion = () => {
    console.log(`Correct Answers Given: ${correct}`)
    console.log(`Correct Answers Given: ${localStorage.correctlyAnswered}`)
    // display the question number on the page.
    divHead.textContent = `Question ${localStorage.currentQuestion}`;
    // display the question on the screen.
    divText.textContent = localStorage[`q${currentQuestion}Text`];
    options = localStorage[`q${currentQuestion}Options`].split(',');
    // create four buttons which each contain one element from the options array.
    for (let i = 0; i < 4; i++) {
        answerContainer.innerHTML += `<button class='option hover'>${options[i]}</button>`
    }
    // declare variable which determines whether user has answered question or not.
    let answered = false;
    // save the four buttons in a variable as an array.
    const buttons = document.getElementsByClassName('option');
    // if user is loading a saved question they have already answered, add highlight and feedback message.
    if (localStorage.answered === 'true') {
        console.log(Number(localStorage.selectedOptionIndex));
        buttons[Number(localStorage.selectedOptionIndex)].style.backgroundColor = localStorage.highlight;
        feedback.textContent = localStorage.feedbackMessage;
        answered = true;
        nextButton();
    }
    else {
        // cycle through the array and add event listeners.
        for (let button of buttons) {
            button.addEventListener('click', async function () {
                // if user has answered question already, don't do anything when user clicks again.
                if (answered === true) {
                    return
                }
                else {
                    // change answered to "true".
                    answered = true;
                    // tell local storage question has been answered.
                    localStorage.answered = true;
                    // assign selected option index to local storage
                    localStorage.selectedOption = this.textContent;
                    localStorage.selectedOptionIndex = options.findIndex((option) => {
                        if (localStorage.selectedOption === option) return option
                    });
                    // check if the text inside the element which was clicked is the same as the correct answer.
                    if (this.textContent == localStorage[`q${currentQuestion}Answer`]) {
                        // set local storage to save green color.
                        localStorage.highlight = '#50A93C';
                        // set local storage to save feedback message.
                        localStorage.feedbackMessage = 'Correct!';
                        // increment the correct variable by one.
                        correct++;
                        // save it to local storage.
                        localStorage.correctlyAnswered = correct;
                    }
                    else {
                        // set local storage to save red color.
                        localStorage.highlight = '#E17575';
                        // set variable for correct answer text.
                        const correctAnswer = localStorage[`q${currentQuestion}Answer`]
                        // set local storage to save feedback message.
                        localStorage.feedbackMessage = `Sorry! That is incorrect. The correct answer is ${correctAnswer}.`;
                    }
                    // load highlight color from local storage.
                    this.style.backgroundColor = localStorage.highlight;
                    // give the user feedback on their answer.
                    feedback.textContent = localStorage.feedbackMessage;
                }
                nextButton();
            })
        }
    }
}

/**
 * This function triggers whenever a question is answered. Its purpose is to add the
 * content required and add event listeners to buttons.
 */
const nextButton = () => {
    console.log('this is the next button function');
    // delete hover class from buttons
    for (let button of buttons) {
        button.classList.remove('hover');
    }
    // display button to navigate to next qeustion.
    next.innerHTML = `<button id='next-button' class='hover'>${nextText(currentQuestion)}</button>`;
    // change focus to next question button.
    document.getElementById('next-button').focus();
    // add event listener to new button.
    document.getElementById('next-button').addEventListener('click', function() {
        // empty elements ready for next question or results page.
        answerContainer.innerHTML = ``;
        feedback.textContent = '';
        next.innerHTML = '';
        // tell local storage answer has not been answered yet.
        localStorage.answered = false;
        // check if fifth question has been reached. If not, call the displayQuestion function again.
        if (currentQuestion < 5) {
            // set load state to flase.
            localStorage.stateLoaded = 'false';
            // increment the current question by one and save to local Storage
            currentQuestion++;
            localStorage.currentQuestion = currentQuestion;
            displayQuestion();
        }
        // If so, display results.
        else displayResults();
    })
}

/**
 * This function descides what text is written on the button after answering a question.
 * @param {Integer} questionNumber The current question number
 * @returns text to be displayed in the button after answering a question
 */
const nextText = questionNumber => {
    if (questionNumber < 5) return "Next Question"
    else return "Show Results"
}

/**
 * This function displays the results to the user and asks if the user wants to play the game again.
 * displayResults takes in no parameters and does not return anything. It is a state that the page
 * stays in until the user clicks on the "Play Again" button or refreshes the page.
 */
const displayResults = () => {
    // clear local sotrage.
    localStorage.clear();
    // display results
    divHead.textContent = 'Results';
    divText.textContent = `You scored ${correct} out of 5!`;
    // create button that allows the user to play again.
    next.innerHTML = `<button id='play-again' class='hover'>Play Again</button>`;
    // change focus to Play Again button.
    document.getElementById('play-again').focus();
    // add event listener to button.
    next.children[0].addEventListener('click', function() {
        // initialise required variables.
        correct = 0;
        currentQuestion = 1;
        questionsAsked = [];
        next.innerHTML = '';
        // load state should be false;
        localStorage.stateLoaded = 'false';
        // call question one.
        generateQuestions();
    })
}

/**
 * Once the DOM content has loaded, I want to apply an event listener
 * to the button which, when clicked, displays question 1.
 */
document.addEventListener('DOMContentLoaded', async () => {
    next.innerHTML += "<button class='hover'>Start Game</button>";
    if (localStorage.startedQuiz == 'true') next.innerHTML += "<button class='hover'>Load Game</button>";
    let playbuttons = document.getElementsByTagName('button');
    for (let button of playbuttons) {
        button.addEventListener('click', () => {
            next.innerHTML = '';
            if (button.textContent === 'Start Game') {
                localStorage.clear();
                localStorage.stateLoaded = 'false';
                generateQuestions();
            }
            else {
                correct = Number(localStorage.correctlyAnswered);
                currentQuestion = Number(localStorage.currentQuestion);
                displayQuestion();
            }
        })
    }
    console.log(localStorage)
})