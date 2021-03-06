class scoreCalculator {
    constructor() {
        this.playersInformations = [];
    }
}

class nameRegister {
    constructor(numberOfPlayers) {
        this.form = document.getElementById("enterPlayerNameForm");
        this.submitButton = document.getElementById("enterPlayerNameButton");
        this.numberOfPlayers = 0;
    }

    askForPlayersNames(numberOfPlayers) {

        for (let i = 0; i < numberOfPlayers; i++) {
            const label = document.getElementById("label_" + i);
            const input = document.getElementById("input_" + i);

            label.style.display = "block";
            input.style.display = "block";
        }

        this.form.style.display = "flex";

        this.submitButton.addEventListener("click", (event) => {
            if (this.checkIfThePlayersNamesAreValid(numberOfPlayers) === false) {
                this.changeDisplayedErrorMessage("Il y a un problème avec un pseudo!");
            } else {
                this.createThePlayerInformation(numberOfPlayers);
                this.displayTheScoreboardOfEachPlayer();
                this.setAbandonButtonHandler();
                this.changeDisplayedErrorMessage("");
                this.form.style.display = "none";
            }
            event.preventDefault();
        })
    }
}

const SC = new scoreCalculator();
const NR = new nameRegister();
const FR = new formRequest(NR);

FR.setStartButtonHandler();