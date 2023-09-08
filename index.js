var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var started=false;

var level=0;

$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence() {
    
    userClickedPattern=[];

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).delay(100).fadeOut().fadeIn();

    playSound(randomChosenColor);

    ++level;
    $("h1").text("Level "+level);
}

$(".btn").click(function () {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function playSound(name){
    var audio =new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {

        $("#"+currentColor).addClass("pressed");

        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed")
        }, 100);
    }
   
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if(userClickedPattern.length===gamePattern.length){
           
            setTimeout(function() {
            nextSequence(); 
            },1000);
           
        }
        else{
           
        }
    } else {
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over , Press Any Key to Restart");
        startOver();
    } 
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}