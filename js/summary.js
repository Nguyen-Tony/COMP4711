let score = 0;
let soundPlayer = null;

function getScore() {
	playerScore = window.localStorage.getItem('score')
	console.log(score);
	let htmlScore = document.getElementById('currentScore').innerHTML;
	document.getElementById('currentScore').innerHTML = htmlScore + playerScore ;
}

function sendScore() {
	document.getElementById("hiddenScore").value = playerScore;
}

function playAgain() {
	window.location = 'index.html';
}

function submit() {
	window.location = 'leaderboard.html';
}

window.onload = function() {
	var context = new AudioContext();
	soundPlayer = document.getElementById('loseSound');
	soundPlayer.play();
}

window.addEventListener('load', function() {
    getScore();
	sendScore();
	console.log(playerScore);
});