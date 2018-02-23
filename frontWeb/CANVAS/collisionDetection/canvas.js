//Setup
var canvas = document.querySelector('canvas');
var pen = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//Add onresize event listener to resize the canvas with the wondow
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
//Variables
var mouse = {
    x: canvas.width/2 ,
    y: canvas.height/2
}
//Add a color palette as array
var colorArray = [
    "#C42045",
    "#297FCA",
    "#E5A275",
];
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
//Utility
function randomInt(min,max){
    return Math.random() * (max - min + 1 ) + min;
}
function randomColor(color){
    return color[Math.floor(Math.random() * color.length)];
}
function getDistence(x1, y1, x2, y2){
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
//Create a shape
function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    //Update the shape
    this.update = function(particales) {
        this.draw();
        for(var i = 0 ; i < particales.length ; i++){
            if(this === particales[i]) continue;
            if(getDistence(this.x, this.y, particales[i].x, 
                particales[i].y) - this.radius * 2< 0){
                    resolveCollision(this, particales[i]);
                }
                if(this.x - this.radius <= 0 || this.x + this.radius
                >= innerWidth){
                    this.velocity.x = -this.velocity.x;
                }
            }
                
        if(this.y - this.radius <= 0 || this.y + this.radius
            >= innerHeight){
                this.velocity.y = -this.velocity.y;
            }
        //Mouse collision detection 
        if(getDistence(mouse.x, mouse.y, this.x, this.y) < 120 
    && this.opacity < 0.2){
            this.opacity += 0.02;
        }else if (this.opacity > 0){
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    //Draw a shape
    this.draw = function(){
        pen.beginPath();
        pen.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        pen.save();
        pen.globalAlpha = this.opacity;
        pen.fillStyle = this.color;
        pen.fill();
        pen.restore();
        pen.strokeStyle = this.color;
        pen.stroke();
        pen.closePath();
    }
}
//Implementation
var particleArray = [];
function init(){
    particleArray = [];
    for (var i=0 ; i<140 ; i++){
        const radius = 14;
        var x = randomInt(radius, canvas.width - radius);
        var y = randomInt(radius, canvas.height - radius);
        const color = randomColor(colorArray);

    if (i !== 0){
        for(j = 0; j < particleArray.length; j++){
            if(getDistence(x, y, particleArray[j].x, 
                particleArray[j].y) - radius * 2< 0){
                    x = randomInt(radius, canvas.width - radius);
                    y = randomInt(radius, canvas.height - radius);
                    j= -1;
                }
        }
    }
    particleArray.push(new Particle(x, y, radius, color));
    }
}
//Animate the shape
function animate(){
    requestAnimationFrame(animate);
    //Clear the sketch for every new shape
    pen.clearRect(0, 0, innerWidth, innerHeight);
    // pen.fillText("HTML CANVAS", mouse.x, mouse.y);
    for (var i=0; i<particleArray.length;i++){
        particleArray[i].update(particleArray);
    }
}
init();
animate();
