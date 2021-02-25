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
            const playerInformation = { name: input, launchHistory: [], scoreByFrames: [], index: 0 }
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
                    // console.log(score)
                this.addLaunch(i, score);
                this.frameScoreCalcul(i);
                this.frameScoreCalcul(i);
                event.preventDefault();
            });
        }
    }

    addLaunch(playerNumero, fallenPins) {
        const launchHistory = this.playersInformations[playerNumero].launchHistory;
        const printScoreTable = document.getElementsByClassName("allLaunchShow")[playerNumero];
        const td = printScoreTable.getElementsByTagName("td")
        let numberOfStrikes = 0;
        let positionInTheTableOnTheScreen;

        if (launchHistory.length >= 21) {
            console.log("ERREUR : VOUS AVEZ DEJA TROP JOUER")
            return
        }

        if (fallenPins > 10) {
            console.log("ERREUR : IL N'Y A QUE 10 QUILLES")
            return
        }

        for (let i = 0; i < launchHistory.length; i++) {
            if (launchHistory[i] == "X") {
                numberOfStrikes++
            }
        }

        positionInTheTableOnTheScreen = launchHistory.length + numberOfStrikes

        if (positionInTheTableOnTheScreen % 2 != 0) { // SECOND LANCER DU FRAMES
            const previousLaunch = launchHistory[launchHistory.length - 1]

            if ((fallenPins + previousLaunch) > 10 || previousLaunch == "X") {
                console.log("ERREUR IL N'Y A QUE 10 QUILLES")
                return
            }
        }

        if (fallenPins === 10) {
            if (launchHistory[launchHistory.length - 1] == 0) {
                launchHistory.push(10);
                printScoreTable.getElementsByTagName("td")[positionInTheTableOnTheScreen].innerHTML = "/"
            } else {
                launchHistory.push("X");
                printScoreTable.getElementsByTagName("td")[positionInTheTableOnTheScreen + 1].innerHTML = "X"
            }
            return
        }
        td[positionInTheTableOnTheScreen].innerHTML = fallenPins;

        launchHistory.push(fallenPins);
    }

    frameScoreCalcul(playerNumero) {
        const launchHistory = this.playersInformations[playerNumero].launchHistory;
        const index = this.playersInformations[playerNumero].index;
        const scoreByFrames = this.playersInformations[playerNumero].scoreByFrames;
        const printScoreTable = document.getElementsByClassName("frames")[playerNumero];
        const td = printScoreTable.getElementsByTagName("td");

        if (launchHistory[index] == "X") { // STRIKES
            if (launchHistory[index] != null && launchHistory[index + 1] != null && launchHistory[index + 2] != null) {
                let sum = 0;
                for (let i = 0; i < 3; i++) {
                    if (launchHistory[index + i] == "X") {
                        sum += 10
                    } else {
                        sum += launchHistory[index + i]
                    }
                }
                scoreByFrames.push(sum)
                this.playersInformations[playerNumero].index += 1;
                td[scoreByFrames.length - 1].innerHTML = scoreByFrames[scoreByFrames.length - 1]
            }
            return
        } else if (launchHistory[index] != null && launchHistory[index + 1] != null) {
            if ((launchHistory[index] + launchHistory[index + 1]) == 10) {
                if (launchHistory[index + 2] != null) {
                    if (launchHistory[index + 2] == "X") {
                        scoreByFrames.push(20)
                    } else {
                        scoreByFrames.push((10 + launchHistory[index + 2]))
                    }
                    this.playersInformations[playerNumero].index += 2;
                    td[scoreByFrames.length - 1].innerHTML = scoreByFrames[scoreByFrames.length - 1]
                }
                return
            }
            scoreByFrames.push((launchHistory[index] + launchHistory[index + 1]))
            this.playersInformations[playerNumero].index += 2;
            td[scoreByFrames.length - 1].innerHTML = scoreByFrames[scoreByFrames.length - 1]
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