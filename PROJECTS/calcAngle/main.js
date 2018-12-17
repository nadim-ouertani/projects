var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var p0 = {
    x: 200,
    y: 400
};

var p1 = {
    x: 250,
    y: 200
};

var p2 = {
    x: 350,
    y: 150
};

function vec(p0, p1) {
    return {
        x: p1.x - p0.x,
        y: p1.y - p0.y
    };
}

function dotProduct(v0, v1) {
    return v0.x * v1.x + v0.y * v1.y;
}

function mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalize(v) {
    var m = mag(v);
    return {
        x: v.x / m,
        y: v.y / m
    };
}

function angleBetween(v0, v1) {
    return Math.acos((v0.x * v1.x + v0.y * v1.y) / Math.sqrt(v0.x * v0.x + v0.y * v0.y) / Math.sqrt(v1.x * v1.x + v1.y * v1.y));
}

draw();

function draw() {
    context.clearRect(0, 0, 600, 600);
    drawPoint(p0);
    drawPoint(p1);
    drawPoint(p2);
    drawLines();

    var v0 = vec(p1, p0),
        v1 = vec(p2, p0),
        angle = angleBetween(v0, v1);
    angle = Math.round(angle * 180 / Math.PI);
    context.font = "30px Arial";
    context.fillText(angle, 30, 30);

}

function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, 10, 0, Math.PI * 2);
    context.stroke();
}

function drawLines() {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p0.x, p0.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
}

canvas.addEventListener("mousedown", onMouseDown);
var dragPoint;

function onMouseDown(event) {
    dragPoint = findDragPoint(event.clientX, event.clientY);
    if(dragPoint) {
        dragPoint.x = event.clientX;
        dragPoint.y = event.clientY;
        draw();
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    dragPoint.x = event.clientX;
    dragPoint.y = event.clientY;
    draw();
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

function findDragPoint(x, y) {
    if(hitTest(p0, x, y)) return p0;
    if(hitTest(p1, x, y)) return p1;
    if(hitTest(p2, x, y)) return p2;
    return null;
}

function hitTest(p, x, y) {
    var dx = p.x - x,
        dy = p.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= 10;
}
