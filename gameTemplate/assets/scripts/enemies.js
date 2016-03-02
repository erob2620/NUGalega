var enemyList = [];
var enemyContainer;
var maxEnemies = 8;
var maxBullets = 2;
function Enemy(xPos, yPos, health) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.bullets = [];
    this.health = health;
    this.direction = -1;
    this.moveForward = false;
    this.movedSouthAmount = 0;
    this.shotDelay = 45;
    this.shotTimer = 0;
    this.rectangle = new createjs.Shape();
    this.rectangle.graphics.beginFill('#666').drawRect(0, 0, 20, 20);
    this.rectangle.x = this.xPos;
    this.rectangle.y = this.yPos;
    this.rectangle.setBounds(this.xPos, this.yPos, 20, 20);
    this.rectangle.regX = this.rectangle.getBounds().width/2;
    this.rectangle.regY = this.rectangle.getBounds().height/2;
    this.spawn();
}
Enemy.prototype.spawn = function() {
    //add enemy to enemy list
    enemyList.push(this);
    this.draw();
};
Enemy.prototype.shoot = function() {
    var bullet = new Bullet(this.xPos + 3, this.yPos + 11, false);
    
    //create bullet
    // add bullet to bullet array
    this.bullets.push(bullet);
    bullet.add();
};
Enemy.prototype.removeBullet = function(bulletIndex) {
    //if bullet moved off screen or hit player remove it
    this.bullets[bulletIndex].remove();
    this.bullets.splice(bulletIndex,1);
};
Enemy.prototype.removeAllBullets = function() {
    for(var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].remove();
    }
    this.bullets = [];
}
Enemy.prototype.die = function() {
    this.removeAllBullets();
    enemyList.splice(enemyList.indexOf(this), 1);
    enemyContainer.removeChild(this.rectangle);
};
Enemy.prototype.move = function() {
    if(!this.moveForward) {
        this.xPos += this.direction * 2;
        this.rectangle.x += this.direction * 2;
        if(this.rectangle.x < 25 || this.rectangle.x > 780) {
            this.direction *= -1;
            this.moveForward = true;
        }
    } else {
        this.rectangle.y += 2;
        this.yPos += 2;
        this.movedSouthAmount += 2;
        if(this.yPos > 200) this.die();
        if(this.movedSouthAmount === 40) {
            this.moveForward = false;
            this.movedSouthAmount = 0;
        }
    }
    this.shotTimer++;
    if(this.shotDelay <= this.shotTimer) {
        if(Math.floor(Math.random() * 10 + 1) <= 1) {
            if(this.bullets.length < maxBullets) {
                this.shotTimer = 0;
                this.shoot();
            }
        }
    } 
    for(var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].move();
        if(this.bullets[i].bulletShape.y > 575) {
            this.removeBullet(i);
        }
    }
    
}
Enemy.prototype.collisionDetection = function(bulletX, bulletY) {
    //check the bounds of the enemy with reference to the bullet
};
Enemy.prototype.takeDamage = function() {
    this.health--;
}
Enemy.prototype.draw = function() {
    enemyContainer.addChild(this.rectangle);
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
    if(enemyList.length < maxEnemies) {
        var enemy = new Enemy(770, 100, 2);
    }
}
function drawEnemies() {
    for(var i = 0; i < enemyList.length; i++) {
        enemyList[i].draw();
    }
}
function setupEnemies() {
    enemyContainer = new createjs.Container();
    stage.addChild(enemyContainer);
}