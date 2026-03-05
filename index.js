var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

//$(document).on("keypress",nextSequence);

$('button').on("click",function (event) {
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    soundPlay(userChosenColor);  
    animateButton(userChosenColor); 
    checkSequence(level);
    console.log(userClickedPattern);
  });

$(document).on("keypress",function(){
    nextSequence(); 
});

function checkSequence(currentLevel){
    var indx=userClickedPattern.length;
    if(userClickedPattern[indx-1]===gamePattern[indx-1]){
        if(indx===currentLevel){
            setTimeout(nextSequence,1000);
            userClickedPattern=[];

        }
        console.log("success");
    }else{
        resetGame();
    
        $('body').addClass("game-over");

        var audio= new Audio("./sounds/wrong.mp3");
        audio.play();

        setTimeout(function(){
           $('body').removeClass("game-over"); 
        },200);
        $('.info').text("Game Over, Press Any Key to Restart");
        
        console.log("false");
    }

}

function nextSequence(){
    var indx=Math.floor(Math.random()*4);
    value=buttonColors[indx];
    gamePattern.push(value);
    soundPlay(value);
    $("."+buttonColors[indx]).fadeOut(100).fadeIn(100);
    level++;
    $('.info').text("Level " + level);
}

function soundPlay(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animateButton(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100); 
}

function resetGame(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}
