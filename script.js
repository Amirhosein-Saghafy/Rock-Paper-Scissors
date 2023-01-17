'use strict';

//Elements
const modal = document.querySelector('.modal');
const hideModalButton = document.getElementById('close-modal');
const showModalButton = document.getElementById('show-rules');
const options = document.querySelector('.content .options');
const result = document.querySelector('.result');
const content = document.querySelector('.main .content');
const userOption = document.getElementById('user');
const robotOption = document.getElementById('robot');
const scoreContainer = document.getElementById('score-number');
const resultText = document.querySelector('.result-text');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

// Variables
let isChoosing = true;
let robotChoose = null;
let randomNum = null;
let key = '';
let selectedOption = null;
let userOptionString = '';
let robotOptionString = '';

let score = localStorage.getItem('score');
score = score || 0;
scoreContainer.innerText = score;

const playAgainButton = document.createElement('button');
playAgainButton.innerText = 'play again';
playAgainButton.id = 'play-again';

// Functions
const logic = () => {

    const userSelectedOption = userOption.querySelector('.option-inner').dataset.option;
    const robotSelectedOption = robotOption.querySelector('.option-inner').dataset.option;

    let result = '';

    if (userSelectedOption === 'paper') {

        if (robotSelectedOption === 'paper') {
            result = 'draw';
        }
        else if (robotSelectedOption === 'scissors') {
            result = 'lose';
        }
        else {
            result = 'win';
        }
    }
    else if (userSelectedOption === 'scissors') {
        if (robotSelectedOption === 'scissors') {
            result = 'draw';
        }
        else if (robotSelectedOption === 'paper') {
            result = 'win';
        }
        else {
            result = 'lose';
        }
    }
    else {
        if (robotSelectedOption === 'rock') {
            result = 'draw';
        }
        else if (robotSelectedOption === 'scissors') {
            result = 'win';
        }
        else {
            result = 'lose';
        }
    }

    if (result === 'win') {
        userOption.classList.add('win');
        winSound.play();
        score++;
    }
    else if (result === 'lose') {
        loseSound.play();
        score--;
        score = (score === -1) ? 0 : score;
    }

    scoreContainer.innerText = score;
    localStorage.removeItem('score');
    localStorage.setItem('score', score);

    resultText.insertAdjacentHTML('afterbegin', `<h3>you ${result}</h3>`);
    resultText.insertAdjacentElement('beforeend', playAgainButton);
}
const showResult = () => {

    userOptionString = `
    <h4>you picked</h4>
    <div class="option-inner" data-option="${selectedOption.id}">
        <div class="option-img">
            <img src="images/icon-${selectedOption.id}.svg" alt="${selectedOption.id}">
        </div>
        <div class="animation-circle"></div>
    </div>`;

    userOption.innerHTML = null;
    robotOption.innerHTML = null;
    resultText.innerHTML = null;
    clearTimeout(robotChoose);

    userOption.insertAdjacentHTML('afterbegin', userOptionString);

    robotChoose = setTimeout(() => {

        randomNum = Math.floor(Math.random() * 3 + 1);

        key = '';

        switch (randomNum) {
            case 1:
                key = 'paper';
                break;
            case 2:
                key = 'scissors';
                break;
            case 3:
                key = 'rock';
                break;
        }

        robotOptionString = `
        <h4>robot picked</h4>
        <div class="option-inner" data-option="${key}">
            <div class="option-img">
                <img src="images/icon-${key}.svg" alt="${key}">
            </div>
        </div>`;

        robotOption.insertAdjacentHTML('afterbegin', robotOptionString);

        logic();

    }, 800);
}
const checkState = () => {

    if (isChoosing) {
        userOption.classList.remove('win');
        window.onclick = (e) => {
            pickOption(e);
        }
        options.classList.add('show');
        result.classList.remove('show');
        content.style.backgroundImage = `url('images/bg-triangle.svg')`;
    }
    else {
        window.onclick = '';
        options.classList.remove('show');
        result.classList.add('show');
        content.style.backgroundImage = 'none';
    }
}
const pickOption = (e) => {
    selectedOption = e.target.closest('.option');

    if (selectedOption) {
        isChoosing = false;
        checkState();
        showResult();
    }
}

// Events
showModalButton.addEventListener('click', (e) => {
    modal.classList.add('active');
});

hideModalButton.addEventListener('click', (e) => {
    modal.classList.remove('active');
});

playAgainButton.addEventListener('click', (e) => {
    isChoosing = true;
    checkState();
});

checkState();
// localStorage.clear();