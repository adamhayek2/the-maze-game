let text = document.getElementById('text');
let treeLeft = document.getElementById('tree-left');
let treeRight = document.getElementById('tree-right');
let gateLeft = document.getElementById('gate-left');
let gateRight = document.getElementById('gate-right');


window.addEventListener('scroll', () =>{
    let value = window.scrollY;
    var fontSize = 48 - value / 10;
    text.style.fontSize = fontSize + 'px';
    var leftOffset = value / -5;
    text.style.left =  50 + leftOffset + '%';





    treeLeft.style.left = value * -1.5 + 'px';
    treeRight.style.left = value * 1.5 + 'px';
    gateLeft.style.left = value * 1.8+ 'px';
    // gateRight.style.left = value * -0.5 + 'px';
})


var content = document.getElementById('text');
// var parallaxContainer = document.getElementById('parallax');
var maxScroll = parallaxContainer.offsetTop;

window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Reduce font size based on scroll position
  var fontSize = 48 - scrollTop / 10; // Adjust the division factor to control the rate of font size reduction
  content.style.fontSize = fontSize + 'px';

  // Move content to the top left corner based on scroll position
  var leftOffset = -scrollTop / 5; // Adjust the division factor to control the rate of horizontal movement

  // Limit the left offset to stop at the corner
  if (leftOffset < 0) {
    leftOffset = Math.max(leftOffset, -maxScroll / 5); // Adjust the division factor to control the rate of horizontal movement
  }

  content.style.left = 50 + leftOffset + '%';
});
