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
//Create new class circle to create and animate a circle
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    //Draw a circle
    this.draw = function(){
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.strokeStyle = 'rbg(255,0,0)';
        pen.stroke();
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
        this.draw();
    }
}
//Create new array of circle
var circleArray = [];
for (var i = 0; i < 300 ; i++){
    var radius = 40;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius *2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    //Push circle to each array
    circleArray.push(new Circle(x, y, dx , dy ,radius));
}
console.log(circleArray);
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
animate();
