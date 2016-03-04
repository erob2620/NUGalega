var enemyList = [];
var enemyContainer;
var maxEnemies = 8;
var levelEnemiesLeft = 10;
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
    this.rectangle.graphics.beginFill('#666').drawRect(0, 0, 35, 20);
    this.rectangle.x = this.xPos;
    this.rectangle.y = this.yPos;
    this.rectangle.setBounds(this.xPos, this.yPos, 35, 20);
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
        if(this.yPos > 500) this.die();
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
            // if health goes below 0
            if(this.health === 0) {
                this.die();
                break;
            }
        }
    }
    
}
Enemy.prototype.collisionDetection = function(bullet) {
    //check the bounds of the enemy with reference to the bullet
    if(this.rectangle.x - 10 >= bullet.x + bullet.getBounds().width ||
       this.rectangle.x + this.rectangle.getBounds().width - 10 <= bullet.x ||
       this.rectangle.y - 5 >= bullet.y + bullet.getBounds().height ||
       this.rectangle.y + this.rectangle.getBounds().height <= bullet.y) return false;
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
}
function createEnemy() {
    if(enemyList.length < maxEnemies && levelEnemiesLeft != 0) {
        var enemy = new Enemy(770, 100, 2);
        levelEnemiesLeft--;
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
function isLevelCleared() {
    return (enemyList.length === 0 && levelEnemiesLeft === 0);
}