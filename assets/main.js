let divHead = document.getElementById('div-head');
let divText = document.getElementById('div-text');
let topRow = document.getElementById('top-row');
let botRow = document.getElementById('bot-row');
let feedback = document.getElementById('feedback');
let count = 0;
let correct = 0;

const films = [
    {
        id : 0001,
        title : 'Reservoir Dogs',
        year : 1992,
        mainChar : 'Mr. White',
        mainActor : 'Hervery Keitel',
        director : 'Quentin Tarantino'
    },
    {
        id : 0002,
        title : 'No Time to Die',
        year : 2021,
        mainChar : 'James Bond',
        mainActor : 'Daniel Craig',
        director : 'Cary Joji Fukunaga'
    },
    {
        id : 0003,
        title : 'A New Hope',
        year : 1977,
        mainChar : 'Luke Skywalker',
        mainActor : 'Mark Hamill',
        director : 'George Lucas'
    },
    {
        id : 0004,
        title : 'Doctor Dolittle',
        year : 1998,
        mainChar : 'Dr, John Dolittle',
        mainActor : 'Eddie Murphy',
        director : 'Betty Thomas'
    },
    {
        id : 0005,
        title : 'Titanic',
        year : 1997,
        mainChar : 'Jack Dawson',
        mainActor : 'Leonardo DiCaprio',
        director : 'James Cameron'
    }
]

const displayQuestionOne = () => {
    divHead.textContent = 'Question 1';
    divText.textContent = `What year was "Reservoir Dogs" released?`;
    topRow.innerHTML = `<button id='q1' class='option'>1990</button><button id='q2' class='option'>1992</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>1989</button><button id='q4' class='option'>1993</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q2').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q2').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayQuestionTwo();
            })
        })
    }
    
}

const displayQuestionTwo = () => {
    divHead.textContent = 'Question 2';
    divText.textContent = `What is the name of the actor who plays James Bond in "No Time to Die", released in 2021?`;
    topRow.innerHTML = `<button id='q1' class='option'>Timothy Dalton</button><button id='q2' class='option'>Henry Cavil</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>Idris Elba</button><button id='q4' class='option'>Daniel Craig</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q4').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q4').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayQuestionThree();
            })
        })
    }
}

const displayQuestionThree = () => {
    divHead.textContent = 'Question 3';
    divText.textContent = `In the Star Wars universe, on what planet did Luke Skywalker grow up on?`;
    topRow.innerHTML = `<button id='q1' class='option'>Mandalore</button><button id='q2' class='option'>Toydaria</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>Tatooine</button><button id='q4' class='option'>Alderaan</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q3').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q3').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayQuestionFour();
            })
        })
    }
}

const displayQuestionFour = () => {
    divHead.textContent = 'Question 4';
    divText.textContent = `Who played the principal character in 1998's Doctor Dolittle?`;
    topRow.innerHTML = `<button id='q1' class='option'>Charlie Murphy</button><button id='q2' class='option'>Chris Rock</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>Chris Tucker</button><button id='q4' class='option'>Eddie Murphy</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q4').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q4').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayQuestionFive();
            })
        })
    }
}

const displayQuestionFive = () => {
    divHead.textContent = 'Question 5';
    divText.textContent = `Who directed "Titanic", released in 1997?`;
    topRow.innerHTML = `<button id='q1' class='option'>James Cameron</button><button id='q2' class='option'>Steven Spielberg</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>Quentin Tarantino</button><button id='q4' class='option'>Frank Darabont</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q1').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q1').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayResults();
            })
        })
    }
}

const displayQuestion = () => {
    divHead.textContent = `Question ${count}`;
    divText.textContent = ``;
    topRow.innerHTML = `<button id='q1' class='option'></button><button id='q2' class='option'></button>`;
    botRow.innerHTML = `<button id='q3' class='option'></button><button id='q4' class='option'></button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    let answered = false;
    let buttons = document.getElementsByClassName('option');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (answered === true) {
                return
            }
            else if (button.textContent === document.getElementById('q2').textContent) {
                this.style.backgroundColor = 'green';
                feedback.textContent = 'Correct!';
                correct++;
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q2').textContent}.`;
            }
            answered = true;
            next.innerHTML = `<button id='next-button'>Next Question</button>`;
            document.getElementById('next-button').addEventListener('click', function() {
                displayQuestionTwo();
            })
        })
    }
    
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
        count = 1;
        displayQuestionOne();
    })

}

document.addEventListener('DOMContentLoaded', () => {
    let start = document.getElementById('start-game');
    start.addEventListener('click', () => {
        count = 1;
        displayQuestionOne();
    })
})