var canvas = document.querySelector('canvas');
var pen = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

var x = 200;
var dx = 6;
var radius = 40;
function animate(){
    requestAnimationFrame(animate);
    //Create circle
    pen.clearRect(0, 0, innerWidth, innerHeight);
    pen.beginPath();
    pen.arc(x, 200, radius, 0, Math.PI * 2, false);
    pen.strokeStyle = 'rbg(255,0,0)';
    pen.stroke();
    if (x + radius > innerWidth || x - radius < 0){
        dx = -dx;
    }
    x+= dx;
}

animate();
