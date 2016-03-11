var stage;
var queue;
var circle;
var titleScreen;
var backgroundScreen;
var instructionScreen;
var shopScreen;
var gameoverScreen;
var mouseX, mouseY;
var playing;
var sprites, ship;
var mouseX, mouseY;
var coordinates;
var gameMode = {
    TITLE:0,
    PLAY:1,
    INSTRUCTIONS:2,
	SHOP:3,
    GAMEOVER:4
};
var state;
var score;
var scoreText;
var playButton;
var instructionButton;
var menuButton;
//var shopButton;
var upgradeSpeedBtn, upgradeHealthBtn, upgradeBulletSpeedBtn, regainHealthBtn;
var cacheVersion = new Date().getTime();
var jsEnd = '.js?a=' + cacheVersion;
var left,right,up,down = false;
var speed;
var moving;
var bullets = [];
var shooting;
var health;
var healthNodes = [];
var hud;
var attackPower;
var hitTime;
var shootTime;
var shootSpeed;
var powerUp;
var bulletOne;
var bullets;
var enemySheet;
var bossSheet;
var enemySprite;
var level = 1;

manifest = [
    {src:"images/title.jpg", id:"title"},
    {src:"images/instructions.jpg", id:"instruction"},
    {src:"images/space.png", id:"play"},
    {src:"images/shop.jpg", id:"shop"},
    {src:"images/gameover.jpg", id:"gameover"},
    {src:"images/ship.png", id:"shipSprite"},
    {src:"images/instructionButton.jpg", id:"instructionButton"},
    {src:"images/playButton.jpg", id:"playButton"},
    {src:"images/menuButton.jpg", id:"menuButton"},
    //{src:"images/shopButton.jpg", id:"shopButton"},
    {src:'images/victory.jpg', id:'winScreen'},
    {src:"images/nextLevelButton.jpg", id:"nextLevelButton"},
    {src:"images/upgradeHealthButton.jpg", id:"upgradeHealthBtn"},
    {src:"images/upgradeSpeedButton.jpg", id:"upgradeSpeedBtn"},
    {src:"images/bulletSpeedButton.jpg", id:"upgradeBulletSpeedBtn"},
    {src:"images/regainHealthButton.jpg", id:"regainHealthBtn"},
    {src:"music/music.mp3", id:"music"},
    {src: 'scripts/enemies' + jsEnd},
    {src: 'scripts/bullet' + jsEnd},
    {src: 'images/bullet.png', id:'bullet'},
    {src:'images/enemies.png', id:'enemySprites'},
    {src: 'scripts/powerup' + jsEnd},
    {src: 'images/boss.png', id:'boss'}
];

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
    stage.enableMouseOver();
    loadFiles();
}
setupCanvas();

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
	shopScreen = new createjs.Bitmap(queue.getResult("shop"));
    winScreen = new createjs.Bitmap(queue.getResult('winScreen'));
    gameoverScreen = new createjs.Bitmap(queue.getResult("gameover"));
    playButton = new createjs.Bitmap(queue.getResult("playButton"));    
    playButton.x = 700;
    playButton.y = 540;  
    playButton.on("click", function(evt){
       level = 1;
        main();
        resetGameTimer(); 
        health = 5;
        createHealth();
        state = gameMode.PLAY;
        stage.addChild(powerUp);
    });
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
//	shopButton = new createjs.Bitmap(queue.getResult("shopButton"));
//    shopButton.x = 40;
//    shopButton.y = 540;
//    shopButton.on("click",function(evt){
//        state = gameMode.SHOP;
//    });
	nextLevelButton = new createjs.Bitmap(queue.getResult("nextLevelButton"));
    nextLevelButton.x = 700;
    nextLevelButton.y = 540; 
    nextLevelButton.on("click",function(evt){
        main();
        setupEnemies(level);
        resetGameTimer(); 
        health = 5;
        createHealth();
        stage.addChild(powerUp);
        state = gameMode.PLAY;
    });
	upgradeHealthBtn = new createjs.Bitmap(queue.getResult("upgradeHealthBtn"));  
    upgradeHealthBtn.x = 200;
    upgradeHealthBtn.y = 270;
    upgradeHealthBtn.on("click",function(evt){
        upgradeHealth();
    });
	upgradeSpeedBtn = new createjs.Bitmap(queue.getResult("upgradeSpeedBtn"));  
    upgradeSpeedBtn.x = 280;
    upgradeSpeedBtn.y = 270;
    upgradeSpeedBtn.on("click",function(evt){
        increaseSpeed();
    });
	upgradeBulletSpeedBtn = new createjs.Bitmap(queue.getResult("upgradeBulletSpeedBtn"));  
    upgradeBulletSpeedBtn.x = 360;
    upgradeBulletSpeedBtn.y = 270;
    upgradeBulletSpeedBtn.on("click",function(evt){
        increaseBulletSpeed();
    });
	regainHealthBtn = new createjs.Bitmap(queue.getResult("regainHealthBtn"));  
    regainHealthBtn.x = 440;
    regainHealthBtn.y = 270;
    regainHealthBtn.on("click",function(evt){
        regainHealth();
    });
    stage.addChild(titleScreen);
    stage.addChild(backgroundScreen);
    stage.addChild(instructionScreen);
    stage.addChild(shopScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(winScreen);
    stage.addChild(playButton);
    //stage.addChild(shopButton);
    stage.addChild(nextLevelButton);
    stage.addChild(instructionButton);
    stage.addChild(menuButton);
    titleScreen.visible = true;
    backgroundScreen.visible = false;
    instructionScreen.visible = false;
    shopScreen.visible = false;
    gameoverScreen.visible = false;
    winScreen.visible = false;
    
     var shipSheet = new createjs.SpriteSheet({
        images: [queue.getResult("shipSprite")],
        frames: [[0,0,37,11,0,18.1,5.6],[37,0,37,12,0,18.1,5.6],[74,0,36,14,0,18.1,6.6],[0,14,36,16,0,18.1,7.6],[36,14,36,17,0,19.1,7.6],[72,14,36,19,0,19.1,8.6],[0,33,36,19,0,19.1,8.6],[0,0,37,11,0,18.1,5.6],[36,33,37,12,0,18.1,5.6],[73,33,37,14,0,18.1,6.6],[0,52,36,16,0,17.1,7.6],[36,52,36,17,0,17.1,7.6],[72,52,35,19,0,16.1,8.6],[72,52,35,19,0,16.1,8.6]],
        animations: {
            stand: [0, 0, "stand"],
            shipRight: [6, 6, "shipRight", .5],
            shipLeft: [13, 13, "shipLeft", .5]
            }     
        });
    var bullets = new createjs.SpriteSheet({
        images: [queue.getResult("bullet")],
        frames:[[0,0,1,1,0,0.04999999999999982,0.04999999999999982],[1,0,2,2,0,1.0499999999999998,1.0499999999999998],[1,0,2,2,0,1.0499999999999998,1.0499999999999998],[3,0,5,5,0,2.05,2.05],[8,0,3,3,0,1.0499999999999998,1.0499999999999998],[1,0,2,2,0,1.0499999999999998,1.0499999999999998],[1,0,2,2,0,0.04999999999999982,0.04999999999999982]],
        animations: {pulse: [0,6,.25]}
    });
    
    boss = new createjs.SpriteSheet({images: [queue.getResult("boss")], frames: [[0,0,296,98,0,148.3,54.35],[0,0,296,98,0,148.3,54.35],[296,0,296,98,0,148.3,54.35],[592,0,296,98,0,148.3,54.35],[0,98,296,98,0,148.3,54.35],[296,98,296,98,0,148.3,54.35],[592,98,296,98,0,148.3,54.35],[0,196,296,98,0,148.3,54.35],[296,196,296,98,0,148.3,54.35],[592,196,296,98,0,148.3,54.35],[0,294,296,98,0,148.3,54.35],[592,196,296,98,0,148.3,54.35],[296,196,296,98,0,148.3,54.35],[592,98,296,98,0,148.3,54.35],[296,294,296,98,0,148.3,54.35],[0,98,296,98,0,148.3,54.35],[592,294,296,98,0,148.3,54.35],[0,392,296,98,0,148.3,54.35],[296,392,296,98,0,148.3,54.35],[296,392,296,98,0,148.3,54.35],[592,392,296,98,0,148.3,54.35],[0,490,296,98,0,148.3,54.35],[592,392,296,98,0,148.3,54.35],[296,392,296,98,0,148.3,54.35],[296,490,296,98,0,148.3,54.35],[0,392,296,98,0,148.3,54.35],[592,294,296,98,0,148.3,54.35],[592,490,296,98,0,148.3,54.35],[0,588,296,98,0,148.3,54.35],[296,588,296,98,0,148.3,54.35],[296,588,296,98,0,148.3,54.35]],
                                    animations: {pulse: [0,30,.5]}
                                    });
    
    enemySheet = new createjs.SpriteSheet({
        images: [queue.getResult("enemySprites")],
        frames: [[0,0,35,22,0,17.85,9.1],[35,0,35,22,0,17.85,9.1],[70,0,35,22,0,17.85,9.1],[0,22,35,22,0,17.85,9.1],[35,22,35,22,0,17.85,9.1],[70,22,35,22,0,17.85,9.1],[0,44,35,22,0,17.85,9.1],[35,0,35,22,0,17.85,9.1],[0,0,35,22,0,17.85,9.1],[35,44,35,24,0,17.85,9.1],[70,44,35,24,0,17.85,9.1],[0,68,35,24,0,17.85,9.1],[35,68,35,24,0,17.85,9.1],[70,68,35,24,0,17.85,9.1],[35,68,35,24,0,17.85,9.1],[0,68,35,24,0,17.85,9.1],[70,44,35,24,0,17.85,9.1],[35,44,35,24,0,17.85,9.1],[0,92,35,22,0,17.85,9.1],[35,92,35,22,0,17.85,9.1],[35,92,35,22,0,17.85,9.1],[70,92,35,22,0,17.85,9.1],[0,114,35,22,0,17.85,9.1],[35,114,35,22,0,17.85,9.1],[70,114,35,22,0,17.85,9.1],[35,114,35,22,0,17.85,9.1],[0,114,35,22,0,17.85,9.1],[70,92,35,22,0,17.85,9.1],[35,92,35,22,0,17.85,9.1],[0,136,35,22,0,17.85,9.1]],
        animations: {
            typeOne: [0,6, 'typeOne', .5],
            typeTwo: [7,11, 'typeTwo', .5],
            typeThree: [12,18, 'typeThree', .5]
        }
    });
    ship = new createjs.Sprite(shipSheet);
    ship.x = 390;
    ship.y = 510;
    stage.addChild(ship);
    ship.setBounds(ship.x, ship.y, 35, 20);
    ship.regX = ship.getBounds().width/2;
    ship.regY = ship.getBounds().height/2;
    hud = new createjs.Shape();
    hud.graphics.beginFill("#aaa").drawRect(0,0,100,300);
    hud.x = 700;
    hud.y = 300;
    bulletOne = new createjs.Sprite(bullets);
    enemySprite = new createjs.Sprite(enemySheet);
    stage.addChild(playButton);
    stage.addChild(instructionButton);
    stage.addChild(menuButton);
    stage.addChild(upgradeHealthBtn);
    stage.addChild(upgradeSpeedBtn);
    stage.addChild(upgradeBulletSpeedBtn);
    stage.addChild(regainHealthBtn);
    main();
    stage.addChild(hud);
}

function createHealth(){
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

function damage(time){
    health--;
    stage.removeChild(healthNodes[0]);
    healthNodes.splice(0,1);
    //hitTime = time;
    
    console.log(healthNodes.length);
}

function nextLevelSetup() {
	console.log("Preparing next level...");
}

function main() {
    resetGameTimer();
    createButtons(); 
    writeCoordinates();
    writeScore();
    mouseInit();
    setupEnemies(level);
    state = gameMode.TITLE;
    speed = 6;
    moving = false;
    shooting = false;
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
    attackPower = 1;
    hitTime = 0;
    shootTime = 0;
    shootSpeed = .5;
}

function showTitle(){
    playing = false;
    ship.visible = false;
    titleScreen.visible = true;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    shopScreen.visible = false;
    winScreen.visible = false;
    instructionScreen.visible = false;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = true;
    menuButton.visible = false;
    //shopButton.visible = false;
    nextLevelButton.visible = false;
	upgradeHealthBtn.visible = false;
	upgradeSpeedBtn.visible = false;
	upgradeBulletSpeedBtn.visible = false;
	regainHealthBtn.visible = false;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
//    powerUp.visible = false;
    winScreen.visible = false;

}
function showWin(){
    playing = false;
    ship.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    shopScreen.visible = false;
    instructionScreen.visible = false;
    coordinates.visible = false;
    playButton.visible = false;
    instructionButton.visible = false;
    menuButton.visible = true;
    //shopButton.visible = false;
    nextLevelButton.visible = false;
	upgradeHealthBtn.visible = false;
	upgradeSpeedBtn.visible = false;
	upgradeBulletSpeedBtn.visible = false;
	regainHealthBtn.visible = false;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
//    powerUp.visible = false;
    winScreen.visible = true;
}
var count = 0;
function showGame(){
    runGameTimer();
    stage.removeChild(coordinates);
    writeCoordinates();
    playing = true;
    ship.visible = true;
    winScreen.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = true;
    shopScreen.visible = false;
    instructionScreen.visible = false;
    coordinates.visible = true;
    playButton.visible = false;
    instructionButton.visible = false;
    menuButton.visible = false;
    //shopButton.visible = true;
    nextLevelButton.visible = false;
	upgradeHealthBtn.visible = false;
	upgradeSpeedBtn.visible = false;
	upgradeBulletSpeedBtn.visible = false;
	regainHealthBtn.visible = false;
    scoreText.visible = true;
    count++;
    if(count === FPS) {
        createEnemy();
        count = 0;
    } 
    if(isLevelCleared()) {
        console.log('you cleared the level');
        clearScreen();
        if(level === 4) {
            state = gameMode.WIN;
        } else {
            level += 1;
            state = gameMode.SHOP;
        }

    }
    moveAllEnemies();
    runGameTimer();
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = true;
    }
 //   powerUp.visible = true;
    hud.visible = true;
}

function showGameOver(){
    playing = false;
    ship.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = true;
    backgroundScreen.visible = false;
    instructionScreen.visible = false;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = true;
    menuButton.visible = true;
    winScreen.visible = false;

    //shopButton.visible = false;
	nextLevelButton.visible = false;
	upgradeHealthBtn.visible = false;
	upgradeSpeedBtn.visible = false;
	upgradeBulletSpeedBtn.visible = false;
	regainHealthBtn.visible = false;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
 //   powerUp.visible = false;
}

function showInstructions(){
    playing = false;
    ship.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    shopScreen.visible = false;
    instructionScreen.visible = true;
    coordinates.visible = false;
    playButton.visible = true;
    instructionButton.visible = false;
    menuButton.visible = true;
    //shopButton.visible = false;
	nextLevelButton.visible = false;
    scoreText.visible = false;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = false;
    }
    hud.visible = false;
//    powerUp.visible = false;
    winScreen.visible = false;
}


function showShop(){
    playing = false;
    ship.visible = false;
    winScreen.visible = false;
    titleScreen.visible = false;
    gameoverScreen.visible = false;
    backgroundScreen.visible = false;
    shopScreen.visible = true;
    instructionScreen.visible = false;
    coordinates.visible = false;
    playButton.visible = false;
    instructionButton.visible = false;
    menuButton.visible = false;
    //shopButton.visible = false;
	nextLevelButton.visible = true;
	upgradeHealthBtn.visible = true;
	upgradeSpeedBtn.visible = true;
	upgradeBulletSpeedBtn.visible = true;
	regainHealthBtn.visible = true;
    scoreText.visible = true;
    for(var i = 0; i < healthNodes.length; i++){
        healthNodes[i].visible = true;
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
			case gameMode.SHOP:
                showShop();
                break;
            case gameMode.GAMEOVER:
                showGameOver();
                break;
            case gameMode.WIN:
                showWin();
                break;
            default:
            console.log("How did you even manage that?");
    }
    
       stage.update();
}

var gameTimer;
var frameCount = 0;
function runGameTimer() {
    stage.removeChild(scoreText);
    writeScore();
    frameCount += 1;
    if(frameCount%(FPS/10) === 0) {
        gameTimer = frameCount/(FPS);
    }
    
    if(left && ship.x > 0){
        ship.gotoAndPlay("shipLeft");
        ship.x -= speed;
    }
    else if(right && ship.x < 680){
        ship.x += speed;
        ship.gotoAndPlay("shipRight");
    }
    else if(up && ship.y > 500){
        ship.y -= speed;
    }
    else if(down && ship.y < 580){
        ship.y += speed;
    }
    else{
        ship.gotoAndPlay("stand");
    }
        /*if(ship.x + 15 > powerUp.x && ship.x + 15 < powerUp.x + 20 && ship.y + 15 > powerUp.y && ship.y + 15 < powerUp.y + 20){
            power_Up();
            console.log('powerup');
            stage.removeChild(powerUp);
        }*/
//        if(ship.x + 15 > powerUp.x && ship.x + 15 < powerUp.x + 20 && ship.y + 15 > powerUp.y && ship.y + 15 < powerUp.y + 20){
//            power_Up();
//            console.log('powerup');
//            stage.removeChild(powerUp);
//        }

    if(shooting){
        shoot(frameCount/(FPS));
    } 
    for(var i = 0; i < enemyList.length; i++){
        
        for(var j = 0; j < enemyList[i].bullets.length; j++){
            var bullet = enemyList[i].bullets[j].bulletShape;                
            if(ship.x - 35 >= bullet.x + bullet.getBounds().width ||
                ship.x + ship.getBounds().width - 35 <= bullet.x ||
                ship.y - 5 >= bullet.y + bullet.getBounds().height ||
                ship.y + ship.getBounds().height <= bullet.y) {
            } else {
                enemyList[i].removeBullet(j);
                j--;
                damage(frameCount/(FPS));
            }
        }
    }
    var toRemove = [];
    for(var i = 0; i < bullets.length; i++){
        if(bullets[i].y <= 10){
            //toRemove.push(i);
            stage.removeChild(bullets[i]);
            bullets.splice(i,1);  
            i--;
        } else {
            bullets[i].y -= 8;
        }
    }
//    if(toRemove.length >= 1){
//    }
    if(health == 0){
        clearScreen();
        state = gameMode.GAMEOVER;
    }

}

function resetGameTimer() {
    gameTimer = 0;
    frameCount = 0;
    score = 0;
}


function shoot(time){
    if(time > shootTime + shootSpeed) {
        bulletOne.x = ship.x - 15;
        bulletOne.y = ship.y - 2;
        bulletOne.setBounds(bulletOne.x, bulletOne.y, 5, 5);
        bulletOne.gotoAndPlay("pulse");
        bulletOne.regX = bulletOne.getBounds().width/2;
        bulletOne.regY = bulletOne.getBounds().height/2;
        bullets.push(bulletOne.clone()); 
        stage.addChild(bullets[bullets.length - 1]);
        shootTime = time;
    }
}
    
//    function power_Up(){
//        health = 10; 
//        attackPower = 5;
//        shootSpeed = .1;
//    }
    
function mouseInit() {
    stage.on("stagemousemove", function(evt) {
    mouseX = Math.floor(evt.stageX);
    mouseY = Math.floor(evt.stageY);
    });
}


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
var KEYCODE_J = 74;

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
        case KEYCODE_J: health = 10; attackPower = 5; return false;
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
function clearScreen() {
    clearEnemies();
    clearPowerup();
    for(var i = 0; i < bullets.length; i++) {
        stage.removeChild(bullets[i]);
    }
    bullets = [];
}