var bBox = document.getElementsByClassName("big-box")[0],
    box = document.getElementsByClassName("box")[0],
    hello = document.getElementsByClassName("hello")[0],
    canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");

//Resizing the body
bBox.style.width = window.innerWidth + "px";
bBox.style.height = window.innerHeight + "px";

//Resizing the box
box.style.width = bBox.clientWidth - 48 + "px";
box.style.height = (bBox.clientHeight - hello.clientHeight) - 24 + "px";

//Init canvas
canvas.width = box.clientWidth;
canvas.height = box.clientHeight;

window.addEventListener("resize", function(e){
    bBox.style.width = this.window.innerWidth + "px";
    bBox.style.height = this.window.innerHeight + "px";

    box.style.width = bBox.clientWidth - 48 + "px";
    box.style.height = (bBox.clientHeight - hello.clientHeight) - 24 + "px";

    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;
    
});