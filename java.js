
$(document).ready(function() {

var computerChoices = ["luna-lovegood", "obliviate", "wizards-chess", "parseltongue", "pomona", "voldemort", "ravenclaw", "hagrid", "eileen-prince", "bellatrix", "gryffindor", "astoria-greengrass"];
var wins = 0;
var guessesRemaining = 10;
var guessedSoFar = [];
var chosenWord = [];
var computerGuess = " ";


/*

- Define the list of word choices
- Game state class
  - Start a game
    - select random word
    - inital state is 10 guesses
    - no incorrect guesses
    - hidden word starts with placeholders for each alpha char -'s reveale
  - handle guess
    - if correct letter, update hidden word; otherwise update number of guesses remaing and incorrect guesses list
  - game over
    - word has been guessed or no remaining guesses
- Render game to screen
  - output the game's hidden word with additional spacing for clarity
  - show state of remaining guesses, etc.
- On key press
  - update game state


*/

// prototype is effects all instances of the object.
// let is a block scope- this only says were the block is
// var is a global scope- var bleeds to places you may not want. var goes up as high as it can


function RandomWord(choices) {
    this.choices = choices;
    this.wins = 0;
    this.reset();
}

RandomWord.prototype.reset = function reset() {
    let choices = this.choices;
    let randIdx = Math.floor(Math.random() * choices.length);
    this.word = choices[randIdx].toUpperCase();
    console.log('Chosen word:', this.word);
    this.incorrect = {};
    this.correct = {};
    this.revealed = '';
    for (let i=0, len=this.word.length; i < len; i++) {
        let letter = this.word[i];
        let lst = this.correct[letter] || [];
        lst.push(i);
        this.correct[letter] = lst;
        if (letter === '-') {
            this.revealed += '-';
        } else {
            this.revealed += '_';
        }
    }
    this.remainingGuesses = 10;
    this.render();
}

RandomWord.prototype.guess = function guess(letter) {
    if (this.haveLost()) { return this.remainingGuesses; }
    if (!this.correct[letter]) {
        console.log('Incorrect:', letter);
        this.remainingGuesses--;
        this.incorrect[letter] = true;
    } else {
        this.reveal(letter, this.correct[letter]);
    }
    this.render();
    return this.remainingGuesses;
}

RandomWord.prototype.haveWon = function haveWon() {
    return this.revealed === this.word;
}

RandomWord.prototype.haveLost = function haveLost() {
    return this.remainingGuesses <= 0;
}

RandomWord.prototype.reveal = function reveal(letter, letterIndexes) {
    console.log({letter, letterIndexes});
    let revealed = '';
    for (let i=0, len=this.revealed.length; i < len; i++) {
        if (letterIndexes.indexOf(i) !== -1) {
            revealed += letter;
        } else {
            revealed += this.revealed[i];
        }
    }
    this.revealed = revealed;
    console.log('revealed:', this.revealed);
}

RandomWord.prototype.getIncorrectGuesses = function getIncorrectGuesses() {
    let letters = Object.keys(this.incorrect).sort();
    return letters;
}

RandomWord.prototype.end = function end() {
    let self = this;
    setTimeout(function() { self.reset(); }, 3000);
}

RandomWord.prototype.render = function render() {
    let chosenWord = document.getElementById('chosenWord');
    let guessedSoFar = document.getElementById('guessedSoFar');
    let guessesRemaining = document.getElementById('guessesRemaining');
    let wins = document.getElementById('wins');
    chosenWord.innerHTML = this.revealed.split('').join(' ');
    guessedSoFar.innerHTML = "Guessed so far: " + this.getIncorrectGuesses().join(',');
    if (this.haveLost()) {
        guessesRemaining.innerHTML = 'Avracadavra!';
    } else {
        guessesRemaining.innerHTML = 'Remaining guesses: ' + this.remainingGuesses;
    }
    wins.innerHTML = 'Wins: ' + this.wins;
}



let hpWordGame = new RandomWord(computerChoices);
let alphaRe = /^[A-Z]$/;


// This function is run whenever the user presses a key
document.onkeyup = function (event) {
    // Determin which key was pressed and logs it
    let userGuess = event.key.toUpperCase();
    console.log('event:', event);
    console.log('UserGuess', userGuess);
    if (alphaRe.test(userGuess)) {
        console.log('We got a alphabetic character.');
        let guessesRemaining = hpWordGame.guess(userGuess);
        if (!guessesRemaining) {
            // Present option to start a new game?
            hpWordGame.end();
        }
        if (hpWordGame.haveWon()) {
            hpWordGame.wins++;
            hpWordGame.end();
        }

    } else {
        console.log('Non alphabetic character. :(');
    }
    
}

});


