// VARIABLE: Tracks which box is currently active (starts at 0 for the first box)
let currentBoxIndex = 0;

// Get all letter boxes and keypad buttons from HTML
let letterBoxes = document.querySelectorAll(".letter-box");
let keys = document.querySelectorAll(".key");

// FUNCTION: Adds a click event listener to every keypad button
keys.forEach(function(key) {
  key.addEventListener("click", function() {
    // Check if we still have empty boxes in the current row
    if (currentBoxIndex < letterBoxes.length) {
      // Put the key's letter into the active box
      letterBoxes[currentBoxIndex].textContent = key.textContent;
      
      // Move to the next box index
      currentBoxIndex = currentBoxIndex + 1;
    }
  });
});
// SECRET WORD
let secretWord = "PARIS";

// VARIABLE: Tracks which box is active
let currentBoxIndex = 0;

// Get elements from HTML
let letterBoxes = document.querySelectorAll(".letter-box");
let keys = document.querySelectorAll(".key");
let messageElement = document.getElementById("message");

// FUNCTION: Keypad click listener
keys.forEach(function(key) {
  key.addEventListener("click", function() {
    if (currentBoxIndex < letterBoxes.length) {
      letterBoxes[currentBoxIndex].textContent = key.textContent;
      currentBoxIndex = currentBoxIndex + 1;

      // WHEN ALL 5 BOXES ARE FILLED: Check the guess!
      if (currentBoxIndex === letterBoxes.length) {
        checkGuess();
      }
    }
  });
});

// FUNCTION: Checks if the user's guess matches the secret word
function checkGuess() {
  // Collect the typed letters into one word
  let userGuess = "";
  letterBoxes.forEach(function(box) {
    userGuess = userGuess + box.textContent;
  });

  // CONDITION: Check if guess matches secret word
  if (userGuess === secretWord) {
    messageElement.textContent = "CORRECT! YOU WIN! 🎉";
    messageElement.style.color = "#2ecc71";
    letterBoxes.forEach(function(box) {
      box.classList.add("correct");
    });
  } else {
    messageElement.textContent = "INCORRECT! TRY AGAIN! ❌";
    messageElement.style.color = "#e74c3c";
    letterBoxes.forEach(function(box) {
      box.classList.add("incorrect");
    });
  }
}
 