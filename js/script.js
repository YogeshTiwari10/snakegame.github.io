// constants and variables
let direction={x: 0 , y:0};
let foodSound=new Audio('../../music/food.mp3');
let gameOverSound= new Audio('../music/gameover.mp3');
let moveSound= new Audio('music/move.mp3');
let musicSound=new Audio('music/music.mp3');
let lastPaintTime=0;
let speed=4;
let snakeArr=[{x:18, y:19}];
let score=0;
let food ={x:10 , y:15}




// functions

function main(ctime){
    window.requestAnimationFrame(main);
    if(score>=5){
        speed=8;
    }
    else if(score>=10){
        speed =14;
    }
    else if(score>=20){
        speed =20;
    }
    else if(score>=30){
        speed =30;
    }
    
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    // when snake eats itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 30 || snake[0].x <=0 || snake[0].y >= 30 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
    

function gameEngine(){
    // part 1: updating snake and food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction={x:0 , y:0};
        alert("Game Over!! Press any key to play again");
        snakeArr=[{x:18, y:19}];
        musicSound.play();
        score=0;
    }

    // Food Eating 
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML="Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x , y: snakeArr[0].y + direction.y });
        foodSound.play();
        let a=2;
        let b=23;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }

    // moving the snake 

    for (let i = snakeArr.length-2; i >=0; i--){
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
 

    // part 2 :display snake and food 
    
    // display the snake 
    board.innerHTML="";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });
    
    // display the food 
    
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    

}






// main function

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction={x:0 , y:1};
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
        console.log('ArrowUp');   
        direction.x= 0;
        direction.y= -1;
        break;

        case 'ArrowDown':
        console.log('ArrowDown');
        direction.x= 0;
        direction.y= 1;    
        break;

        case 'ArrowLeft':
        console.log('ArrowLeft');
        direction.x= -1;
        direction.y= 0;    
        break;

        case 'ArrowRight':
        console.log('ArrowRight'); 
        direction.x= 1;
        direction.y= 0;   
        break;
    
        default:
            break;
    }

})
