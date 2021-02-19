class bowlingGameManager {
    constructor() {
        this.playersName = [];
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
                // this.showPlayersName();
                // this.AddLeaveButton();
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
            this.playersName.push(input);
        }
    }

    showTheScoreChart() {
        const scoreChart = document.getElementById("scoreChart");
        scoreChart.style.display = "block";
        for (let i = 0; i < this.playersName.length; i++) {
            const scoreTable = document.getElementsByClassName("playerScoreTable")[i]
            scoreTable.style.display = "block"
        }
    }

    // showPlayersName() {
    //     const application = document.getElementById("app");

    //     application.innerHTML = '';

    //     for (let i = 0; i < this.playersName.length; i++) {
    //         const displayOfAPlayerName = document.createElement('p');

    //         displayOfAPlayerName.innerHTML = this.playersName[i];

    //         application.appendChild(displayOfAPlayerName);
    //     }
    // }

    AddLeaveButton() {
        const application = document.getElementById("app");
        const buttonLeave = document.createElement("button");

        buttonLeave.innerHTML = 'Quitter';

        buttonLeave.addEventListener("click", (event) => {
            document.location.reload();
            event.preventDefault();
        });

        application.appendChild(buttonLeave);
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