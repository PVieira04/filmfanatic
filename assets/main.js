document.addEventListener('DOMContentLoaded', () => {
    let next = document.getElementById('next');
    next.addEventListener('click', () => {
        displayQuestionOne();
    })
})

const displayQuestionOne = () => {
    document.getElementById('div-head').textContent = 'Question 1';
    document.getElementById('div-text').textContent = `What year was "Reservoir Dogs" released?`;
    document.getElementById('top-row').innerHTML = `<button id='q1'>1990</button><button id='q2'>1992</button>`;
    document.getElementById('bot-row').innerHTML = `<button id='q3'>1989</button><button id='q4'>1993</button>`;
    next.innerHTML = '';
    let buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.addEventListener('click', function highlightSelection() {
            if (button.textContent === document.getElementById('q2').textContent) {
                this.removeEventListener('click', highlightSelection);
                this.style.backgroundColor = 'green';
                document.getElementById('feedback').textContent = 'Correct!';
            }
            else {
                this.removeEventListener('click', highlightSelection);
                this.style.backgroundColor = 'red';
                document.getElementById('feedback').textContent = `Sorry! That is incorrect. The correct answer is ${document.getElementById('q2').textContent}.`;
            }
        })
    }
}

const removeListeners = () => {
    let buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.removeEventListener('click', highlightSelection);
    }
}