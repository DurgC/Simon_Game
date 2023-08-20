var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

var buttonColours = ["red","blue","green","yellow"];

function nextSequence()
{
    var randomNumber=Math.floor(Math.random() * 4);
    var choosenColor=buttonColours[randomNumber];
    $("#"+choosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(choosenColor);
    level+=1;
    $("h1").text("Level "+level);
}

$(".btn").click(function(){
    var userChoosenColor= this.id;
    userClickedPattern.push(userChoosenColor);
    checkAnswer();
    playSound(userChoosenColor);
    animatePressed(userChoosenColor);
});

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePressed(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(hold,100);
  function hold()
  {
    $("#"+currentColor).removeClass("pressed");
  }
}

$(document).keypress(function(event){
    if(!started)
    {
    nextSequence();
    started=true;
    }
})

function checkAnswer()
{
   var count=0;

  for(var i=0; i<level; i++)
  {
    if(gamePattern[i]===userClickedPattern[i]) count+=1;
  }

   if(count==level) 
   {
    nextSequence();
   }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(hold,200);
    function hold()
    {
      $("body").removeClass("game-over");
    }
      $("h1").text("Game Over!");
      startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    $("h1").text("Press A Key to Start");
    started=false;
}

