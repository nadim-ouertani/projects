/* Author : Nadim OUERTANI
   create console with javascript html css
*/

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost/jsapp');
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

//When connection close
socket.addEventListener('close',function(event){
    console.log(event);
});

socket.addEventListener('error', function(event) {
    console.log(event);
});
