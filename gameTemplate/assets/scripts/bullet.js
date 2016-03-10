var bulletSpeed = 6;

function Bullet(xPos, yPos, isPlayerBullet, moveX, moveY) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.moveX = moveX;
    this.moveY = moveY;
    this.playerBullet = isPlayerBullet;
    this.bulletShape = new createjs.Shape();
    this.bulletShape.graphics.beginFill('#000').drawRect(0, 0, 5, 10);
    this.bulletShape.x = this.xPos;
    this.bulletShape.y = this.yPos;
    this.bulletShape.setBounds(this.bulletShape.x, this.bulletShape.y, 5, 10);
    this.bulletShape.regX = this.bulletShape.getBounds().width/2;
    this.bulletShape.regY = this.bulletShape.getBounds().height/2;
}
Bullet.prototype.move = function() {
    this.bulletShape.y = (this.playerBullet)? this.bulletShape.y - this.moveY : this.bulletShape.y + this.moveY;
    this.bulletShape.x += this.moveX;
}
Bullet.prototype.remove = function() {
    enemyContainer.removeChild(this.bulletShape);
}
Bullet.prototype.add = function() {
    enemyContainer.addChild(this.bulletShape);
}