const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();
const audio = new Audio();
const buttons = $(".btn").get();
const userClickedPattern = new Array();
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
    buttons.forEach(item => {
        item.addEventListener("click", (e) => {
            $(e.target).addClass("pressed");
            setTimeout(() => {
                $(e.target).removeClass("pressed");
            }, 100)
        })
    })
}



// CHECK ANSWER FUNCTION 

function checkAnswer(currentLevel) {
    return gamePattern.every((value, index) => value === userClickedPattern[index]);
}

// NEXT ROUND
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    flashEffect(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);

}

$(document).keydown((e) => {
    if (firstKeyPress) {
        nextSequence();
        firstKeyPress = false;
    }

    $("h1").text(`Level ${level}`);
})


buttons.forEach(item => {
    item.addEventListener("click", (e) => {

        /* PRESS EFFECT */
        animatePress();

        /* RECOGNIZES THE BUTTON'S COLOR AND STORES IT IN A VARIABLE */
        let userChosenColor = $(e.target).attr('id');
        userClickedPattern.push(userChosenColor);

        /* PLAYS AUDIO */
        playSound(userChosenColor);

        checkAnswer();

        let isMatch = checkAnswer(level);
        if (isMatch) {
          setTimeout(() => {
            nextSequence()
          }, 1000);
        }
      });
    });
