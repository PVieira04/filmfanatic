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
 * This function displays the question and four options for the user 
 * to choose.
 * When the user clicks on an option, the code checks whether the 
 * answer is correct or not.
 * Feedback will be given following the user's selection and a 
 * "Next Question" button will be displayed.
 * This function takes in no properties and does not return anything. 
 * It is a state the page stays in until the user interacts with it.
 */
const displayQuestion = async () => {
    console.log(`The previous state will be loaded: ${localStorage.stateLoaded}`)
    if (localStorage.stateLoaded === 'false') {
        // tell localStorage the user has started the quiz.
        localStorage.startedQuiz = 'true';
        // call generateQuestion and save the returned object to a variable.
        const questionObject = await generateQuestion();
        // extract the question which will be displayed into a variable.
        console.log(`question text: ${questionText}`);
        questionText = questionObject.question;
        console.log(`question text: ${questionText}`);
        // extract the index of the correct film - save to a variable.
        correctFilmIndex = questionObject.correctFilmIndex;
        // extract the answerType property into a variable
        optionType = questionObject.answerType
        // call generateOptions and save to options variable - this is an array containing four elements.
        options = await generateOptions(correctFilmIndex, questionObject.answerType);
        // save values to localStorage
        localStorage.correctFilmIndex = correctFilmIndex;
        localStorage.savedQuestionNumber = currentQuestion;
        localStorage.savedQuestion = questionText;
        localStorage.savedOptions = options;
        localStorage.answerType = questionObject.answerType;
    }
    // display the question number on the page.
    divHead.textContent = `Question ${currentQuestion}`;
    // display the question on the screen.
    divText.textContent = questionText;
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
                    const correctFilm = await fetchFilmObject(correctFilmIndex).then(object => {
                        return object
                    });
                    // check if the text inside the element which was clicked is the same as the correct answer.
                    if (this.textContent == correctFilm[`${optionType}`]) {
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
                        // set local storage to save feedback message.
                        localStorage.feedbackMessage = `Sorry! That is incorrect. The correct answer is ${correctFilm[`${optionType}`]}.`;
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
 * The purpose of this function is to fetch data from an API endpoint and return the
 * film object using correctFilmIndex.
 * @param {number} correctFilmIndex Index of correct film.
 * @returns object of one film's data.
 */
const fetchFilmObject = async correctFilmIndex => {
    try {
        const response = await fetch('https://pvieira04.github.io/minifilmdatabase/film.json');
        const data = await response.json();
        return data[correctFilmIndex];
    }
    catch(err) {
        console.log(err);
        const response = await fetch('./films.json');
        const data = await response.json();
        return data[correctFilmIndex];
    }
}



const generateQuestion2 = async () => {
    // create the questionObject and asign to await fetchFilmArray().then(array => {do some stuff here})
    const questionObject = await fetchFilmsArray().then(array => {
        // first select a random index. This may be a separate function (generate random question number). This "i" is also know as the "correctFilmIndex".
        const i = generateRandomQuestionNumber2(array);
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
        const objectToReturn = questionTypeArray[questionTypeIndex];
        // before returning the object, we need to add the options as well as the correct option.
        objectToReturn.options = generateOptions2(i, objectToReturn.answerType);
        // return the object
        return objectToReturn
    })
    return questionObject;
}

const generateRandomQuestionNumber2 = array => {
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
            return i;
        }
    }
}

const generateOptions2 = (i, answerType) => {
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
 * This function's primary role is to generate the question which will be displayed on the screen.
 * This function takes no parameters and returns an object with three properties.
 * The first one is "question" which contains the actual question to be displayed on the screen.
 * The second is "answerType". This is needed to pass into another function later on to display answer options.
 * The last is "correctFilmIndex". This is the index of the film which was chosen to be the subject of the question.
 * "correctFilmIndex" is needed for answer checking later on.
 * @returns {Object}    This is an object with three properties
 */
const generateQuestion = async () => {
    // call generateRandomQuestionNumber and save it to "i". It is the index used for the current question.
    const i = await generateRandomQuestionNumber();
    // use this integer to select a question type - save to a variable;
    const questionObject = await fetchFilmObject(i).then(film => {
        // push the film's [id] property to the global variable questionsAsked.
        questionsAsked.push(film.id);
        localStorage.filmsAlreadyUsed = questionsAsked;
        // this is the array containing all the question objects - this can be added to.
        const questionTypeArray = [
            {
                question : `"${film.title}", starring ${film.mainActor} as ${film.mainChar}, was released in which year?`,
                answerType : 'year'
            },
            {
                question : `What is the name of the actor who plays ${film.mainChar} in "${film.title}", released in ${film.year}?`,
                answerType : 'mainActor'
            },
            {
                question : `Who does ${film.mainActor} play in ${film.year}'s "${film.title}"?`,
                answerType : 'mainChar'
            },
            {
                question : `Who directed "${film.title}", released in ${film.year}?`,
                answerType : 'director'
            }
        ]
        // generate a random integer between 0 and the length of the array(not inclusive);
        const questionTypeIndex = Math.floor(Math.random() * questionTypeArray.length);
        return questionTypeArray[questionTypeIndex];
    });
    // add a property to the questionObject containing the index of the film which is used as the subject of the question.
    questionObject.correctFilmIndex = i;
    // return the questionObject.
    return questionObject;
}

/**
 * This function produces a random number which will be used 
 * to select a film to be the subject of a question.
 * It also checks whether that film has been selected before
 * and keeps generating new film indicies until it selects a 
 * film which has not been selected before.
 * The function takes in no parameters and returns an integer.
 */
const generateRandomQuestionNumber = async () => {
    const index = await fetchFilmsArray().then(array => {
        console.log(array);
        console.log(array.length);
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
                return i;
            }
        }
    });
    return index
}

/**
 * This function generates the text for the four options the user will be presented with.
 * @param {number} correctFilmIndex Integer which corresponds to the index of correct film.
 * @param {string} answerType Corresponds to the property key that this function wants to use to generate options.
 * @returns an array of four elements which will be the four options displayed to the user.
 */
const generateOptions = async (correctFilmIndex, answerType) => {
    // declare empty array - used to push options into.
    const options = await fetchFilmsArray().then(array => {
        let answerOptions = [];
        // generate a random position for the correct answer
        const correctPosition = Math.floor(Math.random() * 4);
        // begin loop. If loop position is equal to position for correct answer, push correct answer
        let loopPosition = 0;
        while (answerOptions.length < 4) {
            if (loopPosition === correctPosition) {
                answerOptions.push(array[correctFilmIndex][`${answerType}`]);
                loopPosition++;
                continue
            }
            // if loop position is not euqual to correct answer position, find a random answer that exists inside the films object
            else {
                const randomFilmIndex = Math.floor(Math.random() * array.length);
                // if it's equal to the correct answer, throw it away
                if (array[randomFilmIndex][`${answerType}`] === array[correctFilmIndex][`${answerType}`]) continue
                // if it already exists in the array, throw it away
                if (answerOptions.includes(array[randomFilmIndex][`${answerType}`])) continue
                // otherwise add the answer
                answerOptions.push(array[randomFilmIndex][`${answerType}`]);
                loopPosition++;
                continue
            }
        }
        return answerOptions
    });
    
    return options;
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
        displayQuestion();
    })
}

const nextText = questionNumber => {
    if (questionNumber < 5) return "Next Question"
    else return "Show Results"
}

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
            // increment the current question by one.
            currentQuestion++;
            displayQuestion();
        }
        // If so, display results.
        else displayResults();
    })
}

/**
 * Thinking about a local storage function...
 * I could use the storage function to load the last question the user was on
 * as well as save the user's score from the previous session.
 * For example... If the user got question 1 and 2 correct but messed up
 * on question 3 and closed the tab...
 * I want the local storage function to kick in as soon as they reopen the window.
 * The first thing that JS does on reloading is to check whether someone is in the
 * middle of a game - boolean.
 * The local storage can be called everytime a question is asked... perhaps
 * with the properties currentQuestion, currentOptions, correctFilmIndex.
 * Once a user answers a question, another property called answered can be
 * written as true and if the user got the question correct, correctAnswers
 * can be incremented. The object could possibly look like this:
 * localStorage = {
 *      startedQuiz : true,
 *      filmsAlreadyUsed : 2,3,5
 *      correctlyAnswered : 2,
 *      savedQuestionNumber : 3,
 *      savedQuestion : '"Titanic", starring Leonardo DiCaprio as Jack Dawson, was release in which year?',
 *      savedOptions : [1998, 1977, 2021, 1997],
 *      correctFilmIndex : 4,
 *      answerType : 'year'
 *      answered : true,
 *      selectedOptionIndex : 1,
 *      highlight : '#E17575'
 *      feedbackMessage : 'Sorry! That is incorrect. The correct answer is 1997.'
 * }
 */


//I need a function here which resets the localstorage object. TODO
const loadStateFromLocalStorage = () => {
    next.innerHTML = '';
    console.log('we have detected the quiz has begun');
    console.log('initialising variables');
    correct = localStorage.correctlyAnswered ? Number(localStorage.correctlyAnswered) : 0;
    questionsAsked = localStorage.filmsAlreadyUsed.split(',').map(num => Number(num));
    console.log(`You have been asked qeustions: ${questionsAsked}`);
    currentQuestion = localStorage.savedQuestionNumber;
    questionText = localStorage.savedQuestion;
    options = localStorage.savedOptions.split(',');
    console.log(`These are the saved options: ${options}`);
    optionType = localStorage.answerType;
    correctFilmIndex = localStorage.correctFilmIndex;
    localStorage.stateLoaded = 'true';
    displayQuestion();
}

/**
 * Once the DOM content has loaded, I want to apply an event listener
 * to the button which, when clicked, displays question 1.
 */
document.addEventListener('DOMContentLoaded', async () => {
    next.innerHTML += "<button>Start Game</button>";
    if (localStorage.startedQuiz == 'true') next.innerHTML += "<button>Load Game</button>";
    let playbuttons = document.getElementsByTagName('button');
    for (let button of playbuttons) {
        button.addEventListener('click', () => {
            if (button.textContent === 'Start Game') {
                localStorage.clear();
                localStorage.stateLoaded = 'false';
                next.innerHTML = '';
                displayQuestion();
            }
            else loadStateFromLocalStorage();
        })
    }
    console.log(localStorage)
})