const welcome = () => {
    document.getElementById('div-head').textContent = 'Welcome to the quiz just for Film Fanatics!';
    document.getElementById('div-text').textContent = 'You will be given five random questions and each one will give you four options to choose from. Once you select your answer, We will tell you if it was correct, and you can move on to the next question (you cannot go back to previous questions). Once you have answered your fifth question, you can view the results!';
    document.getElementById('next').textContent = 'Start Game'
}

const displayQuestion = () => {
    
}

welcome();