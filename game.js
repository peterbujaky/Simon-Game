const audio = new Audio();
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();
const buttons = $(".btn").get();
let userClickedPattern = new Array();
let firstKeyPress = true;
let level = 0;
let started = false;
let nextSequenceInProgress = false;
const isMobile = window.matchMedia("(max-width: 767px)").matches;

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

// STARTING A NEW GAME

function startOver() {
    gamePattern = [];
    $("h1").text('Level 1');
    setTimeout(() => {
        nextSequence()
    }, 1000);
    started = true;
}

$(document).keydown((e) => {
    if (firstKeyPress) {
        nextSequence();
        firstKeyPress = false;
    }

    $("h1").text(`Level ${level}`);
})


// NEXT ROUND
function nextSequence() {

    if (nextSequenceInProgress) {
        return;
    }

    nextSequenceInProgress = true;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    flashEffect(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`)
    userClickedPattern = [];

    nextSequenceInProgress = false;
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
            level = 0;
            $(document).keydown(() => {
                startOver();
            })
        }


    });
});

if (isMobile) {

    $("h1").text("Touch The Scren To Start");

    // CHECK ANSWER FUNCTION 

    $(document).on("touchstart", ((e) => {
        if (firstKeyPress) {
            nextSequence();
            firstKeyPress = false;
        }

        $("h1").text(`Level ${level}`);
    }))


    // NEXT ROUND
    function nextSequence() {

        if (nextSequenceInProgress) {
            return;
        }

        nextSequenceInProgress = true;

        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        flashEffect(randomChosenColor);
        level++;
        $("h1").text(`Level ${level}`)
        userClickedPattern = [];

        nextSequenceInProgress = false;
    }




    buttons.forEach(item => {
        item.addEventListener("touchstart", (e) => {

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
                $("h1").text("Game Over, Touch the Screen to Start");
                $("body").addClass("game-over");
                setTimeout(() => {
                    $("body").removeClass("game-over")
                }, 200)
                audio.src = "sounds/wrong.mp3";
                audio.play();
                level = 0;
                $(document).on.apply("touchsart", (() => {
                    startOver();
                }))
            }


        });
    });

}