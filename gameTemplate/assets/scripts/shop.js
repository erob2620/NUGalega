function increaseSpeed() {
	if (checkScore()) {
    	writeScore();
		score -= 100;
		console.log("score: " + score);
		speed += 1;
		console.log("Speed: " + speed);
	}
}

function increaseBulletSpeed() {
	if (checkScore()) {
		if(shootSpeed > .3) {
            shootSpeed -= .1;
			score -= 100;
            writeScore();
        } 
		console.log("Bullet speed: " + shootSpeed);
	}
}

function regainHealth() {
	if (checkScore()) {
		if (currentHealth < maxHealth) {
			writeScore();
			score -= 100;
			console.log("score: " + score);
			currentHealth++;
			console.log("Health: " + currentHealth);
		} else {
			console.log("Full health already");
		}
	}
}

function checkScore() {
	if (score >= 100) {
		return true;
	} else { 
		console.log("not enough score");
		return false; 
	}
}
function damage(time){
    currentHealth--;
    stage.removeChild(healthNodes[0]);
    healthNodes.splice(0,1);
    deathSound.play();
    //hitTime = time;
    console.log(healthNodes.length);
}