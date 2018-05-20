// Variables
// All cards
var deck = $(".deck");
// Single card
var card = $(".card");
// Create a list from card
var cards = jQuery.makeArray(card);
// Player moves
var moves = 0;
// Rating stars
var stars = $(".stars").html();
// Array of opened cards
var openedCards = [];
// Array of matched cards
var matchedCards = [];
// Seconds
var seconds = $("#seconds").html();
// Minutes
var minutes = $("#minutes").html();
// Symbols Array
var symbols = [
  "diamond", "diamond", "paper-plane-o", "paper-plane-o",
  "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf",
  "bicycle", "bicycle", "bomb", "bomb"
  ];

function createHTML() {
  symbols = shuffle(symbols);
  for (i = 0; i < symbols.length; i++) {
    $(".deck").append("<li class='card'><i class='fa fa-" + symbols[i] + "'></i></li>");;
  };
}

function removeHTML() {
  for (i = 0; i < symbols.length; i++) {
    $(".card").remove();
  };
}

function startGame() {
  createHTML();
  time();
  displayCards();
  openCards();
  restart();
};

function displayCards() {
  $(".card").click(function() {
    $(this).toggleClass("open");
    $(this).toggleClass("show");
  });
};

function openCards() {
  $(".card").click(function() {
    $(this).addClass("avoid-clicks");
    openedCards.push(this);
    if (openedCards.length === 2) {
      $(".moves").html(++moves);
      $(".card").addClass("avoid-clicks");
      if ($(openedCards[0]).children().attr("class") === $(openedCards[1]).children().attr("class")) {
        matched();
      } else {
        unmatched();
      };
      rating();
    };
    win();
  });
};

function matched() {
  $(openedCards[0]).addClass("match").removeClass("open show");
  $(openedCards[1]).addClass("match").removeClass("open show");
  matchedCards.push("openedCards[0]", "openedCards[1]");
  $(".card").removeClass("avoid-clicks");
  openedCards = [];
}

function unmatched() {
  setTimeout(function() {
    $(".card").removeClass("open show avoid-clicks");
    $(this).removeClass("avoid-clicks");
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

var interval;
var time =  function() {
  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  interval = setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
  }, 1000);
};

function rating() {
  if (moves === 15) {
    $(".stars li:last-child").remove();
  } else if (moves === 25) {
    $(".stars li:last-child").remove();
  }
};

function win() {
  if (matchedCards.length === 16) {
    clearInterval(interval);
    $("#myModal").show();
    $(".modal-body").html("<p>You made " + moves + " moves</p><p>in " + $("#minutes").html() + ":" + $("#seconds").html() + "</p><p id='rating'>Rating:</p>" + $(".stars").html());
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
  };
};

function restart() {
  $(".restart").click(function() {
    clearInterval(interval);
    $(".card").removeClass("match open show avoid-clicks");
    $(".moves").html(moves = 0);
    if ($(".stars").children().length === 2) {
      $(".stars").append("<li><i class='fa fa-star'></i></li>");
    } else if ($(".stars").children().length === 1) {
      $(".stars").append("<li><i class='fa fa-star'></i></li> <li><i class='fa fa-star'></i></li>")
    };
    if ($("#myModal").is(":visible")) {
      $("#myModal").hide();
    };
    matchedCards = [];
    removeHTML();
    startGame();
  });
};

$(document).ready(function() {
  startGame();
});


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
