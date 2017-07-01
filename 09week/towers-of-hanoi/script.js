
$(document).ready(function() {
  'use strict';

  // code plan follows:


// we want the the top ring in the stack to be the only moveable one
  var block = $('[data-block]');
  var stack = $('[data-stack]');
  var moveable = $('[data-block]:first-child');
  moveable = moveable.addClass('moveable');
  var clickMoves = 0;

function howToPlay() {
  $('.rules').hide();

  $('.rules-button').click(function() {
    $('.rules').slideToggle(150);
  });

}

howToPlay();

// the function below add 1 to the move counter
function countMove() {
  clickMoves++;
  $('.movecount').text('Numero de movimientos: ' + clickMoves);
}

// this code makes objects draggable
function makeDraggable() {

    moveable.draggable({
      revert: 'invalid',
      helper:"clone",
      containment:"document",
  });
}

// make div "stack" with class tower accept draggable elements

  function makeDroppable(){


    stack.droppable({
      accept: $(".moveable"),
      drop:function(event, ui) {
        var tower = $(this);
// the code below references a function that assesses the values of the draggable elements
        var canDrop = checkForDroppability(ui.draggable[0], tower);
        if (canDrop === true) {
          //stop.
// if the values are correct (see function comments) allow the ring to be dropped in the stack
        ui.draggable.detach().prependTo(tower);
        countMove();
        resetMoveable ();

      } else {
        console.log('bananas');
      }
    }
  });
}
makeDraggable();
makeDroppable();

// check for droppability, check to see if size is smaller than first in stack
function checkForDroppability(disk, tower) {
  var towerDisks = $(tower).children();
// elegibility for drop: if the data-block value is less than that of the value of the disk in the top of the stack, allow the draggable object to be dropped
	if (towerDisks.length === 0 || parseInt($(disk).attr('data-block')) <= parseInt(towerDisks.last().attr('data-block'))) { // dropping disk is smaller than top disk
		return true;
	} else
	return false;
}


// reset the first ring in a stack to draggable
function resetMoveable() {
  moveable = $('[data-block]:first-child');
  moveable.addClass('moveable');
  makeDraggable();
  makeDroppable();
}

// clear the board and moves=0
function resetGame() {
    $('.reset-button').click(function() {
    clickMoves = 0;
    $('.movecount').text('Numero de movimientos: ' + clickMoves);
    block.prependTo('.home-stack');
    $(".tower").children().each(function(i) {

    if(i!==0){ // check the first index and add
      $(this).removeClass("moveable" + (i+1));
    }
  });

  });
}

resetGame();

  // without putting a smaller ring on top of a larger one
  // make sure when an element is dragged, it appends to new div, becoming first-child
  // this code changes the first child to current top item
  // when the game has been won delcare a winner
  // after winner declared allow reset button to be clicked

});
