var stage;
var timer;
var queue;
var circle;
var titleScreen;
var backgroundScreen;
var instructionScreen;
var gameoverScreen;
var mouseX, mouseY;
var playing;
var sprites, walk;
var mouseX, mouseY;
var coordinates;
var gameMode = {
    TITLE:0,
    PLAY:1,
    INSTRUCTIONS:2,
    GAMEOVER:3
};
var state;
var score;
var scoreText;
var playButton;
var instructionButton;
var menuButton;
var left,right,up,down = false;
var speed;
var moving;
var bullets = [];
var shooting;
var health;
var healthNodes = [];
var hud;

manifest = [
    {src:"images/title.jpg", id:"title"},
    {src:"images/instruction.jpg", id:"instruction"},
    {src:"images/play.jpg", id:"play"},
    {src:"images/gameover.jpg", id:"gameover"},
    {src:"images/sprites.png", id:"mySprites"},
    {src:"images/instructionButton.jpg", id:"instructionButton"},
    {src:"images/playButton.jpg", id:"playButton"},
    {src:"images/menuButton.jpg", id:"menuButton"},
    {src:"music/music.mp3", id:"music"}
];

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
    stage.enableMouseOver();
}

function createButtons(){
    
    

}

function loadFiles(){
    createjs.Sound.alternateExtensions = ["mp3"];
    queue = new createjs.LoadQueue(true,"assets/");
    queue.installPlugin(createjs.Sound);
    queue.on("complete", loadComplete,this);
    queue.loadManifest(manifest);
}

function loadComplete(evt){
    createjs.Sound.play("music",{loop:-1});
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    backgroundScreen = new createjs.Bitmap(queue.getResult("play"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instruction"));
    gameoverScreen = new createjs.Bitmap(queue.getResult("gameover"));
     playButton = new createjs.Bitmap(queue.getResult("playButton"));    
    playButton.x = 700;
    playButton.y = 540;  
    playButton.on("click", function(evt){state = gameMode.PLAY;resetGameTimer();});
    instructionButton = new createjs.Bitmap(queue.getResult("instructionButton"));  
    instructionButton.x = 620;
    instructionButton.y = 540;
    instructionButton.on("click",function(evt){
        state = gameMode.INSTRUCTIONS;
    });
    menuButton = new createjs.Bitmap(queue.getResult("menuButton"));
    menuButton.x = 540;
    menuButton.y = 540;
    menuButton.on("click",function(evt){
        state = gameMode.TITLE;
    });
    stage.addChild(titleScreen);
    stage.addChild(backgroundScreen);
    stage.addChild(instructionScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(playButton);
    stage.addChild(instructionButton);
    stage.addChild(menuButton);
    titleScreen.visible = true;
    backgroundScreen.visible = false;
    instructionScreen.visible = false;
    gameoverScreen.visible = false;
    
     /*var walkSheet = new createjs.SpriteSheet({
        images: [queue.getResult("mySprites")],
        frames: [[160,0,19,49,0,10.05,48.6],[179,0,34,44,0,17.05,43.6],[213,0,22,46,0,9.05,45.6],[235,0,17,49,0,8.05,48.6],[0,49,25,49,0,10.05,48.6],[25,49,31,46,0,14.05,45.6],[56,49,33,44,0,16.05,43.6],[89,49,30,44,0,17.05,43.6],[119,49,28,46,0,17.05,45.6],[147,49,19,49,0,10.05,48.6],[166,49,23,49,0,14.05,48.6],[189,49,31,46,0,16.05,45.6],[220,49,34,44,0,17.05,43.6],[0,98,19,49,0,9.05,48.6],[19,98,34,44,0,17.05,43.6],[53,98,22,46,0,13.05,45.6],[75,98,17,49,0,9.05,48.6],[92,98,25,49,0,15.05,48.6],[117,98,31,46,0,17.05,45.6],[148,98,33,44,0,17.05,43.6],[181,98,30,44,0,13.05,43.6],[211,98,28,46,0,11.05,45.6],[0,147,19,49,0,9.05,48.6],[19,147,23,49,0,9.05,48.6],[42,147,31,46,0,15.05,45.6],[73,147,34,44,0,17.05,43.6]],
        animations: {
            standRight: [0, 0, "standRight"],
            walkRight: [1, 12, "walkRight", .5],
            standLeft: [13, 13, "standLeft"],
            walkLeft: [14, 25, "walkLeft", .5]
            }     
        });*/
    
    walk = new createjs.Shape();
    walk.graphics.beginFill("#000").drawRect(0,0,20,20);
    stage.addChild(walk);
    walk.x = 390;
    walk.y = 510;
    hud = new createjs.Shape();
    hud.graphics.beginFill("#aaa").drawRect(0,0,100,300);
    hud.x = 700;
    hud.y = 300;
    stage.addChild(playButton);
    stage.addChild(instructionButton);
    stage.addChild(menuButton);
    stage.addChild(hud);
    for(var i = 320; i < 420; i += 20){
        var healthBlock = new createjs.Shape();
        healthBlock.graphics.beginFill("#f00").drawRect(0,0,20,20);
        healthBlock.x = 740;
        healthBlock.y = i;
        stage.addChild(healthBlock);
        healthNodes.push(healthBlock);
    }
}

function writeTimer(){
    timer = new createjs.Text(gameTimer, "12px Arial", "#000000");
timer.x = 10; 
timer.y = 50; 
stage.addChild(timer);
}

function writeCoordinates(){
     coordinates = new createjs.Text("(" + mouseX + "," + mouseY + ")", "12px Arial", "#000000");
coordinates.x = 10; 
coordinates.y = 70; 
stage.addChild(coordinates);
}

function writeScore(){
    scoreText = new createjs.Text("Score: " + score, "12px Arial", "#000000");
    scoreText.x = 730;
    scoreText.y = 500;
    stage.addChild(scoreText);
}

function addScore(increment){
    score += increment
}

function damage(){
    health--;
    stage.removeChild(healthNodes[0]);
    healthNodes.splice(0,1);
}

function main() {
    loadFiles();
    setupCanvas();
    resetGameTimer();
    createButtons();
    writeTimer();   
    writeCoordinates();
    writeScore();
    mouseInit();
    state = gameMode.TITLE;
    speed = 6;
    moving = false;
    shooting = false;
    health = 5;
}

function showTitle(){
    playing = false;
    walk.visible = false;
    titleScreen.visible = true;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    instructionScreen.visible = false;
    timer.visible = false;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = true;
    menuButton.visible = false;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
}

function showGame(){
    runGameTimer();
    stage.removeChild(coordinates);
    writeCoordinates();
    playing = true;
    walk.visible = true;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = true;
    instructionScreen.visible = false;
    timer.visible = true;
    coordinates.visible = true;
    playButton.visible = false;
    instructionButton.visible = false;
    menuButton.visible = true;
    scoreText.visible = true;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = true;
    }
    hud.visible = true;
}

function showGameOver(){
    playing = false;
    walk.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = true;
    backgroundScreen.visible = false;
    instructionScreen.visible = false;
    timer.visible = false;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = true;
    menuButton.visible = true;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
}

function showInstructions(){
    playing = false;
    walk.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    instructionScreen.visible = true;
    timer.visible = false;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = false;
    menuButton.visible = true;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
}

var FPS = 30;
function loop() {
    switch(state){
            case gameMode.TITLE:
                showTitle();
                break;
            case gameMode.PLAY:
                showGame();
                break;
            case gameMode.INSTRUCTIONS:
                showInstructions();
                break;
            case gameMode.GAMEOVER:
                showGameOver();
                break;
            default:
            console.log("How did you even manage that?");
    }
    
       stage.update();
}
createjs.Ticker.addEventListener("tick", loop);
createjs.Ticker.setFPS(FPS);

var gameTimer;
var frameCount = 0;
function runGameTimer() {
    stage.removeChild(scoreText);
    writeScore();
    frameCount += 1;
    if(frameCount%(FPS/10) === 0) {
        gameTimer = frameCount/(FPS);
        if(gameTimer*10 % 1 === 0){
            stage.removeChild(timer);
            writeTimer();
        }
        if(gameTimer % 5 == 0){
            damage();
        }
    }
        if(left && walk.x > 0){
            walk.x -= speed;
        }
        if(right && walk.x < 780){
            walk.x += speed;
        }
        if(up && walk.y > 500){
            walk.y -= speed;
        }
        if(down && walk.y < 580){
            walk.y += speed;
        }
    if(shooting){
        shoot();
    }
    var toRemove = [];
    for(var i = 0; i < bullets.length; i++){
        if(bullets[i].y <= 0){
            toRemove.push(i);
        }
        bullets[i].y -= 10;
    }
    if(toRemove.length >= 1){
        stage.removeChild(bullets[toRemove[0]]);
        bullets.splice(toRemove[0],1);   
    }
    if(health == 0){
        state = gameMode.GAMEOVER;
    }
            
    }
    
    


function resetGameTimer() {
    gameTimer = 0;
    frameCount = 0;
    score = 0;
}

function shoot(){
    var bullet = new createjs.Shape();
    bullet.graphics.beginFill("#000").drawRect(0,0,5,5);
    bullet.x = walk.x + 7;
    bullet.y = walk.y;
    stage.addChild(bullet);
    bullets.push(bullet);
}

function mouseInit() {
    stage.on("stagemousemove", function(evt) {
    mouseX = Math.floor(evt.stageX);
    mouseY = Math.floor(evt.stageY);
    });
}


main();
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_SPACE = 32;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;

function handleKeyDown(evt) {
    if(!evt){ var evt = window.event; }
    switch(evt.keyCode) {
        case KEYCODE_LEFT:  left = true; return false;
        case KEYCODE_RIGHT: right=true;return false;
        case KEYCODE_UP:   up = true; return false;
        case KEYCODE_DOWN:  down = true;return false;
        case KEYCODE_SPACE:  shooting = true; return false;
        case KEYCODE_W:   up = true;return false;
        case KEYCODE_A:  left=true;return false;
        case KEYCODE_S:  down = true;return false;
        case KEYCODE_D:  right = true;return false;  
    }
    
}

function handleKeyUp(evt) {
    if(!evt){ var evt = window.event; }
switch(evt.keyCode) {
        case KEYCODE_LEFT:  left = false; return false;
        case KEYCODE_RIGHT: right=false;return false;
        case KEYCODE_UP:   up = false; return false;
        case KEYCODE_DOWN:  down = false;return false;
        case KEYCODE_SPACE:  shooting = false; return false;
        case KEYCODE_W:   up = false;return false;
        case KEYCODE_A:  left=false;return false;
        case KEYCODE_S:  down = false;return false;
        case KEYCODE_D:  right = false;return false;  
    }
    
       

    
}