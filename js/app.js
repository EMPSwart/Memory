// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // close icon in modal
 let closing = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1");

 // array for opened cards
let openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffle array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play 
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all existing classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    
    //reset timer
    second = 0;
    minute = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
}


// @description when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves === 1){
        second = 0;
        minute = 0;
        startTimer();
    }
}

let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"min "+second+"secs";
        second++;
        if(second === 60){
            minute++;
            second=0;
        }
        if(minute === 60){
            minute = 0;
        }
    },1000);
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    let finalTime;
    if (matchedCard.length === 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves.toString;
        document.getElementById("totalTime").innerHTML = finalTime;

        //close icon on modal
        closeModal();
    }
}


// @description close icon on modal
function closeModal(){
    closing.addEventListener("click", function(){
        modal.classList.remove("show");
        startGame();
    });
}


// @description for user to play Again
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
}
