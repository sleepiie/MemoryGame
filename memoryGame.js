//peerapart namnuch 6601012630050
//multiplayer
//Hint
//Timer
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];
let difficulty = 'medium';
let Hint;
let player1Turn = true;
let y;
let timer = 0;
let lastTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white');
  let numbers = [];
  if(difficulty == 'easy'){
    y = 2;
    numbers = [1,1,2,2,3,3,4,4,5,5]
  }
  else if(difficulty == 'medium'){
    y = 4;
    numbers = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
  }
  else{
    y = 8;
    numbers = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10];
  }
  
  lastTime = millis();
  console.log(numbers)
  for(let i = 0; i<y; i++){
    board.push([]);
    for(let j = 0; j<5; j++){
      const randomNum = random(numbers);
      index = numbers.indexOf(randomNum);
      if(difficulty == 'easy' || difficulty =='medium'){
        numbers.splice(index, 1);
        board[i].push(randomNum);
      } 
      else{
        board[i].push(randomNum);
      }
      
      
    }
  }
  console.log(board);
}


function draw() {
   if (millis() - lastTime >= 1000) {
    timer = timer + 1;
    lastTime = millis();
  }
  background('white');  
  rect(0,0,windowWidth,windowHeight -100);
  textAlign(CENTER, CENTER);
  textSize(20);
  let text1;
  let text2;
  
  
  if(difficulty == 'easy'){
    y = 2;
  }
  else if(difficulty == 'medium'){
    y = 4
  }
  else{
    y = 8
  }
  const blockX = floor(windowWidth/5);
  const blockY = floor((windowHeight-100)/y);
  
  if(player1Turn){
    console.log("player 1's Turn")
  }
  else{
    console.log("player 2's Turn")
  }
  
  for(let i=1; i<5; i++){
    line(i*windowWidth/5, 0, i*windowWidth/5, windowHeight-100);
  }
  for(let i=1; i<y; i++){
    line(0, i*(windowHeight-100)/y, windowWidth, i*(windowHeight-100)/y);
  }
 
  textSize(24);
  textAlign(CENTER, CENTER);
  text(player1Turn ? "Player 1's Turn" : "Player 2's Turn", windowWidth/2, windowHeight - 70);
  
  text("Game time : "+ timer +" seconds", windowWidth/2, windowHeight - 30);
   

  if(clicked1.length!=0){
    text1 = board[clicked1[0]][clicked1[1]];
    hint = findHint();
    text("Hint : "+hint.toString(), clicked1[1]*blockX+blockX/2, clicked1[0]*blockY+blockY/2 + 50);
    let gap = -10;
    for(i = 1; i<=text1 ; i++){
      line(clicked1[1]*blockX+blockX/2+gap, clicked1[0]*blockY+blockY/2-20, clicked1[1]*blockX+blockX/2+gap, clicked1[0]*blockY+blockY/2+20);
      gap += 7;
    }
  }
  if(clicked2.length!=0){
    text2 = board[clicked2[0]][clicked2[1]];
    let gap = -10;
    for(i = 1; i<=text2 ; i++){
      line(clicked2[1]*blockX+blockX/2+gap, clicked2[0]*blockY+blockY/2-20, clicked2[1]*blockX+blockX/2+gap, clicked2[0]*blockY+blockY/2+20);
      gap += 7;
    }
    if(text1 == text2){paired.push([clicked1[0],clicked1[1],clicked2[0],clicked2[1]]);}
  }
  paired.map((axis) => {
    const numshow = board[axis[0]][axis[1]].toString();
    let gap = -10;
    for(i = 1; i<=board[axis[0]][axis[1]] ; i++){
      line(axis[1]*blockX+blockX/2+gap, axis[0]*blockY+blockY/2-20, axis[1]*blockX+blockX/2+gap, axis[0]*blockY+blockY/2+20);
      line(axis[3]*blockX+blockX/2+gap, axis[2]*blockY+blockY/2-20, axis[3]*blockX+blockX/2+gap, axis[2]*blockY+blockY/2+20);
      gap += 7;
    }
  });

}

function mouseClicked(){
  if(clicked2.length == 0){
    let y;
    if(difficulty == 'easy'){
      y = 2;
    }
    else if(difficulty == 'medium'){
      y = 4
    }
    else{
      y = 8
    }
    const blockX = floor(windowWidth/5);
    const blockY = floor((windowHeight -100)/y);
    const arrayX = floor(mouseX/blockX);
    const arrayY = floor(mouseY/blockY);
    const arrayX2 = floor(mouseX/blockX);
    const arrayY2 = floor(mouseY/blockY);
    if(clicked1.length == 0){clicked1.push(arrayY,arrayX);}
    else{
      clicked2.push(arrayY2,arrayX2);
      ChangeTurn()
      
      setTimeout(() => {
        
        clicked1 = [];
        clicked2 = [];
        console.log("clicked reset")
      },500);
    }
    console.log(clicked1);
    console.log(clicked2);
  }
      
}

function findHint(){
  if (clicked1.lenght != 0){
    reveled = board[clicked1[0]][clicked1[1]];
    for(let i = 0; i<y; i++){
      for(let j = 0; j<5; j++){
        if (board[i][j] == reveled && i != clicked1[0] && j != clicked1[1] ){
          hinty = i - clicked1[0];
          hintx = j - clicked1[1];
        }
      }
    }
    return [hintx , hinty]
  }
  
}

function ChangeTurn(){
    if(player1Turn){
      player1Turn = false;
    }
    else{
      player1Turn = true;
    }
}
