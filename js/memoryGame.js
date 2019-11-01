let trueTiles = [];
let beginX = 5;
let perfectScore = true;
let beginY = 4;
let sizeLimit = 7;
let minY = 4;
let minX = 5;
let minTiles = 3;
let score = 0;
let trial = 1;
let amountOfTiles = 3;
let maxTiles = 10;
let right;
let wrong  = 0;
let soundPlayer = null;


//create first game board
window.addEventListener('load', function() {
    createMemoryBoard(beginX, beginY);
    setTimeout(function() {
        spin();
    }, 3000);
});


//rotate board
function spin() {
    document.getElementById("board").classList.remove('spinBoard');
    document.getElementById("board").classList.add("spinBoard")
}


//termintate game
function closeGame() {
    if (confirm('Are you sure you want to terminate?')) {
		localStorage.setItem("score", score);
        window.location = 'summary.html';
    }
}

// generate a random number
function randomNum(sizeLimit) {
    return Math.floor(Math.random() * sizeLimit);
}


//generating correct tiles
//1 is correct tile
function correctTiles(xSquare, ySquare) {
    for(let i = 0; i < xSquare; i++) {
        trueTiles[i] = [];
        for(let j = 0; j < ySquare; j++) {
            trueTiles[i][j] = 0;
        }
    }

    for(let i = 0; i < amountOfTiles; i++) {
        let x = randomNum(xSquare);
        let y = randomNum(ySquare);
        if (trueTiles[x][y] == 0) {
            trueTiles[x][y] = 1;
        } else {
            i--;
        } 
        right = amountOfTiles;
        console.log(right);
    }
}

//difficulty level options
function difficultyLevel(levelNum) {
	switch (levelNum) {
		//if gameboard and amount of correct tiles are at min or max
		case 0:
			correctTiles(beginX, beginY);
			createMemoryBoard(beginX, beginY);
			perfectScore = true;
			setTimeout(function() {
				spin();
			}, 3000);
			break;
		//not perfect score and decrease amount of correct tiles
		case 1:
			amountOfTiles--;
			correctTiles(beginX, beginY);
			createMemoryBoard(beginX, beginY);
			perfectScore = true;
			setTimeout(function() {
				spin();
			}, 3000);
			break;
		//not perfect score and decrease gameboard size
		case 2:
			if(beginX == beginY){
				beginY--;
				correctTiles(beginX, beginY);
				createMemoryBoard(beginX, beginY);
				perfectScore = true;
				setTimeout(function() {
					spin();
				}, 3000);
			} else {
				beginX--;
				correctTiles(beginX, beginY);
				createMemoryBoard(beginX, beginY);
				perfectScore = true;
				setTimeout(function() {
					spin();
				}, 3000);
			}
			break;
		//perfect score and increase amount of correct tiles
		case 3:
			amountOfTiles++;
			correctTiles(beginX, beginY);
			createMemoryBoard(beginX, beginY);
			setTimeout(function() {
				spin();
			}, 3000);
			break;
		//perfect score and increase size of game board
		case 4:
			if (beginX == beginY) {
				beginX++;
				correctTiles(beginX, beginY);
				createMemoryBoard(beginX, beginY);
				setTimeout(function() {
					spin();
				}, 3000);
			} else {
				beginY++;
				correctTiles(beginX, beginY);
				createMemoryBoard(beginX, beginY);
				setTimeout(function() {
					spin();
				}, 3000);
			}
			break;
	}
}

//determining next game board
function nextLevel() {
	soundEffect(4);
	let level = randomNum(2);
	
    if (perfectScore === false) {
        if (beginX == minX && beginY == minY && amountOfTiles == minTiles) {
			difficultyLevel(0);
		} else if(level == 0){
			if(amountOfTiles > minTiles){
				difficultyLevel(1);
			} else{
				difficultyLevel(2);
			}
		} else {
			if (beginX == minX && beginY ==  minY) {
				difficultyLevel(1);
			} else {
				difficultyLevel(2);
			}
		}
    } else {
		if (beginX >= sizeLimit && beginY >= sizeLimit-1 && amountOfTiles >= maxTiles) {
			difficultyLevel(0);
		} else if(level == 0){
			if(amountOfTiles < maxTiles){
				difficultyLevel(3);
			} else{
				difficultyLevel(4);
			}
		} else {
			if (beginX == sizeLimit && beginY == sizeLimit-1){
				difficultyLevel(3);
			} else {
				difficultyLevel(4);
			}
		}
    }
	trial++;
	document.getElementById('tiles').innerHTML = 'Tiles: ' + amountOfTiles;
	document.getElementById('trial').innerHTML = 'Trial: ' + trial;
}

//erase board
function eraseBoard() {
    while(document.getElementById('board').hasChildNodes()) {
        document.getElementById('board').removeChild(document.getElementById('board').firstChild);
    }
}

//audio options
function soundEffect(soundNum) {
	switch (soundNum) {
		case 0:
			soundPlayer = document.getElementById('soundEffect');
			soundPlayer.play();
			break;
		case 1:
			soundPlayer = document.getElementById('loseSound');
			soundPlayer.play();
			break;
		case 2:
			soundPlayer = document.getElementById('rightSound');
			soundPlayer.play();
			break;
		case 3:
			soundPlayer = document.getElementById('wrongSound');
			soundPlayer.play();
			break;
		case 4:
			soundPlayer = document.getElementById('levelUpSound');
			soundPlayer.play();
			break;
	}
}

//evaluate tile click
function singleScore() {
	 soundEffect(0);
    if (this.classList.contains('correct')) {
        this.classList.remove('return');
        this.classList.add('clickRight');
        score++;
        right--;
		soundEffect(2);
        if (wrong === 0) {
            perfectScore = true;
        }
        console.log(right);
		
    } else if (this.classList.contains('incorrect')) {
        this.classList.add('clickWrong');
        score--;
		if (score > 0) {
			soundEffect(3);
		}
        perfectScore = false;
        wrong++;
        if (wrong !== 0) {
            perfectScore = false;
        }
        if(score == 0 || score < 0) {
			localStorage.setItem("score", score);
            alert('You lose');
			window.location = "summary.html"
        }
    }

    if (right == 0) {
        setTimeout(function () {
            eraseBoard();
    
        }, 2000);

       setTimeout(function() {
            nextLevel();
            document.getElementById('board').classList.remove('spinBoard');
        }, 3000);
    }

    document.getElementById('score').innerHTML = 'Score: ' + score;
} 

// create game board 
function createMemoryBoard(width, height) {
    correctTiles(beginX, beginY);
    let board = document.getElementById('board');
    board.innerHTML = '';

    for (let i = 0; i < width; i++) {
        let br = document.createElement('br');
        board.appendChild(br);
        let x = document.createElement('div');
        x.className = 'box';
        for (let j = 0; j < height; j++) {

            let y = document.createElement('div');
            y.className = 'box';

            x.onclick = singleScore;
            y.onclick = singleScore;

            if (trueTiles[i][j] == 1) {
                y.classList.add('correct');
                x.classList.add('incorrect');
            } else {
                y.classList.add('incorrect');
                x.classList.add('incorrect');
            }

            if(y.classList.contains('correct')) {
                y.classList.add('clickRight');
                setTimeout(function() {
                    y.classList.remove('clickRight');
                    y.classList.add('return');
                }, 2000);
            }
            board.appendChild(x);
            board.appendChild(y);
        }
    }
}



