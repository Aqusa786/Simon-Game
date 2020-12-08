var gamePattern=[];
var buttonColours=["red","blue","green", "yellow"];
var userClickedPattern=[];
var levelNumber= 0;
var started= false;
$(document).on("keydown", function()
{
  if(!started)
  {
var level=$("h1").text("level "+levelNumber);
nextSequence();
started= true;
}
});

$(".btn").click(function()
{
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
 playSound(userChoosenColour);
 animatePress(userChoosenColour);
 checkAnswer(userClickedPattern[userClickedPattern.length-1]);
  });


function nextSequence()
{
  userClickedPattern=[];
  randomNumber=Math.floor(Math.random()*4);
var randomChoosenColours= buttonColours[randomNumber];
gamePattern.push(randomChoosenColours);
$("#"+randomChoosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChoosenColours);
animatePress(randomChoosenColours);
levelNumber=levelNumber+1;
 level=$("h1").text("level "+levelNumber);
}

function playSound(name)
{
  var sound= new Audio("sounds/"+ name +".mp3");
  sound.play();
}

function animatePress(currentColour)
{
  $("."+ currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+ currentColour).removeClass("pressed");
  },100);
};
function checkAnswer(currentLevel){
  if(gamePattern[userClickedPattern.length-1]===currentLevel){
    if(gamePattern.length===userClickedPattern.length){
    setTimeout(function(){
    nextSequence();
  },1000);}
  }

  else{
  var sound= new Audio("sounds/wrong.mp3");
  sound.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
},200);
level=$("h1").text("Game Over, Press Any Key to Restart");
startOver();
}
}
function startOver(){
  levelNumber=0;
  started=false;
  gamePattern=[];
}
