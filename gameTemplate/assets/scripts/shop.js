function increaseSpeed() {
	if (checkScore()) {
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
}

function checkScore() {
	if (score >= 100) {
		score -= 100;
		console.log("score: " + score);
		return true;
	} else { 
		console.log("not enough score");
		return false; 
	}
}