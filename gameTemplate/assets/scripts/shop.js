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
		if(shootSpeed > .3) shootSpeed -= .1;
		console.log("Bullet speed: " + shootSpeed);
	}
}

function upgradeHealth() {
	health++;
}

function regainHealth() {
	health++;
    	writeScore();
		score -= 100;
		console.log("score: " + score);
		bulletSpeed += 1;
		console.log("Bullet speed: " + bulletSpeed);
}

function regainHealth() {
	if (checkScore()) {
		if (currentHealth < 5) {
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