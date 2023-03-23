const divHead = document.getElementById('div-head');
const divText = document.getElementById('div-text');
const topRow = document.getElementById('top-row');
const botRow = document.getElementById('bot-row');
const feedback = document.getElementById('feedback');
let currentQuestion = 0;
let correct = 0;

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

const displayQuestion = () => {
    currentQuestion++;
    divHead.textContent = `Question ${currentQuestion}`;
    let idNumber = Math.floor(Math.random() * films.length) + 1;
    let correctFilmIndex = films.findIndex(((film) => film.id === idNumber));
    let questionObject = generateQuestion(correctFilmIndex);
    let questionText = questionObject.question;
    divText.textContent = questionText;
    let options = generateOptions(correctFilmIndex, questionObject.answerType);
    console.log(options);
    topRow.innerHTML = `<button id='q1' class='option'>${options[0]}</button><button id='q2' class='option'>${options[1]}</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>${options[2]}</button><button id='q4' class='option'>${options[3]}</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else {
                if (this.textContent == films[correctFilmIndex][`${questionObject.answerType}`]) {
                    this.style.backgroundColor = 'green';
                    correct++;
                }
                else {
                    this.style.backgroundColor = 'red';
                }
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                if (currentQuestion < 5) displayQuestion();
                else displayResults();
            })
        })
    }
}

const generateQuestion = (correctFilmIndex) => {
    let i = correctFilmIndex;
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
    let questionTypeIndex = Math.floor(Math.random() * questionTypeArray.length);
    return questionTypeArray[questionTypeIndex];
}

const generateOptions = (correctFilmIndex, answerType) => {
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

const displayResults = () => {
    divHead.textContent = 'Results';
    divText.textContent = `You scored ${correct} out of 5!`;
    topRow.innerHTML = ``;
    botRow.innerHTML = ``;
    feedback.textContent = '';
    next.innerHTML = `<button>Play Again</button>`;
    next.children[0].addEventListener('click', function() {
        correct = 0;
        currentQuestion = 0;
        displayQuestion();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let start = document.getElementById('start-game');
    start.addEventListener('click', () => {
        displayQuestion();
    })
})