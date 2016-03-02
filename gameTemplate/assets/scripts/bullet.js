function Bullet(xPos, yPos, isPlayerBullet) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.playerBullet = isPlayerBullet;
}
Bullet.prototype.move = function() {
    if(this.playerBullet)? this.yPos-- : this.yPos++;
}