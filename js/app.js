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
            const playerInformation = { name: input, launchHistory: [], scoreByFrames: [] }
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
                this.frameScoreCalcul(i);
                event.preventDefault();
            });
        }
    }

    addLaunch(playerNumero, fallenPins) {
        const scoreTable = this.playersInformations[playerNumero].launchHistory;
        const scoreTableLength = scoreTable.length;
        const printScoreTable = document.getElementsByClassName("allLaunchShow")[playerNumero];
        const td = printScoreTable.getElementsByTagName("td")[scoreTableLength]

        if (scoreTableLength >= 21) {
            console.log("ERREUR : VOUS AVEZ DEJA TROP JOUER")
            return null
        }

        if (fallenPins > 10) {
            console.log("ERREUR : IL N'Y A QUE 10 QUILLES")
            return null
        }

        if (scoreTableLength % 2 === 0 && fallenPins === 10) { // C'EST UN STRIKE ??

            scoreTable.push("X", "X");
            console.log(BGM.playersInformations[playerNumero].launchHistory)

            printScoreTable.getElementsByTagName("td")[scoreTableLength + 1].innerHTML = "X"

            return null
        }

        if (scoreTableLength % 2 != 0) { // SECOND LANCER DU FRAMES
            const previousLaunch = scoreTable[scoreTableLength - 1]
            console.log(previousLaunch)

            if ((fallenPins + previousLaunch) > 10) {
                console.log("ERREUR IL N'Y A QUE 10 QUILLES")
                return null
            }
        }


        scoreTable.push(fallenPins);
        td.innerHTML = fallenPins;
        console.log(BGM.playersInformations[playerNumero].launchHistory)
    }

    frameScoreCalcul(playerNumero) {
        const scoreTable = this.playersInformations[playerNumero].launchHistory;
        const scoreByFrames = this.playersInformations[playerNumero].scoreByFrames;
        const numberOfFrame = scoreByFrames.length * 2;
        const printScoreTable = document.getElementsByClassName("frames")[playerNumero];
        const td = printScoreTable.getElementsByTagName("td")[scoreByFrames.length]

        if (scoreTable[numberOfFrame] != null && scoreTable[numberOfFrame + 1] != null) {
            scoreByFrames.push((scoreTable[numberOfFrame] + scoreTable[numberOfFrame + 1]))
            console.log(scoreByFrames)
        }
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
// console.log(BGM.playersInformations[0].launchHistory)