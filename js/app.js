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
        const form = document.getElementById("mainForm");
        const label = document.createElement("label");
        const select = document.createElement("select");
        const submitButton = document.createElement("button");

        label.innerHTML = "Définissez le nombre de joueur.";
        submitButton.innerHTML = "Envoyer";

        for (let i = 1; i < 5; i++) {
            const option = document.createElement("option");
            option.setAttribute("value", i);
            option.innerHTML = i;
            select.appendChild(option);
        }

        submitButton.addEventListener("click", (event) => {
            this.enterThePlayersNames(select.value);
            event.preventDefault();
        });

        form.appendChild(label);
        form.appendChild(select);
        form.appendChild(submitButton);
    }

    enterThePlayersNames(numberOfPlayers) {
        const form = document.getElementById("mainForm");
        const submitButton = document.createElement("button");
    
        form.innerHTML = '';
        submitButton.innerHTML = "Envoyer";
    
        for (let i = 0; i < numberOfPlayers; i++) {
            const label = document.createElement("label");
            const input = document.createElement("input");
    
            label.innerHTML = 'Joueur n° ' + (i + 1);
            
            input.setAttribute("type", "text");
            input.setAttribute("minlength", 4);
            input.setAttribute("maxlength", 20);
            input.setAttribute("name", i);
    
            form.appendChild(label);
            form.appendChild(input);
        }
    
        submitButton.addEventListener("click", (event) => {
            if (this.checkInputs()) {
                this.savePlayersName();
                this.showPlayersName();
                this.AddLeaveButton();
            } else {
                this.showError();
            }
    
            event.preventDefault();
        })
    
        form.appendChild(submitButton);
    }

    checkInputs() {
        const form = document.getElementById("mainForm");
        const arrayOfInput = form.getElementsByTagName("input");

        for (let i = 0; i < arrayOfInput.length; i++) {
            const input = arrayOfInput[i].value;

            let validName = input.match(/^[a-zA-Z]\w{3,20}$/g) // The string must be between 4 and 20 characters long. It accepts letters and numbers. No spaces or special characters.

            if (validName === null) {
                return false;
            }
        }

        return true;
    }

    savePlayersName() {
        const form = document.getElementById("mainForm");
        const arrayOfInput = form.getElementsByTagName("input");

        for (let i = 0; i < arrayOfInput.length; i++) {
            this.playersName.push(arrayOfInput[i].value);
        }
    }

    showPlayersName() {
        const application = document.getElementById("app");

        application.innerHTML = '';

        for (let i = 0; i < this.playersName.length; i++) {
            const displayOfAPlayerName = document.createElement('p');

            displayOfAPlayerName.innerHTML = this.playersName[i];

            application.appendChild(displayOfAPlayerName);
        }
    }

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