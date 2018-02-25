//Setup
var box = document.querySelector('.box');
var wWidth = innerWidth;
var wHeight = innerHeight;
var width = box.offsetWidth;
var height = box.offsetHeight;

//Get the center of the element
var centerWidth = ((wWidth / 2) - (width / 2));
var centerHeight = ((wHeight / 2) - (height / 2));

//Centring element with css
box.style.left = centerWidth + 'px';
box.style.top = centerHeight + 'px';

//on resize
window.addEventListener('resize', function() {
    repos();
});

//Init function to resize the box
function repos(){
    wWidth = innerWidth;
    wHeight = innerHeight;
    width = box.offsetWidth;
    height = box.offsetHeight;
    centerWidth = ((wWidth / 2) - (width / 2));
    centerHeight = ((wHeight / 2) - (height / 2));
    box.style.left = centerWidth + 'px';
    box.style.top = centerHeight + 'px';
}