var wordBankCats = ["Kitcat", "Nona", "Mowgli", "Nightfury", "Ninja", "Lightfury", "Itchy", "Scratchy", "Fluffybottom", "Snowflake", "Tiger", "Sylvester", "Simba", "Nala", "Scar", "Leo", "Luna"],
    guessedLetters = [''],
    selectedCatName = 0,
    wrongGuesses = 0,
    winsTotal = 0,
    lossesTotal = 0,
    limitGuesses = 9
    isGameStarted = false,
    audiobad = new Audio("assets/badmeow.mp3"),
    audiogood = new Audio("assets/goodmeow.mp3"),

function reset() {
    guessedLetters = [''],

        selectedCatName = getRandomInt(wordBankCats.length - 1);

    wrongGuesses = 0;

    document.getElementById("wins").textContent = winsTotal;
    document.getElementById("losses").innerText = lossesTotal;
    document.getElementById("guessesLeft").innerText = (limitGuesses - wrongGuesses).toString();

    render();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function guess(guess) {
    if (guessedLetters.indexOf(guess.toLowerCase()) == -1) {
        guessedLetters.push(guess.toLowerCase());

        if (wordBankCats[selectedCatName].indexOf(guess.toLowerCase()) == -1) {
            wrongGuesses++;

            if (wrongGuesses >= limitGuesses) {
                lossesTotal++
                audiobad.play();
                alert("You lose, let's play again.")

                reset();

            }

        }
        render();

    }
    else {
        audiobad.play();
        alert("You've already guessed " + guess + ". Please try another letter.");
        
    }
}

function render() {
    var output = "";

    for (var index = 0; index < wordBankCats[selectedCatName].length; index++) {
        var characterFromWord = wordBankCats[selectedCatName][index];

        if (guessedLetters.indexOf(characterFromWord.toLowerCase()) == -1) {
            output += ("_" + " ");
        }
        else {
            output += characterFromWord + " ";
        }

    }

    
    document.getElementById("word").innerText = output;
    document.getElementById("wins").innerText = winsTotal;
    document.getElementById("losses").innerText = lossesTotal;
    document.getElementById("guessesLeft").innerText = (limitGuesses - wrongGuesses).toString();

    if (output.indexOf('_') == -1) {
        winsTotal++;

        window.setTimeout(winAlert,10);

        window.setTimeout(reset,1000);
            
    }

}

function winAlert(){
    audiogood.play();
    alert("Furtastic! You meowed it to the big leagues! You Won!");
    
}

document.onkeyup = function (event) {
    var input = String.fromCharCode(event.keyCode);
    //if character entered was alphabetic, non case sensitivee
    if (/[a-zA-Z]/.test(input)) {
        guess(input);
    }
    else {
        isGameStarted = true;
        document.getElementById("startMessage").innerText = "";
    }

}


