var enemyList = [];
var enemyContainer;
var maxEnemies = 8;
var levelEnemiesLeft = 10;
var maxBullets = 2;
var powerupCount = 0;
var gameLevel = 1;
var boss;
function Enemy(xPos, yPos, health, bulletMoveX, bulletMoveY, multipleBullets, sprite, spriteType) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.bulletMoveX = bulletMoveX;
    this.bulletMoveY = bulletMoveY;
    this.multipleBullets = multipleBullets;
    this.bullets = [];
    this.health = health;
    this.direction = 1;
    this.moveForward = false;
    this.movedSouthAmount = 0;
    this.shotDelay = 45;
    this.shotTimer = 0;
    this.sprite = spriteType;
    this.sprite.x = xPos;
    this.sprite.y = yPos;
    this.sprite.gotoAndPlay(sprite);
    this.rectangle = this.sprite.clone();
    this.spawn();
}
Enemy.prototype.spawn = function() {
    //add enemy to enemy list
    enemyList.push(this);
    this.draw();
};
Enemy.prototype.shoot = function() {
    var bullet;
    if(this.multipleBullets) {
        bullet = new Bullet(this.xPos - 9, this.yPos + 11, false, this.bulletMoveX * -1, this.bulletMoveY);
        var secondBullet = new Bullet(this.xPos + 9, this.yPos + 11, false, this.bulletMoveX, this.bulletMoveY);
        this.bullets.push(bullet);
        this.bullets.push(secondBullet);
        bullet.add();
        secondBullet.add();
    } else {
        bullet = new Bullet(this.xPos + 3, this.yPos + 11, false, this.bulletMoveX, this.bulletMoveY);
        this.bullets.push(bullet);
        bullet.add();
    }


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
        this.xPos += this.direction * 3;
        this.rectangle.x += this.direction * 3;
        if(this.rectangle.x < 10 || this.rectangle.x > 650) {
            this.direction *= -1;
            this.moveForward = true;
        }
    } else {
        this.rectangle.y += 3;
        this.yPos += 3;
        this.movedSouthAmount += 3;
        if(this.yPos > 430)  {
            this.die();
            levelEnemiesLeft++;
        }
        if(this.movedSouthAmount > 40) {
            this.moveForward = false;
            this.movedSouthAmount = 0;
        }
    }
    this.shotTimer++;
    if(this.shotDelay <= this.shotTimer) {
        if(Math.floor(Math.random() * 4 + 1) <= 1) {
            if(this.bullets.length < maxBullets) {
                this.shotTimer = 0;
                this.shoot();
            }
        }
    } 
    for(var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].move();
        if(this.bullets[i].bulletShape.y > 575 || this.bullets[i].bulletShape.x < 5 
           || this.bullets[i].bulletShape.y > 700) {
            this.removeBullet(i);
            i--;
        }
    }
    for(var i = 0; i < bullets.length; i++) {
            // if an enemy collides with a player bullet
        if(this.collisionDetection(bullets[i])) {
            stage.removeChild(bullets[i]);
            bullets.splice(i,1);
            i--;
            this.takeDamage();
            addScore(5);
            // if health goes below 0
            if(this.health <= 0) {
                dropPowerup(this.xPos, this.yPos);
                this.die();
                addScore(15);
                break;
            }
        }
    }
    
}
Enemy.prototype.collisionDetection = function(bullet) {
    //check the bounds of the enemy with reference to the bullet
    if(this.rectangle.x - 12 >= bullet.x + bullet.getBounds().width ||
       this.rectangle.x + this.rectangle.getBounds().width - 12 <= bullet.x ||
       this.rectangle.y - 25 >= bullet.y + bullet.getBounds().height ||
       this.rectangle.y + this.rectangle.getBounds().height - 25 <= bullet.y) return false;
    return true;
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
    if(!powerupAvailable) {
        powerup.move();
        if(powerup.isActive) {
            powerupCount++;
            if(powerupCount > FPS) {
                powerup.countDown();
                powerupCount = 0;
            }
        }
    }
}
function createEnemy() {
    if(enemyList.length < maxEnemies && levelEnemiesLeft != 0) {
        switch(gameLevel) {
            case 1:
                var enemy = new Enemy(11, 150, 2, 0, 8, false, 'typeOne', enemySprite);
                break;
            case 2:
                var enemy = new Enemy(11, 150, 3, 0, 8, true, 'typeTwo', enemySprite);
                break;
            case 3:
                var enemy = new Enemy(11, 150, 3, 4, 6, true, 'typeThree', enemySprite);
                break;
            case 4:
                var random = Math.floor(Math.random() * 3);
                if(random === 0) {
                    var enemy = new Enemy(11, 150, 3, 0, 8, false, 'typeOne', enemySprite);
                } else if(random === 1) {
                    var enemy = new Enemy(11, 150, 3, 0, 8, true, 'typeTwo',enemySprite);
                } else {
                    var enemy = new Enemy(11, 150, 3, 4, 6, true, 'typeThree', enemySprite);
                }
                break;
            case 5:
                if(boss === undefined && enemies.length < 6 && levelEnemiesLeft < 6) {
                    boss = new Boss(200,20,50,3,6,'pulse',bossSprite);
                }
                var random = Math.floor(Math.random() * 3);
                if(random === 0) {
                    var enemy = new Enemy(11, 150, 3, 0, 8, false, 'typeOne', enemySprite);
                } else if(random === 1) {
                    var enemy = new Enemy(11, 150, 3, 0, 8, true, 'typeTwo', enemySprite);
                } else {
                    var enemy = new Enemy(11, 150, 3, 4, 6, true, 'typeThree', enemySprite);
                }
                break;
        }
        levelEnemiesLeft--;
    }
}
function drawEnemies() {
    for(var i = 0; i < enemyList.length; i++) {
        enemyList[i].draw();
    }
}
function setupEnemies(level) {
    enemyContainer = new createjs.Container();
    stage.addChild(enemyContainer);
    gameLevel = level;
    maxEnemies = 8 + level;
    levelEnemiesLeft = 8 + (level * 2);
    maxBullets = (2 + level > 6) ? 6 : 2 + level;
    enemies = [];
}
function isLevelCleared() {
    return (enemyList.length === 0 && levelEnemiesLeft === 0);
}
function clearEnemies() {
    boss = undefined;
    for(var i = 0; i < enemyList.length; i++) {
        enemyList[i].removeAllBullets();
    }
    enemyList = [];
    enemyContainer.removeAllChildren();
}
var powerup;
function dropPowerup(x, y) {
    if(powerupAvailable) {
        if(Math.floor(Math.random() * 4 + 1) <= 1) {
            powerup = new Powerup(x, y, 'minigun');
            powerupAvailable = false;
        }
    }
}