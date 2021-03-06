class formRequest {
    constructor(nameRegister) {
        this.buttonStart = document.getElementById("startGame");
        this.form = document.getElementById("requestForm");
        this.submitButton = document.getElementById("requestButton");
        this.select = document.getElementById("requestSelect");
        this.nameRegister = nameRegister
    }

    setStartButtonHandler() {
        this.buttonStart.addEventListener("click", (event) => {
            this.requestTheNumbersOfPlayers();
            this.buttonStart.style.display = "none";
            event.preventDefault();
        });
    }

    requestTheNumbersOfPlayers() {
        this.form.style.display = "flex";
        this.submitButton.addEventListener("click", (event) => {
            this.nameRegister.numberOfPlayers = this.select.value
            this.nameRegister.askForPlayersNames();
            this.form.style.display = "none";
            event.preventDefault();
        });
    }
}