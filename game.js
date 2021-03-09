$(document).ready(function() {
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = []; // Array of computer's choice
    var userClickedPattern = []; // Array of user's choice
    var started = false; // boolean
    var level = 0;

    function nextSequence() {
        $("h1").text("Level " + level);
        level++;
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        console.log(gamePattern);

        // Select button(div) and make it flash 
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        // Play sound
        var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
        audio.play();
    }

    // Detech which div pressed
    $(".btn").on("click", function() {
        userChosenColour = this.id; //Get the id of clicked div
        userClickedPattern.push(userChosenColour); //Put user choice into array at end
        // console.log(userClickedPattern);
        // Play sound accroding to the button clicked
        playSound(userChosenColour);
        animatePress(userChosenColour);
        // console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    });

    //Function to play sound
    function playSound(name) {
        // Play sound
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Animation
    function animatePress(currentColour) {
        $("." + currentColour).addClass("pressed");
        setTimeout(function() {
            $("." + currentColour).removeClass("pressed");
        }, 100);
    }

    if (!started) {
        $(document).on("keypress", function() {
            nextSequence();
            started = true;
        });
    }

    // Check 
    function checkAnswer(currentLevel) {
        // If user match computer sequence then this block executes
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            // console.log("S");
            if (userClickedPattern.length === gamePattern.length) {
                //5. Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function() {
                    nextSequence();
                    userClickedPattern.length = 0;
                }, 1000);
            }
        } else {
            // console.log("F");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    // Restart
    function startOver() {
        level = 0;
        gamePattern = [];
        started = true;
        userClickedPattern = [];
    }
});