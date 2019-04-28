// Let's start by grabbing a reference to the <span> below.
var userText = [];
var wrongGuess = [];
var lives = 10;
var wins = 0;
var hint = false;
var losses = 0;
var secret = [];
var allpass = ["123123", "123456", "654321", "!@#$%", "1qaz2wsx", "aa123456", "abc123", "access", "admin", "ashley", "azerty", "bailey", "baseball", "batman", "charlie", "donald", "dragon", "flower", "football", "freedom", "hello", "hottie", "iloveyou", "jesus", "letmein", "login", "loveme", "master", "michael", "monkey", "mustang", "ninja", "passw0rd", "password", "password1", "princess", "qazwsx", "qwerty", "qwerty123", "qwertyuiop", "shadow", "solo", "starwars", "sunshine", "superman", "trustno1", "welcome", "whatever", "zaq1zaq1", "hangman", "costa"]
// var allpass = ["qwertuiopasd"]
var allowedchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "&", "?"]

//choose at random
randompass = allpass[Math.floor(Math.random() * allpass.length)]
console.log(randompass);

for (var i = 0; i < randompass.length; i++) {
    secret.push('*');
}
// console.log(secret);
document.getElementById("pass_hidden").textContent = secret.join('|');

//create button
for (var i = 0; i < allowedchars.length; i++) {
    var button = document.createElement("button");
    button.innerHTML = allowedchars[i];
    button.setAttribute('onclick', 'clickme("' + allowedchars[i] + '")');
    button.classList.add("letter");
    button.id = "letter_" + allowedchars[i];
    document.getElementById('buttons').appendChild(button);
}


// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
    if(secret.indexOf("*")>-1){
    userText = event.key;
    if (allowedchars.indexOf(userText) > -1 && lives > 0) {
        clickme(userText);
    }
}}

//this is where user can get help...

function hintme() {
    hint=true;
    reveal = secret.indexOf('*');
    if(reveal>-1){
    clickme(randompass[reveal]);
    }
    hint=false;
    return true;
}


//this is the main logic
function clickme(userText) {

    if (randompass.indexOf(userText) > -1) {
        for (var i = 0; i < randompass.length; i++) {
            if (randompass[i] === userText) {
                secret[i] = userText;
                document.getElementById("pass_hidden").textContent = secret.join('|');
            }
        }

    }

    else {

        if (wrongGuess.indexOf(userText) == -1 && lives > 0) {
            wrongGuess.push(userText);
            lives--;
        }
        // document.getElementById("user-text").textContent = wrongGuess.join(', ');
        document.getElementById("lives").textContent = lives;

    }
    //I need to add a logic to disable a button
    document.getElementById('letter_' + userText).setAttribute("disabled", 'disabled');

    //check if win or lose
    if(secret.indexOf("*")==-1 && lives > 0){
        wins++;
        for (var i = 0; i < allowedchars.length; i++) {
            document.getElementById('letter_' + allowedchars[i]).setAttribute("disabled", 'disabled');
        }
    }
    if(lives == 0 && secret.indexOf("*")>-1 && hint == false){
        losses++;
        for (var i = 0; i < allowedchars.length; i++) {
            document.getElementById('letter_' + allowedchars[i]).setAttribute("disabled", 'disabled');
        }
    }
    console.log(wins,losses);
    //

    return true;
}

function playAgain(){
    wrongGuess = [""];
    lives = 10;
    randompass = allpass[Math.floor(Math.random() * allpass.length)];
    console.log(randompass);
    secret=[];
    for (var i = 0; i < randompass.length; i++) {
        secret.push('*');
    }
    document.getElementById("pass_hidden").textContent = secret.join('|');
    for (var i = 0; i < allowedchars.length; i++) {
        document.getElementById('letter_' + allowedchars[i]).removeAttribute("disabled");
    }
    document.getElementById("lives").textContent = lives;
}
