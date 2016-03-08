function increaseSpeed() {
	if (checkScore()) {
		speed += 1;
		console.log("Speed: " + speed);
	}
}

function increaseBulletSpeed() {
	if (checkScore()) {
		bulletSpeed += 1;
		console.log("Bullet speed: " + bulletSpeed);
	}
}

function upgradeHealth() {
	
}

function regainHealth() {
	
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