const divHead = document.getElementById('div-head');
const divText = document.getElementById('div-text');
const answerContainer = document.getElementById('answer-container');
const feedback = document.getElementById('feedback');
let questionsAsked = [];
let currentQuestion = 0;
let correct = 0;

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
    // increment the current question by one.
    currentQuestion++;
    // display the question number on the page.
    divHead.textContent = `Question ${currentQuestion}`;
    // call generateQuestion and save the returned object to a variable.
    const questionObject = await generateQuestion();
    // for better readability, extract the question which will be displayed into a variable.
    const questionText = questionObject.question;
    // display the question on the screen.
    divText.textContent = questionText;
    // for better readability, extract the index of the correct film - save ot a variable.
    correctFilmIndex = questionObject.correctFilmIndex;
    console.log(`This should be an integer: ${correctFilmIndex}`)
    // call generateOptions and save to options variable - this is an array containing four elements.
    const options = await generateOptions(correctFilmIndex, questionObject.answerType);
    console.log(options);
    // create four buttons which each contain one element from the options array.
    for (let i = 0; i < 4; i++) {
        answerContainer.innerHTML += `<button class='option hover'>${options[i]}</button>`
    }
    // declare variable which determines whether user has answered question or not.
    let answered = false;
    // save the four buttons in a variable as an array.
    const buttons = document.getElementsByClassName('option');
    // cycle through the array and add event listeners.
    for (let button of buttons) {
        button.addEventListener('click', async function () {
            // if user has answered question already, don't do anything when user clicks again.
            if (answered === true) {
                return
            }
            else {
                console.log(correctFilmIndex);
                const correctFilm = await fetchFilmObject(correctFilmIndex).then(object => {
                    return object
                });
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
                    feedback.textContent = `Sorry! That is incorrect. The correct answer is ${correctFilm[`${questionObject.answerType}`]}.`;
                }
            }
            // once feedback is given, change answered to "true".
            answered = true;
            // delete hover class from buttons
            for (let button of buttons) {
                button.classList.remove('hover');
            }
            // display button to naviagte to next qeustion.
            next.innerHTML = `<button id='next-button' class='hover'>Next Question</button>`;
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
    // display results
    divHead.textContent = 'Results';
    divText.textContent = `You scored ${correct} out of 5!`;
    // create button that allows the user to play again.
    next.innerHTML = `<button class='hover'>Play Again</button>`;
    // add event listener to button.
    next.children[0].addEventListener('click', function() {
        // initialise required variables.
        correct = 0;
        currentQuestion = 0;
        questionsAsked = [];
        next.innerHTML = '';
        // call question one.
        displayQuestion();
    })
}

/**
 * Once the DOM content has loaded, I want to apply an event listener
 * to the button which, when clicked, displays question 1.
 */
document.addEventListener('DOMContentLoaded', async () => {
    let start = document.getElementById('start-game');
    // add event listener to start button.
    start.addEventListener('click', () => {
        next.innerHTML = '';
        // when clicked, go to question one.
        displayQuestion();
    })
})