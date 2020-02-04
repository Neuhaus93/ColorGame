// Global Variables
let numSquares = 6;
let colors = [];
let pickedColor;

// Page elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {

    setModeListeners();
    setSquaresListeners();
    setResetListener();

    reset();
}

function setResetListener() {
    // Button 'New Colors'
    resetButton.addEventListener("click", function () {
        reset();
    });
}

function setSquaresListeners() {
    // Add the event listeneres for the squares
    for (let i = 0; i < squares.length; i++) {
        // Squares click listeners
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
                h1.style.backgroundColor = pickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!"
            }
        })
    }
}

function setModeListeners() {
    // Add the event listeneres for the modes
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            (this.textContent === "Easy") ? numSquares = 3 : numSquares = 6;

            reset();
        });
    }
}

function changeColors(color) {
    // Loop through all squares
    for (let i = 0; i < squares.length; i++) {
        // Change each color to match correct color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(quant) {
    let colorsArray = [];
    for (let i = 0; i < quant; i++) {
        let str = 'rgb(';
        for (let j = 0; j < 3; j++) {
            if (j === 2) {
                str += Math.floor(Math.random() * 256) + ')';
            } else {
                str += Math.floor(Math.random() * 256) + ', ';
            }
        }
        colorsArray.push(str);
    }
    return colorsArray;
}

function reset() {
    colors = generateRandomColors(numSquares);

    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";

    messageDisplay.textContent = "";

    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
}