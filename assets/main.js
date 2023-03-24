const divHead = document.getElementById('div-head');
const divText = document.getElementById('div-text');
const answerContainer = document.getElementById('answer-container');
const feedback = document.getElementById('feedback');
let questionsAsked = [];
let currentQuestion = 0;
let correct = 0;

// This is the films array. Each element is an object containing film information.
const films = [
    {
        id : 1,
        title : 'Reservoir Dogs',
        year : 1992,
        mainChar : 'Mr. White',
        mainActor : 'Hervery Keitel',
        director : 'Quentin Tarantino'
    },
    {
        id : 2,
        title : 'No Time to Die',
        year : 2021,
        mainChar : 'James Bond',
        mainActor : 'Daniel Craig',
        director : 'Cary Joji Fukunaga'
    },
    {
        id : 3,
        title : 'A New Hope',
        year : 1977,
        mainChar : 'Luke Skywalker',
        mainActor : 'Mark Hamill',
        director : 'George Lucas'
    },
    {
        id : 4,
        title : 'Doctor Dolittle',
        year : 1998,
        mainChar : 'Dr, John Dolittle',
        mainActor : 'Eddie Murphy',
        director : 'Betty Thomas'
    },
    {
        id : 5,
        title : 'Titanic',
        year : 1997,
        mainChar : 'Jack Dawson',
        mainActor : 'Leonardo DiCaprio',
        director : 'James Cameron'
    }
]

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
    // increment the current question by one.
    currentQuestion++;
    // display the question number on the page.
    divHead.textContent = `Question ${currentQuestion}`;
    // call generateQuestion and save the returned object to a variable.
    let questionObject = generateQuestion();
    // for better readability, extract the question which will be displayed into a variable.
    let questionText = questionObject.question;
    // display the question on the screen.
    divText.textContent = questionText;
    // for better readability, extract the index of the correct film - save ot a variable.
    correctFilmIndex = questionObject.correctFilmIndex;
    console.log(`This should be an integer: ${correctFilmIndex}`)
    // call generateOptions and save to options variable - this is an array containing four elements.
    let options = generateOptions(correctFilmIndex, questionObject.answerType);
    console.log(options);
    // create four buttons which each contain one element from the options array.
    for (let i = 0; i < 4; i++) {
        answerContainer.innerHTML += `<button class='option'>${options[i]}</button>`
    }
    // declare variable which determines whether user has answered question or not.
    let answered = false;
    // save the four buttons in a variable as an array.
    let buttons = document.getElementsByClassName('option');
    // cycle through the array and add event listeners.
    for (let button of buttons) {
        button.addEventListener('click', function () {
            // if user has answered question already, don't do anything when user clicks again.
            if (answered === true) {
                return
            }
            else {
                console.log(correctFilmIndex);
                let correctFilm = films[correctFilmIndex];
                // check if the text inside the element which was clicked is the same as the correct answer.
                if (this.textContent == correctFilm[`${questionObject.answerType}`]) {
                    // turn background of button green.
                    this.style.backgroundColor = '#50A93C';
                    // tell the user they got the answer correct.
                    feedback.textContent = 'Correct!';
                    // increment the correct variable by one.
                    correct++;
                }
                else {
                    // turn background of button red.
                    this.style.backgroundColor = '#E17575';
                    // tell the user they did not get the answer correct - also tell user correct answer.
                    feedback.textContent = `Sorry! That is incorrect. The correct answer is ${films[correctFilmIndex][`${questionObject.answerType}`]}.`;
                }
            }
            // once feedback is given, change answered to "true".
            answered = true;
            // display button to naviagte to next qeustion.
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            // add event listener to new button.
            document.getElementById('next-button').addEventListener('click', function() {
                // empty elements ready for next question or results page.
                answerContainer.innerHTML = ``;
                feedback.textContent = '';
                next.innerHTML = '';
                // check if fifth question has been reached. If not, call the displayQuestion function again.
                if (currentQuestion < 5) displayQuestion();
                // If so, display results.
                else displayResults();
            })
        })
    }
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
const generateQuestion = () => {
    // call generateRandomQuestionNumber and save it to "i". It is the index used for the current question.
    let i = generateRandomQuestionNumber();
    // push the film's [id] property to the global variable questionsAsked.
    questionsAsked.push(films[i].id);
    console.log(`id of questions already asked: [${questionsAsked}]`);
    // this is the array containing all the question objects - this can be added to.
    const questionTypeArray = [
        {
            question : `"${films[i].title}", starring ${films[i].mainActor} as ${films[i].mainChar}, was released in which year?`,
            answerType : 'year'
        },
        {
            question : `What is the name of the actor who plays ${films[i].mainChar} in "${films[i].title}", released in ${films[i].year}?`,
            answerType : 'mainActor'
        },
        {
            question : `Who does ${films[i].mainActor} play in ${films[i].year}'s "${films[i].title}"?`,
            answerType : 'mainChar'
        },
        {
            question : `Who directed "${films[i].title}", released in ${films[i].year}?`,
            answerType : 'director'
        }
    ]
    // generate a random integer between 0 and the length of the array(not inclusive);
    let questionTypeIndex = Math.floor(Math.random() * questionTypeArray.length);
    // use this integer to select a question type - save to a variable;
    let questionObject = questionTypeArray[questionTypeIndex];
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
const generateRandomQuestionNumber = () => {
    // begin while loop
    while (true) {
        // generate integer between 1 and the length of the films array - this allows for upscaling of the films object.
        let idNumber = Math.floor(Math.random() * films.length) + 1;
        // search for the film which has the same [id] property as the generated integer - save its index in the array.
        let correctFilmIndex = films.findIndex(((film) => film.id === idNumber));
        // since "correctFilmIndex" will be used many times in the upcoming code, save as shorter variable.
        let i = correctFilmIndex;
        console.log(`random number generated: ${i}`);
        // check if film has been used as the subject of a question before.
        if (questionsAsked.includes(films[i].id)) {
            console.log(`The 'questionsAsked' array already has the id '${films[i].id}': ${questionsAsked.includes(films[i].id)}`)
            // if the film has been used before, start the while loop again and find another value.
            continue
        }
        // if the film has not been used before, return that film's index in the "films" array.
        else return i
    }
}

/**
 * This function generates the text for the four options the user will be presented with.
 * @param {number} correctFilmIndex Integer which corresponds to the index of correct film.
 * @param {string} answerType Corresponds to the property key that this function wants to use to generate options.
 * @returns an array of four elements which will be the four options displayed to the user.
 */
const generateOptions = (correctFilmIndex, answerType) => {
    // declare empty array - used to push options into.
    let options = [];
    // generate a random position for the correct answer
    let correctPosition = Math.floor(Math.random() * 4);
    // begin loop. If loop position is equal to position for correct answer, push correct answer
    let loopPosition = 0;
    while (options.length < 4) {
        if (loopPosition === correctPosition) {
            options.push(films[correctFilmIndex][`${answerType}`]);
            loopPosition++;
            continue
        }
        // if loop position is not euqual to correct answer position, find a random answer that exists inside the films object
        else {
            let randomFilmIndex = Math.floor(Math.random() * films.length);
            // if it's equal to the correct answer, throw it away
            if (films[randomFilmIndex][`${answerType}`] === films[correctFilmIndex][`${answerType}`]) continue
            // if it already exists in the array, throw it away
            if (options.includes(films[randomFilmIndex][`${answerType}`])) continue
            // otherwise add the answer
            options.push(films[randomFilmIndex][`${answerType}`]);
            loopPosition++;
            continue
        }
    }
    return options;
}

/**
 * This function displays the results to the user and asks if the user wants to play the game again.
 * displayResults takes in no parameters and does not return anything. It is a state that the page
 * stays in until the user clicks on the "Play Again" button or refreshes the page.
 */
const displayResults = () => {
    // display results
    divHead.textContent = 'Results';
    divText.textContent = `You scored ${correct} out of 5!`;
    // create button that allows the user to play again.
    next.innerHTML = `<button>Play Again</button>`;
    // add event listener to button.
    next.children[0].addEventListener('click', function() {
        // initialise required variables.
        correct = 0;
        currentQuestion = 0;
        questionsAsked = [];
        // call question one.
        displayQuestion();
    })
}

/**
 * Once the DOM content has loaded, I want to apply an event listener
 * to the button which, when clicked, displays question 1.
 */
document.addEventListener('DOMContentLoaded', () => {
    let start = document.getElementById('start-game');
    console.log(films);
    // add event listener to start button.
    start.addEventListener('click', () => {
        next.innerHTML = '';
        // when clicked, go to question one.
        displayQuestion();
    })
})