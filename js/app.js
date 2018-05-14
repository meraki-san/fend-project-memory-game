// Variables
// All cards
var deck = $(".deck");
// Single card
var card = $(".card");
// Create a list from card
var cards = jQuery.makeArray(card);
// Array of opened cards
var openedCards = [];

function displayCards() {
  $(card).click(function() {
    $(this).toggleClass("open");
    $(this).toggleClass("show");
    $(this).toggleClass("avoid-clicks");
  });
};

function openCards() {
  $(card).click(function() {
    openedCards.push(this);
    if (openedCards.length === 2) {
      if ($(openedCards[0]).children().attr("class") === $(openedCards[1]).children().attr("class")) {
        matched();
      } else {
        unmatched();
      };
    };
  });
};

function matched() {
  $(openedCards[0]).addClass("match").removeClass("open show");
  $(openedCards[1]).addClass("match").removeClass("open show");
  openedCards = [];
}

function unmatched() {
  setTimeout(function() {
    $(openedCards[0]).removeClass("open show avoid-clicks");
    $(openedCards[1]).removeClass("open show avoid-clicks");
    openedCards = [];
  }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
