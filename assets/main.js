let divHead = document.getElementById('div-head');
let divText = document.getElementById('div-text');
let topRow = document.getElementById('top-row');
let botRow = document.getElementById('bot-row');
let feedback = document.getElementById('feedback');

const displayQuestionOne = () => {
    divHead.textContent = 'Question 1';
    divText.textContent = `What year was "Reservoir Dogs" released?`;
    topRow.innerHTML = `<button id='q1' class='option'>1990</button><button id='q2' class='option'>1992</button>`;
    botRow.innerHTML = `<button id='q3' class='option'>1989</button><button id='q4' class='option'>1993</button>`;
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
                answered = true;
                next.innerHTML = `<button id='next-button'>Next Question</button>`;
                document.getElementById('next-button').addEventListener('click', function() {
                    displayQuestionTwo();
                })
            }
            else {
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q2').textContent}.`;
                answered = true;
                next.innerHTML = `<button id='next-button'>Next Question</button>`;
                document.getElementById('next-button').addEventListener('click', function() {
                    displayQuestionTwo();
                })
            }
        })
    }
    
}

const displayQuestionTwo = () => {
    
    divHead.textContent = 'Question 2';
    divText.textContent = `What is the name of the actor who plays James Bond in "No Time to Die", released in 2021?`;
    topRow.innerHTML = `<button id='q1'>Timothy Dalton</button><button id='q2'>Henry Cavil</button>`;
    botRow.innerHTML = `<button id='q3'>Idris Elba</button><button id='q4'>Daniel Craig</button>`;
    feedback.textContent = '';
    next.innerHTML = '';
    alert('this is question 2')
}

document.addEventListener('DOMContentLoaded', () => {
    let start = document.getElementById('start-game');
    start.addEventListener('click', () => {
        displayQuestionOne();
    })
})