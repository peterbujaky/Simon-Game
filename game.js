const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();
const audio = new Audio();
const buttons = $(".btn").get();
let userClickedPattern = new Array();
let firstKeyPress = true;
let level = 0;

/* FUNCTIONS */


// PLAYING THE SOUND ASSOCIATED WITH THE COLOR
function playSound(color) {
    audio.src = `sounds/${color}.mp3`
    audio.play();
}

// CREATING A FLASHING EFFECT
function flashEffect(color) {
    $(`#${color}`).fadeOut(50, function () {
        $(`#${color}`).fadeIn(50);
    });
}

// CREATING A PRESSED DOWN EFFECT

function animatePress(currentColor) {

    $(currentColor).addClass("pressed");
    setTimeout(() => {
        $(currentColor).removeClass("pressed");
    }, 100)
}



// CHECK ANSWER FUNCTION 

function checkAnswer(currentLevel) {

    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            {
                return false;
            }
        }
    }
    return true
}

function startOver() {
            gamePattern = [];
            $('h1').text($('h1').html());
                level = 0;      
            $("h1").text(`Level ${level}`);
            setTimeout(() => {
                nextSequence()
            }, 1000)
}




//&& userClickedPattern.every((value, index) => value !== gamePattern[index]))

$(document).keydown((e) => {
    if (firstKeyPress) {
        nextSequence();
        firstKeyPress = false;
    }

    $("h1").text(`Level ${level}`);
})


// NEXT ROUND
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    flashEffect(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);
    userClickedPattern = [];
}




buttons.forEach(item => {
    item.addEventListener("click", (e) => {

        /* PRESS EFFECT */
        animatePress(e.target);

        /* RECOGNIZES THE BUTTON'S COLOR AND STORES IT IN A VARIABLE */
        let userChosenColor = $(e.target).attr('id');
        userClickedPattern.push(userChosenColor);

        /* PLAYS AUDIO */
        playSound(userChosenColor);

        checkAnswer();

        let isMatch = checkAnswer(level);
        if (isMatch && userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
            userClickedPattern = [];
        } else if (!isMatch) {
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200)
            audio.src = "sounds/wrong.mp3";
            audio.play();
            $(document).keydown(() => {
                startOver();
            })
        }


    });
});
