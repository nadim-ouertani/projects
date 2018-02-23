//Setup
var canvas = document.querySelector('canvas');
var pen = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}
//Add a color palette as array
var colorArray = [
    "#17468A",
    "#4C8DCA",
    "#78E5EB",
    "#F5F0F2",
    "#E12D53",
];
//Add a gravity
var gravity = 1;
//Add fraction
var f = 0.60;
//Event listener
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
window.addEventListener('click', function(){
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
function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    //Update the shape
    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * f;
        }else{
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width
        || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    //Draw a shape
    this.draw = function(){
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.fillStyle = this.color;
        pen.fill();
        //pen.stroke();
        pen.closePath();
    }
}
//Implementation
var ballArray = [];
function init(){
    ballArray = [];
    for(var i=0; i < 300; i++){
        //Random var
        var radius = randomInt(7,30);
        var x = randomInt(radius, canvas.width - radius);
        var y = randomInt(0, canvas.height);
        var dx = randomInt(-2, 2);
        var dy = randomInt(-2, 2);
        var color = randomColor(colorArray);
        //Push to the ARRAY
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}
//Animattion loop
function animate(){
    requestAnimationFrame(animate);
    //Clear the sketch for every new shape
    pen.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0; i < ballArray.length; i++){
        ballArray[i].update();
    }   
    // pen.fillText("HTML CANVAS", mouse.x, mouse.y);
}
init();
animate();
