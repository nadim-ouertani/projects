var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

var nodesC = 120;
var nodes = [];
var maxDist = 120;

init();
update();

function init(){
    for (var i = 0; i < nodesC; i++){
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < nodesC; i++) {
        var node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if(node.x > canvas.width) {
            node.x = 0;
        }
        else if(node.x < 0) {
            node.x = canvas.width;
        }
        if(node.y > canvas.height) {
            node.y = 0;
        }
        else if(node.y < 0) {
            node.y = canvas.height;
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    for(var i = 0; i < nodes.length - 1; i++) {
        var nodeA = nodes[i];
        for(var j = i + 1; j < nodes.length; j++) {
            var nodeB = nodes[j];
            var dx = nodeB.x - nodeA.x,
                dy = nodeB.y - nodeA.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < maxDist) {
                ctx.lineWidth = 1 - dist / maxDist;
                ctx.beginPath();
                ctx.moveTo(nodeA.x, nodeA.y);
                ctx.lineTo(nodeB.x, nodeB.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(update);
}

window.addEventListener("resize", function(e){
    canvas.width = this.window.innerWidth;
    canvas.height = this.window.innerHeight;
});
