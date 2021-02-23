class bowlingGameManager {
    constructor() {
        this.playersInformations = [];
    }

    setStartButtonHandler() {
        const buttonStart = document.getElementById("startGame");

        buttonStart.addEventListener("click", (event) => {
            this.requestNumbersOfPlayers();
            event.preventDefault();
            buttonStart.style.display = "none";
        });
    }

    requestNumbersOfPlayers() {
        const form = document.getElementById("requestForm");
        const submitButton = document.getElementById("requestButton");
        const select = document.getElementById("requestSelect");

        form.style.display = "flex";

        submitButton.addEventListener("click", (event) => {
            this.enterThePlayersNames(select.value);
            form.style.display = "none";
            event.preventDefault();
        });
    }

    enterThePlayersNames(numberOfPlayers) {
        const form = document.getElementById("enterPlayerNameForm");
        const submitButton = document.getElementById("enterPlayerNameButton");

        for (let i = 0; i < numberOfPlayers; i++) {
            const label = document.getElementById("label_" + i);
            const input = document.getElementById("input_" + i);

            label.style.display = "block";
            input.style.display = "block";
        }

        form.style.display = "flex";

        submitButton.addEventListener("click", (event) => {
            if (this.checkInputs(numberOfPlayers)) {
                this.savePlayersName(numberOfPlayers);
                this.showTheScoreChart();
                this.AddLeaveButton();
                form.style.display = "none";
            } else {
                this.showError();
            }

            event.preventDefault();
        })
    }

    checkInputs(numberOfPlayers) {
        for (let i = 0; i < numberOfPlayers; i++) {
            const input = document.getElementById("input_" + i).value;

            let validName = input.match(/^[a-zA-Z]\w{3,20}$/g) // The string must be between 4 and 20 characters long. It accepts letters and numbers. No spaces or special characters.

            if (validName === null) {
                return false;
            }
        }

        return true;
    }

    savePlayersName(numberOfPlayers) {
        for (let i = 0; i < numberOfPlayers; i++) {
            const input = document.getElementById("input_" + i).value;
            const playerInformation = { name: input, score: [] }
            this.playersInformations.push(playerInformation);
        }
    }

    showTheScoreChart() {
        const scoreChart = document.getElementById("scoreChart");
        scoreChart.style.display = "block";
        for (let i = 0; i < this.playersInformations.length; i++) {
            const scoreTable = document.getElementsByClassName("playerScoreTable")[i]
            const buttonAddLaunch = document.getElementsByClassName("playerScoreTable_Button")[i]
            const displayOfAPlayerName = document.getElementsByClassName("playerScoreTable_Name")[i];

            displayOfAPlayerName.innerHTML = this.playersInformations[i].name;
            scoreTable.style.display = "block"

            buttonAddLaunch.addEventListener("click", (event) => {
                const score = parseInt(document.getElementsByClassName("playerScoreTable_ScoreSelect")[i].value)
                console.log(score)
                this.addLaunch(i, score);
                event.preventDefault();
            });
        }
    }

    addLaunch(i, score) {
        const scoreTable = this.playersInformations[i].score;
        const scoreTableLength = scoreTable.length

        if (scoreTableLength >= 20) {
            console.log("ERREUR : VOUS AVEZ DEJA TROP JOUER")
            return null
        }

        if (score > 10) {
            console.log("ERREUR IL N'Y A QUE 10 QUILLES ICI ENCULE")
            return null
        }

        if (scoreTableLength % 2 === 0 && score === 10) {
            scoreTable.push(score);
            scoreTable.push("X");
            console.log(BGM.playersInformations[i].score)
            return null
        }

        if (scoreTableLength % 2 != 0) { // CAS 1,3,5,7,9
            const previousLaunch = scoreTable[scoreTableLength - 1]
            console.log(previousLaunch)

            if ((score + previousLaunch) > 10) {
                console.log("ERREUR IL N'Y A QUE 10 QUILLES CEST MOI QUI BUG")
                return null
            }
        }

        scoreTable.push(score);
        console.log(BGM.playersInformations[i].score)
    }

    AddLeaveButton() {
        const buttonLeave = document.getElementById("leaveButton");

        buttonLeave.addEventListener("click", (event) => {
            document.location.reload();
            event.preventDefault();
        });
    }

    showError() {
        const errorMessage = document.getElementById("errorMessage");

        errorMessage.innerHTML = "Il y a un problème avec un pseudo";
        errorMessage.style.display = "block";
    }
}

// Lauch //

BGM = new bowlingGameManager();

BGM.setStartButtonHandler();

// BGM.playersInformations[0] = { name: "ROBERT", score: [] }

//  0 1 2 3 4 5 6 7 8 9 //
// [ , , , , , , , , , ] //

// BGM.addLaunch(0, 10)
// BGM.addLaunch(0, 2)
// console.log(BGM.playersInformations[0].score)