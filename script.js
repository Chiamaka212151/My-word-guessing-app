
// SECRET WORD & CLUE
let secretWord = "PARIS";
let clue = "Hint: Capital of France, home to the Eiffel Tower!";

// TRACKING VARIABLES
let currentRowIndex = 0;
let currentBoxIndex = 0;

// GET HTML ELEMENTS
let rows = document.querySelectorAll(".guess-row");
let keys = document.querySelectorAll(".key");
let messageElement = document.getElementById("message");
let helpButton = document.getElementById("help-btn");
let skipButton = document.getElementById("skip-btn");
let clueElement = document.getElementById("clue-text");

// HELP BUTTON LISTENER
helpButton.addEventListener("click", function() {
  clueElement.textContent = clue;
});

// KEYPAD BUTTON LISTENERS
keys.forEach(function(key) {
  key.addEventListener("click", function() {
    // Select boxes only inside the current active row
    let activeBoxes = rows[currentRowIndex].querySelectorAll(".letter-box");

    if (currentBoxIndex < activeBoxes.length) {
      activeBoxes[currentBoxIndex].textContent = key.textContent;
      currentBoxIndex = currentBoxIndex + 1;

      // When the active row is fully filled, check the guess!
      if (currentBoxIndex === activeBoxes.length) {
        checkRowGuess(activeBoxes);
      }
    }
  });
});

// FUNCTION: Checks the guess for the active row
function checkRowGuess(activeBoxes) {
  let userGuess = "";
  activeBoxes.forEach(function(box) {
    userGuess = userGuess + box.textContent;
  });

  if (userGuess === secretWord) {
    messageElement.textContent = "CORRECT! YOU WIN! 🎉";
    messageElement.style.color = "#2ecc71";
    activeBoxes.forEach(function(box) {
      box.classList.add("correct");
    });
  } else {
    activeBoxes.forEach(function(box) {
      box.classList.add("incorrect");
    });

    // Move to the next row if available
    if (currentRowIndex < rows.length - 1) {
      currentRowIndex = currentRowIndex + 1;
      currentBoxIndex = 0;
      messageElement.textContent = "TRY AGAIN IN ROW " + (currentRowIndex + 1) + "! ❌";
      messageElement.style.color = "#e74c3c";
    } else {
      messageElement.textContent = "GAME OVER! Secret word was: " + secretWord;
      messageElement.style.color = "#e74c3c";
    }
  }
}
// SKIP BUTTON LISTENER
skipButton.addEventListener("click", function() {
  if (currentRowIndex < rows.length) {
    let activeBoxes = rows[currentRowIndex].querySelectorAll(".letter-box");

    activeBoxes.forEach(function(box, index) {
      box.textContent = secretWord[index];
      box.classList.add("incorrect");
    });

    if (currentRowIndex < rows.length - 1) {
      currentRowIndex = currentRowIndex + 1;
      currentBoxIndex = 0;
      messageElement.textContent = "SKIPPED! Moved to row " + (currentRowIndex + 1);
      messageElement.style.color = "#e67e22";
    } else {
      messageElement.textContent = "SKIPPED! Secret word was: " + secretWord;
      messageElement.style.color = "#e67e22";
    }
  }
});

