var canvas = document.querySelector("canvas");
var pen = canvas.getContext("2d");
canvas.width = 205,
    canvas.height = 205;

for (var i = 0; i < 200; i += 20){
    for (var j = 0; j < 200; j += 20){
        pen.fillStyle = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
        pen.fillRect(i, j, 20, 20);
    }
}

var imgData = pen.getImageData(0, 0, 200, 200);

canvas.addEventListener("mousemove", function(e){
    var color = getPixel(e.clientX, e.clientY);
    document.body.style.backgroundColor = color;
});

function getPixel(x, y){
    var color = "";
    console.log("x " + x + " , " + " y " + y +  " width & height : " + imgData.width + " , " + imgData.height);
    if (x >= imgData.width || y >= imgData.height){
        color = "rgba(255, 255, 255, 0.5)";
    }else{
    var index = (y * imgData.width + x) * 4,
        red = imgData.data[index],
        green = imgData.data[index + 1],
        blue = imgData.data[index + 2],
        alpha = imgData.data[index + 3] / 255;
    color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    }
    return color;
}