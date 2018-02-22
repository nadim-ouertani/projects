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
    x: undefined,
    y: undefined
}
//Max radius
var maxRadius = 50;
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
    mouse.x = event.x;
    mouse.y = event.y;
})
//Add event listener that trigger onresize
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //Reset our draw
    init();
})
//Create new class circle to create and animate a circle
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * 
        colorArray.length)]
    //Draw a circle
    this.draw = function(){
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.fillStyle = this.color;
        pen.fill();
    }
    //Update the circle to bounce when reach the eadges
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - radius <0){
            this.dy = -this.dy;
        }
        this.x+= this.dx;
        this.y+= this.dy;
        //Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
        mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}
//Create new array of circle
var circleArray = [];
function init(){
    circleArray = [];
    for (var i = 0; i < 1200 ; i++){
        var radius = Math.random() * 4 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius *2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        //Push circle to each array
        circleArray.push(new Circle(x, y, dx , dy ,radius));
    }
}
//Animate the circle
function animate(){
    requestAnimationFrame(animate);
    //Clear the sketch for every new circle
    pen.clearRect(0, 0, innerWidth, innerHeight);
    //Draw and animate each circle inside the array list
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
init();
animate();
