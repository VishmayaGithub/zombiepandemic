var plr,enemy1,enemy2,bullet,bulletgrp,enemygrp,booster,coinimags
var score = 0

var life = 3
var coinscore = 0
var bullets = 70
var gameState = "story"
var heart1,heart2,heart3

function preload(){
  story = loadImage("images/story.png")
  won = loadImage("images/you-survived.jpg")
  guny = loadAnimation("images/gun1.png","images/gun4.png","images/gun3.png")
  gun = loadImage("images/gun1.png")
  bullt = loadImage("images/bullet.jpg")
  monst = loadAnimation("images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png","images/zombie5.png","images/zombie6.png","images/zombie7.png","images/zombie8.png","images/zombie9.png")
  poisonimg = loadImage("images/fire.png")
  bg = loadImage("images/download2.jpg")
  lost = loadImage("images/you lost.jpg")
  coinimag = loadAnimation("images/coin.gif")
  heartimg = loadImage("images/heart.png")
  heartimg2 = loadImage("images/twoheart.png")
  heartimg3 = loadImage("images/oneheart.png")
  bulletbelt = loadImage("images/bulletbelt.png")
  pot = loadImage("images/pot of gold.png")
  roll = loadImage("images/awesome.png")
  wowimg = loadImage("images/wow.png")
  great = loadImage("images/great.png")
  fantastic = loadImage("images/fantastic.gif")
  explosionsound = loadSound("images/shoot.mp3")
  coinsound = loadSound("images/coin.mp3")
  lose = loadSound("images/game-lose-2.mp3")
  wining = loadSound("images/winning.mp3")
  popp = loadSound("images/pop.mp3")
  coinimags = loadAnimation("images/coin2.png","images/coin3.png","images/coin4.png","images/coin5.png","images/coin6.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
backg.addImage(bg)
backg.scale = 2
  
  plr = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  plr.addAnimation("gunimg",guny)
  plr.addImage("gunimg",gun)
   plr.scale = 0.3
   plr.debug = true
   plr.setCollider("rectangle",0,0,300,300)
  
    heart1 = createSprite(displayWidth-150,40,20,20)
    heart1.addImage("hello",heartimg3)
    heart1.scale = 0.4
    
    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("hello",heartimg3)
    heart2.addImage("hello",heartimg2)
    //heart2.addImage("hello",heartimg)
    heart2.scale = 0.4
    heart3 = createSprite(displayWidth-100,40,20,20)
    heart3.addImage("thoo",heartimg2)
    heart3.scale = 0.4
   


//heart.push(heart1,heart2,heart1)


 //  console.log(heart)
  
  bulletgrp = new Group()
  enemygrp = new Group()
  poisongrp = new Group()
  boostergrp = new Group()
  coingrp = new Group()
  goldgrp = new Group()
 //camera.y = plr.y
 //camera.position.y= plr.y
}

function draw() {
 
  if(gameState=="story"){
   clear()
   
    background(story)
    
    if(keyDown("enter")||touches.length>0){
      gameState = "fight"
    }

  }

  if(gameState === "fight"){
    if(score == 20){
     
      player = createSprite(600,120,30,30)
 player.addImage("roll",roll)
      player.velocityY = 3
      player.scale = 0.5
      player.lifetime = 1
    }
 
    if(score == 26){
      playerr = createSprite(600,120,30,30)
      playerr.addImage("rolll",wowimg)
     // playerr.velocityY = 3
      playerr.scale = 0.3
      playerr.lifetime = 1
    }
    if(score == 66){
      playe = createSprite(600,120,30,30)
      playe.addImage("rolll",great)
     // playerr.velocityY = 3
      playe.scale = 0.3
      playe.lifetime = 1
    }
    if(score == 46){
      play = createSprite(600,120,30,30)
      play.addImage("rolll",fantastic)
     // playerr.velocityY = 3
      play.scale = 0.7
      play.lifetime = 1
    }
    if(score==80){
      gameState = "won"
      wining.play()
    }
 
  background("#57615a");  
  


  if(keyDown("UP_ARROW")||touches.length>0){
     plr.y = plr.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    plr.y = plr.y+30
 }
 if(poisongrp.isTouching(plr)){
  heart2.addImage("hello",heartimg2)
  heart1.visible = false
heart3.visible = false
heart2.visible = true
  life = life-1
  popp.play()
   poisongrp.destroyEach()
   }
   if(life==1){
    heart2.addImage("hello",heartimg3)
    popp.play()
    popp.stop()
   }
 
 
if(life ===0){
  gameState ="lost"
  enemygrp.destroyEach()
  lose.play()

plr.destroy()
}
 if(keyWentDown("SPACE")||touches.length>0){
  bullet = createSprite(displayWidth-1150,plr.y-30,20,20)
  bullet.velocityX = 20
  bullet.addImage(bullt)
  bullet.scale = 0.04
  bulletgrp.add(bullet)
  plr.depth = bullet.depth
  plr.depth = plr.depth+2
  plr.addAnimation("gunimg",guny)
  bullets = bullets-1
  explosionsound.play()
  
}
else if(keyWentUp("space")){
  plr.addImage("gunimg",gun)
}
if(bullets==0){
  gameState = "bullet/"
  lost.play()
    // wining.play()
}


enemybad1()
coinandbooster()
if(enemygrp.isTouching(bulletgrp)){
  for(var i=0;i<enemygrp.length;i++){     
      
   if(enemygrp[i].isTouching(bulletgrp)){
        enemygrp[i].destroy()
        bulletgrp.destroyEach()
       // explosionsound.play()
 
        score = score+2
        } 
  
  }
}
if( bulletgrp.isTouching(poisongrp)){
  poisongrp.destroyEach()
}
if(plr.isTouching(boostergrp)){
 // enemygrp.destroyEach()
 bullets++
 coinsound.play()
  boostergrp.destroyEach()
}
if(plr.isTouching(coingrp)){
coinscore = coinscore+1
coingrp.destroyEach()
coinsound.play()
}

if(frameCount%500==0){
  gold = createSprite(random(displayWidth-1000,displayWidth-100),random(300,600),20,20)
  gold.addImage("gold",pot)
  gold.scale = 0.2
gold.velocityX = -3
goldgrp.add(gold)
}

if(plr.isTouching(goldgrp)){
  goldgrp.destroyEach()
  coinscore = coinscore+20
  coinsound.play()
}
if(plr.isTouching(enemygrp)){
  gameState = "lost"
  lose.play()

}
if(enemygrp.x<10){
  gameState = "lost"
  lose.play()
}
console.log(enemygrp)

drawSprites()
fill("peach")
textSize(20)
text(`score = ${score}`,displayWidth-1200,displayHeight/2-315)
text("Lives =",displayWidth-250,displayHeight/2-315)
text("Coins Collected ="+coinscore,displayWidth-1050,displayHeight/2-315)
text(`Bullets = ${bullets}`,displayWidth-800,displayHeight/2-315)



}
else if(gameState == "lost"){
  clear()
  text("you lost ",200,200)
background(lost)



}
else if(gameState == "won"){
  clear()
  background(won)

}else if(gameState == "bullet/"){
  clear()
  textSize(70)
  fill("black")
  text("You ran out of bullets!!!",300,300)
 // background("white")
}





}

function enemybad1(){
  if(frameCount%50===0&&enemygrp.length<3){
    enemy1 = createSprite(random(500,1100),random(100,500),40,40)
    enemy1.addAnimation("monater",monst)
    enemy1.scale = 1.2
    enemy1.velocityX = -3
    //enemy1.debug= true
    enemy1.setCollider("rectangle",0,0,100,100)
   // enemy1.velocityX = -7
    enemy1.lifetime = 400
   enemygrp.add(enemy1)
   if(frameCount%100 ===0){
     poison  = createSprite(random(500,600),random(100,500),20,20)
     poison.velocityX = -7
     poison.addImage(poisonimg)
     poison.scale = 0.1
     poison.lifetime = 600
     poisongrp.add(poison)
   }
  }


}
function coinandbooster(){
  if(frameCount%150==0){
  booster = createSprite(random(600,1100),random(100,1100),20,20)
  booster.addImage("two",bulletbelt)
  booster.scale = 0.2
  booster.velocityX = -6
  booster.lifetime = 600
  booster.shapeColor = "white"
  boostergrp.add(booster)
  }
   
  if(score%1==0){
if(frameCount%120===0){
  coin = createSprite(random(600,1100),random(100,1100),20,20)
  coin.addAnimation("coin",coinimags)
  coin.scale = 0.1
  coin.velocityX = -6
  coin.shapeColor = "blue"
  coin.lifetime = 600
  coingrp.add(coin)
}
  }
}
