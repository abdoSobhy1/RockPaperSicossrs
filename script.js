let optionsContainer = document.querySelector(".options");
let options = document.querySelectorAll(".option");
let game = document.querySelector(".game");
let picks = document.querySelector(".picks");

options.forEach(option => {
    option.addEventListener("click", function () {
        optionsContainer.classList.add("hide");
        setTimeout(function () {
            optionsContainer.style.display = "none";
            picks.style.display = "flex";
            setTimeout(function () {
                game.classList.add("playing");
            }, 50);
        }, 300);
        let playerChoice = this.getAttribute("data-value");
        let returnChoices = {
            r: "./images/icon-rock.svg",
            p: "./images/icon-paper.svg",
            s: "./images/icon-scissors.svg"
        };
        let playerChoiceContainer = document.querySelector(".player-choice>div");
        let playerChossen = document.querySelector(".player-choice img");
        playerChossen.setAttribute("src", returnChoices[playerChoice]);
        playerChoiceContainer.setAttribute("data-value", playerChoice);
        let computerChoice = getComputerChoice();
        let winner = getWinner(playerChoice, computerChoice);
        let winingMessage = document.querySelector(".result h2");
        if (winner == "tie") {
            winingMessage.innerHTML = "It’s a tie";
        } else if (winner == "player") {
            winingMessage.innerHTML = "You Win";
            setTimeout(function () {
                updateScore();
            }, 350);
        } else {
            winingMessage.innerHTML = "You Lose";
        }
    });

});

function getComputerChoice() {
    let choices = ["r", "p", "s"];
    let randomChoice = Math.floor(Math.random() * 3);
    let returnChoices = {
        r: "./images/icon-rock.svg",
        p: "./images/icon-paper.svg",
        s: "./images/icon-scissors.svg"
    };
    let computerChoiceContainer = document.querySelector(".computer-choice>div");
    let computerChoice = document.querySelector(".computer-choice img");
    computerChoice.setAttribute("src", returnChoices[choices[randomChoice]]);
    computerChoiceContainer.setAttribute("data-value", choices[randomChoice]);
    return choices[randomChoice];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "tie";
    } else if (playerChoice === "r") {
        if (computerChoice === "p") {
            return "computer";
        } else {
            return "player";
        }
    } else if (playerChoice === "p") {
        if (computerChoice === "r") {
            return "player";
        } else {
            return "computer";
        }
    } else if (playerChoice === "s") {
        if (computerChoice === "r") {
            return "computer";
        } else {
            return "player";
        }
    }
};

function updateScore() {
    let score = document.querySelector(".score .value");
    score.innerHTML = +score.innerHTML + 1;
    saveScore(score);
}

function saveScore(score) {
    localStorage.setItem("score", score.innerHTML);
}

function loadScore() {
    let score = document.querySelector(".score .value");
    if (localStorage.getItem("score")) {
        score.innerHTML = localStorage.getItem("score");
    }
}

loadScore();

let playAgain = document.querySelector(".play-again");

playAgain.addEventListener("click", function () {
    game.classList.remove("playing");
    setTimeout(function () {
        picks.style.display = "none";
        optionsContainer.style.display = "flex";
        setTimeout(function () {
            optionsContainer.classList.remove("hide");
        }, 100);
    }, 300);
});

let rulesButton = document.querySelector(".rules .btn");
let rules = document.querySelector(".rules-modal");
let closeRules = document.querySelectorAll(".close-btn");
let backdrop = document.querySelector(".backdrop");
let rulesVisivle = false;
rulesButton.addEventListener("click", toggleRules);
closeRules.forEach(button => {
    button.addEventListener("click", toggleRules);
});
backdrop.addEventListener("click", toggleRules);

function toggleRules() {
    if (rulesVisivle) {
        rulesVisivle = false;
        rules.classList.remove("is-active");
        backdrop.classList.remove("is-active");
        setTimeout(function () {
            rules.style.display = "";
            backdrop.style.display = "";
        }, 300);
    } else {
        rulesVisivle = true;
        rules.style.display = "flex";
        backdrop.style.display = "block";
        setTimeout(function () {
            rules.classList.add("is-active");
            backdrop.classList.add("is-active");
        }, 50);
    }
}