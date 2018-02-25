// **************CANVAS****************** // 
//Setup
var canvas = document.querySelector('canvas');
var pen = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
//Add a color palette as array
var colorArray = [
    "#FFBC67",
    "#DA727E",
    "#46B29D",
    "#F53855",
    "#E37B40"
];
//Event listener
//Add event listener that trigger onmousemove
window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
//Add event listener that trigger onresize
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //Reset our draw
    init();
});
//Utility
function randomInt(min,max){
    return Math.random() * (max - min + 1 ) + min;
}
function randomColor(color){
    return color[Math.floor(Math.random() * color.length)];
}
// function randomShape(shape){
//     return shape[Math.floor(Math.random() * shape.length)]
// }
//Create a shape
function Shape(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.opacity = randomInt(0, 0.03);
    //Update the shape
    this.update = function() {
        this.draw();
        if(this.y - radius * 2 > innerHeight){
            this.y = -this.dy;
        }
        if(this.x - radius * 2 > innerWidth){
            this.x = -this.dx;
            }
        this.x += this.dx;
        this.y += this.dy;
        if (this.opacity >= 0.6){
            this.opacity -= 0.01;
        }else{
            this.opacity += 0.01;
        }
    };
    //Draw a shape
    this.draw = function(){
        pen.beginPath();
        pen.save();
        pen.globalAlpha = this.opacity;
        // pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.rect(this.x, this.y, this.radius, this.radius);
        pen.fillStyle = this.color;
        pen.fill();
        pen.restore();
        pen.closePath();
    }
}
//Implementation
var shapes = [];
function init(){
    shapes = [];
    for(var i = 0 ; i < 400; i++){
        var color = randomColor(colorArray);
        var radius = randomInt(4 ,9);
        var x = randomInt(0+radius, innerWidth - radius);
        var y = randomInt(0+radius, innerHeight - radius);
        shapes.push(new Shape(x, y, randomInt(0.2, 0.6), 
        randomInt(0.1, 0.5), radius, color));
    }
}
//Animation
function animate(){
    requestAnimationFrame(animate);
    //Clear the sketch for every new shape
    pen.clearRect(0, 0, innerWidth, innerHeight);
    // pen.fillText("HTML CANVAS", mouse.x, mouse.y);
    for (var i = 0 ; i < shapes.length ; i++){
        shapes[i].update();
    }
}
init();
animate();
