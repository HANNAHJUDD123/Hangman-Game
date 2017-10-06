document.ready(function)() {
// things to complete
// get it to work on the screan
// fix image so there is only one
// get buttons on screen
// add list of already used keys
// GET IT TO WORK!!!

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul ===========================================
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


// create alphabet ul =========================================
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


// WINS =====================================================


var score = 0;

function wins() {
    var wins = document.getElementById("#wins");
    $('#score').text(score);
    function foundMatchingBlocks(event, params) {
    params.elements.remove();
    score += 100;
    $('#score').text(score);

  }
  
}


// words ===========================================================

    document.onkeyup = function (event) {
      
        var userGuess = event.key;
        
      

    play = function () {
    words = [
        ["luna-lovegood", "obliviate", "wizards-chess", "parseltongue"],
        ["pomona", "voldemort", "ravenclaw", "hagrid"],
        ["eileen-prince", "bellatrix", "gryffindor", "astoria-greengrass"]
    ];

    chosenwords = words[Math.floor(Math.random() * words.length)];
    word = chosenWords[Math.floor(Math.random() * chosenWords.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }
}
  play();

  // Select Catagory ============================================================


  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen categories is Hogwarts Students";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen categories is Hogwart Teachers";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen categories is Death Eaters";
    } 
  }



 // Create geusses ul=============================================

   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }


// MAX GUESSES ======================================================

    (function () {

    var guessesLeft, randomNumber, guessInput, submitButton, answerDisplay, maxGuesses;

    maxGuesses = 10;

    var maxGuesses = document.getElementById("reminging-guesses")

    initGame();

    function initGame () {
        guessesLeft = maxGuesses;
        randomNumber = Math.floor(Math.random() * 10 + 1);
        guessInput.value = "";
    }

    function checkAnswer () {

        if (guessInput.value == chosenCategory) {
            answerDisplay.innerHTML = "You win! " + chosenCategory + " is correct. ";
            initGame();
            return;
        }
        else (maxGuesses < 0) {
            answerDisplay.innerHTML = "YOU LOOSE!";
        }
        
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            answerDisplay.innerHTML += " No guesses left - you lost!";
            initGame();
        }
    }

}());

// hint ===========================================================

   hint.onclick = function() {

      hints = [
        ["Who is the daughter of Xenophilius and Pandora?", "What charm did Hermione place on her parents?", "Ron was the champion of what game?", "Harry potter can speak what language?"],
        ["What is professors Sprout first name?", "Professor McGonagall boggart was what?", "Filius Fitwick was loyal to what hogarts house?", "Grawp was who’s step-brother?"],
        ["Who gave Snape the nick name, The half-blood prince? ", "Who tortured Neville Longbottom’s parents?", "Peter Pettigrew was from what Hogwart house?", "Draco Malfoy married who?"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };


// reset ==========================================================

document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}

}
