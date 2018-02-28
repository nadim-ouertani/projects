//Setup
var fcard, bcard;
fcard = document.querySelector('.front');
bcard = document.querySelector('.back');

//trigger on click
fcard.addEventListener('click', function() {
    window.location.href = 'frontWeb';
});
bcard.addEventListener('click', function() {
    window.location.href = '#';
});