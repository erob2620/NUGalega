var powerupAvailable = true;
var previousSpeed;
function Powerup(x, y, type) {
    this.type = type;
    this.timeLeft = 3;
    this.isActive = false;
    this.rectangle = new createjs.Shape();
    this.rectangle.graphics.beginFill('#44A').drawRect(0, 0, 15, 15);
    this.rectangle.x = x;
    this.rectangle.y = y;
    this.rectangle.setBounds(x, y, 15, 15);
    this.rectangle.regX = this.rectangle.getBounds().width/2;
    this.rectangle.regY = this.rectangle.getBounds().height/2;
    this.spawn();
}
Powerup.prototype.spawn = function() {
    stage.addChild(this.rectangle);
}
Powerup.prototype.activate = function() {
    previousSpeed = shootSpeed;
    shootSpeed = .1;
    this.isActive = true;
}
Powerup.prototype.deActivate = function() {
    shootSpeed = previousSpeed;
    powerupAvailable = true;
    this.isActive = false;
}
Powerup.prototype.move = function() {
    if(this.rectangle.x != -50) {
        this.rectangle.y += 6;
        if(this.collisionDetection()) {
            stage.removeChild(this.rectangle);
            this.activate();
            this.rectangle.x = -50;
            this.rectangle.y = -50;
        } else if (this.rectangle.y > 590) {
            this.rectangle.x = -50;
            this.rectangle.y = -50;
            stage.removeChild(this.rectangle);
            powerupAvailable = true;
        }
    }
    
}
Powerup.prototype.countDown = function() {
    this.timeLeft--;
    if(this.timeLeft == 0) {
        this.deActivate();
    }
}
Powerup.prototype.collisionDetection = function() {
    if(this.rectangle.x - 5 >= ship.x + ship.getBounds().width - 35 ||
       this.rectangle.x + this.rectangle.getBounds().width - 5 <= ship.x - 35 ||
       this.rectangle.y - 5 >= ship.y + ship.getBounds().height ||
       this.rectangle.y + this.rectangle.getBounds().height <= ship.y) return false;
    return true;
}
function clearPowerup() {
    if(powerup != undefined && powerup.rectangle.x != -50) {
        stage.removeChild(powerup.rectangle);
    }
    if(powerup != undefined && powerup.isActive) {
        powerup.deActivate();
    }
}