// UI
var button = $('#jquery-demo .counting-button');
var clickCountText = $('#jquery-demo .click-count');

// state
var numberOfClicks = 0;
var tooManyClicks = false;

// update the UI based on the state
function updateUI() {
  clickCountText.text(numberOfClicks);
  button.toggleClass('warning', tooManyClicks);
}

// update the model based on interactions
button.click(function() {
  numberOfClicks ++;
  tooManyClicks = numberOfClicks > 5;
  updateUI();
});

updateUI();
