var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var gap = 80;
var constant;
var bx = 10;
var by = 150;
var gravity = 1.5;
var score = 0;
var pipe = [];
var lost = false;

var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var woosh = new Audio();
var tading = new Audio();
var crash = new Audio();

bird.src = "images/bird.png";
background.src = "images/background.png";
foreground.src = "images/foreground.png";
pipeDown.src = "images/pipe_down.png";
pipeUp.src = "images/pipe_up.png";
woosh.src = "sounds/woosh.mp3";
tading.src = "sounds/tading.mp3";
crash.src = "sounds/crash.mp3";

pipe[0]={
	x: cvs.width,
	y: 0
};

document.addEventListener("keydown", moveup);

function moveup(){
	woosh.play();
	by = by - 25;
}


function main() {
	ctx.drawImage(background,0,0);

       for(var i = 0; i< pipe.length; i ++)
	{
		constant = pipeDown.height + gap;
		ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y);
		ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y+ constant);
		pipe[i].x--;
	
	 if(pipe[i].x == 125){
		pipe.push({
			x: cvs.width,
			y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
		})
	 }

	 if (pipe[i].x == 50){
		tading.play();
		score++;
	 }

	 if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeDown.width || by + bird.height >= cvs.height - foreground.height)
		if(by <= pipe[i].y + pipeDown.height || by + bird.height >= pipe[i].y + constant){
			lost = true;
			crash.play();
			setTimeout(function() {
				location.reload()
			}, 750);
		}
	}
    ctx.drawImage(foreground,0 , cvs.height - foreground.height);
    ctx.drawImage(bird,bx,by);
    by += gravity;
    ctx.font = "22px Verdana ";
    if(lost == true){
      ctx.fillText("You Crashed", 10,cvs.height - 20)
   } 
   else { 
      ctx.fillText("Score:" + score, 10 , cvs.height - 20);

   }
   requestAnimationFrame(main);
    
}
main();