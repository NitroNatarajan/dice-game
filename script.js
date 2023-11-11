'use strict';
// Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// While before the game starts the score is zero for both and dice is not to be visible

let scores,currentScore,activePlayer,playing;
const init = function (){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}
init();
const switchPlayer = function (){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}
// Rolling dice Functionality

btnRoll.addEventListener("click", function (){
    if(playing){
                // Generate a random dice roll
        const dice = Math.trunc(Math.random()*6) +1;

        // Display dice
        diceEl.classList.remove("hidden");
        diceEl.setAttribute("src", `dice-${dice}.png`);

        // check for rolled 1 : if True switch to next player

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
        switchPlayer();
        }
    }

})

btnHold.addEventListener("click", function(){
   if(playing){
     // Add current score to the active players score
     scores[activePlayer] += currentScore;
     // check if players score is >=100
     document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
     // finish the game
     if(scores[activePlayer] >= 20) {
         playing = false;
         document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
         document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
     }
     else{
         // Switch to the next player
         switchPlayer();
     }
   }
    
})

btnNew.addEventListener("click",init);