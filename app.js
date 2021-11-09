const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();

    }
})


function startGame() {
    setInterval(decreseTime, 1000);
    setTime(time);
    createRandomCircle()
}

function decreseTime() {

    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }

}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        event.target.remove()
        score++
        createRandomCircle()
    }
})



function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span> </h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()

    const color = randomColor()

    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);


    circle.classList.add('circle');

    circle.style.background = `${color}`;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`


    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function randomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}