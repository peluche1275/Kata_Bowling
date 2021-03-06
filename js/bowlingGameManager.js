class bowlingGameManager {
    constructor() {
        this.scoreCalculator = new scoreCalculator();
        this.scoreboard = new scoreboard();
        this.nameRegister = new nameRegister();
        this.formRequest = new formRequest();
        this.errorMessage = document.getElementById("errorMessage");
        this.numberOfPlayers = 0;
        this.playersInformations = [];
    }

    setStartButtonHandler() {
        this.formRequest.buttonStart.addEventListener("click", (event) => {
            this.requestTheNumbersOfPlayers();
            this.formRequest.buttonStart.style.display = "none";
            event.preventDefault();
        });
    }

    requestTheNumbersOfPlayers() {
        this.formRequest.form.style.display = "flex";
        this.formRequest.submitButton.addEventListener("click", (event) => {
            this.numberOfPlayers = this.formRequest.select.value;
            this.formRequest.form.style.display = "none";
            this.nameRegister.displayNameFields(this.numberOfPlayers);
            this.setSubmitButtonHandler();
            event.preventDefault();
        });
    }

    setSubmitButtonHandler() {
        this.nameRegister.submitButton.addEventListener("click", (event) => {
            if (this.nameRegister.checkIfThePlayersNamesAreValid(this.numberOfPlayers) === false) {
                this.errorMessage.innerHTML = "Il y a un problème avec un pseudo!";
            } else {
                this.playersInformations = this.scoreboard.createThePlayerInformation(this.numberOfPlayers);
                this.displayTheScoreboardOfEachPlayer();
                this.errorMessage.innerHTML = "";
                this.nameRegister.form.style.display = "none";
            }
            event.preventDefault();
        })
    }

    displayTheScoreboardOfEachPlayer() {
        for (let playerNumero = 0; playerNumero < this.numberOfPlayers; playerNumero++) {
            this.scoreboard.displayedNames[playerNumero].innerHTML = this.playersInformations[playerNumero].name;
            this.scoreboard.scoreboards[playerNumero].style.display = "block";

            this.buttonAddThrows[playerNumero].addEventListener("click", (event) => {
                const score = parseInt(this.scoreboard.scoreSelect[playerNumero].value);
                this.addScoreToTheScoreboard(playerNumero, score);
                event.preventDefault();
            });
        }
    }



}