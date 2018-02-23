//Global declaration
var canvas = document.querySelector('canvas');
var pen = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//Add onresize event listener to resize the canvas with the wondow
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
//override the mouse class
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}
//Add a color palette as array
var colorArray = [
    "#FFBC67",
    "#DA727E",
    "#AC6C82",
    "#685C79",
    "#455C7B",
];
//Add event listener that trigger onmousemove
window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
//Add event listener that trigger onresize
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //Reset our draw
    init();
})
//Utility
function randomInt(min,max){
    return Math.random() * (max - min + 1 ) + min;
}
function randomColor(color){
    return color[Math.floor(Math.random() * color.length)];
}
//Create a shape
function Circle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    //Update the shape
    this.update = function() {
        this.draw();
    }
    //Draw a shape
    this.draw = function(){
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.fillStyle = this.color;
        pen.fill();
        pen.closePath();
    }
}
//Create new array of shape
function init(){
}
//Animate the circle
function animate(){
    requestAnimationFrame(animate);
    //Clear the sketch for every new shape
    pen.clearRect(0, 0, innerWidth, innerHeight);
    pen.fillText("HTML CANVAS", mouse.x, mouse.y);
}
init();
animate();
