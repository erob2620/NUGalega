function Boss(xPos, yPos, health, bulletMoveX, bulletMoveY, sprite, spriteType) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.bulletMoveX = bulletMoveX;
    this.bulletMoveY = bulletMoveY;
    this.bullets = [];
    this.health = health;
    this.direction = 1;
    this.moveForward = true;
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
Boss.prototype.spawn = function() {
    //add enemy to enemy list
    enemyList.push(this);
    this.draw();
    console.log('boss spawned');
};
Boss.prototype.shoot = function() {
    var bullet;
    bullet = new Bullet(this.xPos - 9, this.yPos + 11, false, this.bulletMoveX * -1, this.bulletMoveY);
    var secondBullet = new Bullet(this.xPos + 9, this.yPos + 11, false, this.bulletMoveX, this.bulletMoveY);
    var thirdBullet = new Bullet(this.xPos - 75, this.yPos + 11, false, 0, 8);
    var fourthBullet = new Bullet(this.xPos + 75, this.yPos + 11, false, 0, 8);
    var fifthBullet = new Bullet(this.xPos + 115, this.yPos + 11, false, -3, 4);
    var sixthBullet = new Bullet(this.xPos - 115, this.yPos + 11, false, 3, 4);
    this.bullets.push(bullet);
    this.bullets.push(secondBullet);
    this.bullets.push(thirdBullet);
    this.bullets.push(fourthBullet);
    this.bullets.push(fifthBullet);
    this.bullets.push(sixthBullet);
    bullet.add();
    secondBullet.add();
    thirdBullet.add();
    fourthBullet.add();
    fifthBullet.add();
    sixthBullet.add();
};
Boss.prototype.removeBullet = function(bulletIndex) {
    //if bullet moved off screen or hit player remove it
    this.bullets[bulletIndex].remove();
    this.bullets.splice(bulletIndex,1);
};
Boss.prototype.removeAllBullets = function() {
    for(var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].remove();
    }
    this.bullets = [];
}
Boss.prototype.die = function() {
    this.removeAllBullets();
    enemyList.splice(enemyList.indexOf(this), 1);
    enemyContainer.removeChild(this.rectangle);
};
Boss.prototype.move = function() {
    if(!this.moveForward) {
        this.xPos += this.direction * 3;
        this.rectangle.x += this.direction * 3;
        if(this.rectangle.x < 10 || this.rectangle.x > 650) {
            this.direction *= -1;
        }
    } else {
        this.rectangle.y += 3;
        this.yPos += 3;
        this.movedSouthAmount += 3;
        if(this.movedSouthAmount > 50) {
            this.moveForward = false;
            this.movedSouthAmount = 0;
        }
    }
    this.shotTimer++;
    if(this.shotDelay <= this.shotTimer) {
        if(Math.floor(Math.random() * 3 + 1) <= 1) {
            this.shotTimer = 0;
            this.shoot();
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
            if(!this.moveForward)this.takeDamage();
            addScore(5);
            // if health goes below 0
            if(this.health <= 0) {
                this.die();
                addScore(15);
                break;
            }
        }
    }
}
Boss.prototype.collisionDetection = function(bullet) {
    //check the bounds of the enemy with reference to the bullet
    if(this.rectangle.x - 125 >= bullet.x + bullet.getBounds().width ||
       this.rectangle.x + this.rectangle.getBounds().width - 125 <= bullet.x ||
       this.rectangle.y - 25 >= bullet.y + bullet.getBounds().height ||
       this.rectangle.y + this.rectangle.getBounds().height - 25 <= bullet.y) return false;
    return true;
};

Boss.prototype.takeDamage = function() {
    this.health--;
}
Boss.prototype.draw = function() {
    enemyContainer.addChild(this.rectangle);
}