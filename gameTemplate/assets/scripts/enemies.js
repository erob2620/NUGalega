var enemyList = [];
function Enemy(xPos, yPos, health) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.bullets = [];
    this.health = health;
    this.rectangle = new createjs.Shape();
    console.log(this.xPos);
    this.rectangle.graphics.beginFill('#666').drawRect(this.xPos, this.yPos, 20, 20);
    this.rectangle.setBounds(this.xPos, this.yPos, 20, 20);
    this.rectangle.regX = this.rectangle.getBounds().width/2;
    this.rectangle.regY = this.rectangle.getBounds().height/2;
    this.rectangle.x = this.xPos;
    this.rectangle.y = this.yPos;
    console.log(this.rectangle);
    this.spawn();
}
Enemy.prototype.spawn = function() {
    //add enemy to enemy list
    enemyList.push(this);
    this.draw();
};
Enemy.prototype.shoot = function() {
    var bullet = null;
    //create bullet
    
    // add bullet to bullet array
    this.bullets.push(bullet);
};
Enemy.prototype.removeBullet = function(bulletIndex) {
    //if bullet moved off screen or hit player remove it
    this.bullets.splice(bulletIndex,1);
};
Enemy.prototype.die = function() {
    enemyList.splice(enemyList.indexOf(this), 1);
    stage.removeChild(this.rectangle);
};
Enemy.prototype.move = function() {
    this.xPos -= 2;
    this.rectangle.x -= 2;
    console.log(this.rectangle.x);
    if(this.rectangle.x < -15) {
        this.rectangle.x = stage.canvas.width;
    }
}
Enemy.prototype.collisionDetection = function(bulletX, bulletY) {
    //check the bounds of the enemy with reference to the bullet
};
Enemy.prototype.takeDamage = function() {
    this.health--;
}
Enemy.prototype.draw = function() {
    stage.addChild(this.rectangle);
}
function moveAllEnemies() {
    for(var i = 0; i < enemyList.length; i++) {
        enemyList[i].move();
    }
}
function checkEnemyDeath(playerBullets) {
    for(var i = 0; i < enemyList.length; i++) {
        for(var j = 0; j < playerBullets.length; j++) {
            // if an enemy collides with a player bullet
                // enemy takes damage 
                playerBullets.splice(playerBullets[i],1);
                enemyList[i].takeDamage();
                // if health goes below 0
                if(enemyList[i].heath === 0) {
                    enemyList[i].die();
                }
        }
    }
}

function createEnemy() {
    var enemy = new Enemy(820, 40, 2);
}
function drawEnemies() {
    for(var i = 0; i < enemyList.length; i++) {
        enemyList[i].draw();
    }
}