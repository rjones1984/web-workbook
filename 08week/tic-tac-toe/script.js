$(document).ready (function runGame () {
  'use strict';

var player = 1;
// this variable counts clicks on the board, once 9 are reached without a winner, a tie is delcared
var count = 0;
 // this is the function that places an x or o on the board
 // each time a box (div with 'data-cell' attr) is clicked, the player changes
function playerClick() {

$('div').click(function () {
  var cell = $(this);

  if (cell.attr('data-cell') && (!$(this).hasClass('X-taken')) && cell.attr('data-cell') && (!$(this).hasClass('O-taken')) ) {
    if (player === 1) {
      cell.addClass('X-taken');
      player = 2;
      count++;
    } else {
      cell.addClass('O-taken');
      cell.removeClass('X-taken');
      player = 1;
      count++;
    }
    checkForWin();
    // the code below enables a win by player X
  }
});
}

// i am having hella trouble getting this function to work at all, mainly the .each function seems to keep coming up undefined.
function checkForWin() {
var wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var playersMarker = player === 1 ? 'X' : 'O'; // dynamic based on user's turn


var all = $('.board', 'div ') + playersMarker;

var coords = []; // create array that keeps track of X and O coordinates
  console.log(coords);

$(all).each(function(i) {
  coords.push(Number($(this).attr('data-cell')));

 });
}



// the code below resets the game
function resetGame() {
  $('button').click(function () {
      var reset = $('.X-taken, .O-taken');
      reset.removeClass();
      var announce = $('#announce-winner');
      announce.text('');
      player = 1;
      count = 0;
  });
}
// the code below announces a winner by addig text to the div with id "announce winner"
function xWinner() {
  var announce = $('#announce-winner');
  return announce.text('Lawrence did a win!');
}
function oWinner() {
  var announce = $('#announce-winner');
  return announce.text('Sheena prevailed upon Lawrence!');
}
function noWinner() {
  var announce = $('#announce-winner');
  return announce.text('No winner...PRESS RESET NOW!');
}
// function calls are down here
resetGame();
playerClick();
// closing parenthesis of main function  hj
});
