var bulletSpeed = 5;

function Bullet(xPos, yPos, isPlayerBullet) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.playerBullet = isPlayerBullet;
    this.bulletShape = new createjs.Shape();
    this.bulletShape.graphics.beginFill('#000').drawRect(0, 0, 5, 10);
    this.bulletShape.x = this.xPos;
    this.bulletShape.y = this.yPos;
    this.bulletShape.setBounds(this.xPos, this.yPos, 5, 10);
    this.bulletShape.regX = this.bulletShape.getBounds().width/2;
    this.bulletShape.regY = this.bulletShape.getBounds().height/2;
}
Bullet.prototype.move = function() {
    this.bulletShape.y = (this.playerBullet)? this.bulletShape.y - bulletSpeed : this.bulletShape.y + bulletSpeed;
}
Bullet.prototype.remove = function() {
    enemyContainer.removeChild(this.bulletShape);
}
Bullet.prototype.add = function() {
    enemyContainer.addChild(this.bulletShape);
}