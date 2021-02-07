const application = document.getElementById("app");

function run() {

    let buttonStart;

    buttonStart = document.createElement("button");
    buttonStart.innerHTML = "Nouvelle Partie";
    buttonStart.addEventListener("click", () => { requestNumbersOfPlayers() });
    application.appendChild(buttonStart);

}

function requestNumbersOfPlayers() {

    let form, label, select, option, submitButton;

    form = document.createElement("form");

    label = document.createElement("label");
    label.innerHTML = "Définissez le nombre de joueur.";

    select = document.createElement("select");
    select.setAttribute("id", "selectChoice");

    for (let i = 1; i < 5; i++) {
        option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i;
        select.appendChild(option);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {
        enterThePlayersNames(select.value);
        event.preventDefault();
    });

    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(submitButton);

    application.innerHTML = "";
    application.appendChild(form);

}

function enterThePlayersNames(numberOfPlayers) {

    let playersName = [], form, input, label, submitButton;

    form = application.getElementsByTagName('form')[0];
    form.innerHTML = '';

    for (let i = 0; i < numberOfPlayers; i++) {

        label = document.createElement("label");
        label.innerHTML = 'Joueur n° ' + (i + 1);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("minlength", 4);
        input.setAttribute("maxlength", 20);
        input.setAttribute("name", i);

        playersName.push(input);

        form.appendChild(label);
        form.appendChild(input);
    }

    submitButton = document.createElement("button");
    submitButton.innerHTML = "Envoyer";
    submitButton.addEventListener("click", (event) => {

        if (checkInputs(playersName)) {
            savePlayersName(playersName);
        } else {
            let error = document.createElement("p");
            error.innerHTML = "Un pseudo n'est pas valide";
            application.appendChild(error)
        }

        event.preventDefault();
    })

    form.appendChild(submitButton);
    application.appendChild(form);
}

function checkInputs(playersName) {

    let input, passTheTest, AllInputsAreValid = true;

    for (let i = 0; i < playersName.length; i++) {

        input = playersName[i].value;

        passTheTest = input.match(/^[a-zA-Z]\w{3,20}$/g)

        if (!passTheTest) {
            AllInputsAreValid = false;
        }

    }

    return AllInputsAreValid;

}

function savePlayersName(arrayOfInput) {

    let nameOfThePlayer, paragraph, buttonLeave;

    application.innerHTML = '';

    for (let i = 0; i < arrayOfInput.length; i++) {
        nameOfThePlayer = arrayOfInput[i].value;

        paragraph = document.createElement('p');
        paragraph.innerHTML = nameOfThePlayer;

        application.appendChild(paragraph);
    }

    buttonLeave = document.createElement("button");
    buttonLeave.innerHTML = 'Quitter';
    buttonLeave.addEventListener("click", (event) => {
        document.location.reload();
        event.preventDefault();
    });
    application.appendChild(buttonLeave);

}


// App Launch

run();
