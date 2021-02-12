const playersName = [];

function activeTheStartButton() {
    const buttonStart = document.getElementById("startGame");

    buttonStart.addEventListener("click", (event) => {
        requestNumbersOfPlayers();
        event.preventDefault();
        buttonStart.style.display = "none";
    });
}

function requestNumbersOfPlayers() {
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
        enterThePlayersNames(select.value);
        event.preventDefault();
    });

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(submitButton);
}

function enterThePlayersNames(numberOfPlayers) {
    const form = document.getElementById("mainForm");
    form.innerHTML = '';

    for (let i = 0; i < numberOfPlayers; i++) {
        const label = document.createElement("label");
        label.innerHTML = 'Joueur n° ' + (i + 1);

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("minlength", 4);
        input.setAttribute("maxlength", 20);
        input.setAttribute("name", i);

        form.appendChild(label);
        form.appendChild(input);
    }

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {
        if (checkInputs()) {
            console.log("Pour moi c'est O.K")
            savePlayersName();
            showPlayersName();
            addButtonWhoReloadThePage();
        } else {
            console.log("OH MEC YA UNE ERREUR LA")
            showError();
        }

        event.preventDefault();
    })

    form.appendChild(submitButton);
}

function checkInputs() {
    const form = document.getElementById("mainForm");
    const arrayOfInput = form.getElementsByTagName("input");

    for (let i = 0; i < arrayOfInput.length; i++) {
        input = arrayOfInput[i].value;

        validName = input.match(/^[a-zA-Z]\w{3,20}$/g) // The string must be between 4 and 20 characters long. It accepts letters and numbers. No spaces or special characters.

        if (validName === null) {
            return false;
        }
    }
    
    return true;
}

function savePlayersName() {
    const form = document.getElementById("mainForm");
    const arrayOfInput = form.getElementsByTagName("input");

    for (let i = 0; i < arrayOfInput.length; i++) {
        playersName.push(arrayOfInput[i].value);
    }
}

function showPlayersName() {
    const application = document.getElementById("app");
    application.innerHTML = '';

    for (let i = 0; i < playersName.length; i++) {
        const displayOfAPlayerName = document.createElement('p');
        displayOfAPlayerName.innerHTML = playersName[i];
        application.appendChild(displayOfAPlayerName);
    }
}

function addButtonWhoReloadThePage() {    
    const application = document.getElementById("app")
    const buttonLeave = document.createElement("button");

    buttonLeave.innerHTML = 'Quitter';
    buttonLeave.addEventListener("click", (event) => {
        document.location.reload();
        event.preventDefault();
    });
    application.appendChild(buttonLeave);
}

function showError() {
    const errorMessage = document.getElementById("errorMessage");
    
    errorMessage.innerHTML = "Il y a un problème avec un pseudo";
    errorMessage.style.display = "block";
}

// App Launch

activeTheStartButton();
