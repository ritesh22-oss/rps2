// fungsi untuk balik ke menu utama/refresh
function backMenu(){
	window.location.reload();
}

// Untuk beralih mode 
const toggleMode = () => {
	const select = [document.getElementById("titleMenu"),document.getElementById("titleGame"),document.getElementById("titleInfo")];
	const scoreboard = [document.getElementById("scores"),document.getElementById("inform")];
	const text = document.getElementById("miniText");
	const modebutton = document.querySelector(".darkmode")
	const menu = document.getElementById("menu");
	const allButton = [document.getElementById("rock"),document.getElementById("paper"),document.getElementById("scissor")];
	const menuButton = [document.getElementById("playButton"),document.getElementById("exitButton"),document.getElementById("infoButton"),,document.getElementById("backMenu")]
	const finalButton = [,document.getElementById("reset"),document.getElementById("mainMenu")]
	if (document.body.style.backgroundImage=="linear-gradient(to right bottom, rgb(255, 255, 255), rgb(211, 216, 238))"){
		document.body.style.backgroundImage="linear-gradient(to right bottom, #191b2a, #122a3b)";
		modebutton.src = `dark_mode.png`;
		menu.classList.remove("menu-light"); 	 menu.classList.add("menu");
		text.classList.remove("miniText-light"); text.classList.add("miniText");
		games.classList.remove("game-light");    games.classList.add("game");
		scoreboard.forEach(element => {
			element.classList.remove("score-light");
			element.classList.add("score")});
		select.forEach(element=>{
			element.classList.remove("title-light");
			element.classList.add("title");
		})
		allButton.forEach((buttons)=>{
			buttons.classList.remove("button-light");
			buttons.classList.add("button");}
			)
		finalButton.forEach((buttons)=>{
			buttons.classList.remove("finalButton-light");
			buttons.classList.add("finalButton");}
			)
		menuButton.forEach((buttons)=>{
			buttons.classList.remove("menuButton-light");
			buttons.classList.add("menuButton");}
			)
		}
	else{
		modebutton.src = `light_mode.png`;
		document.body.style.backgroundImage="linear-gradient(to right bottom, #ffffff, #d3d8ee)";
		menu.classList.remove("menu"); 		menu.classList.add("menu-light");
		text.classList.remove("miniText");	text.classList.add("miniText-light");
		games.classList.remove("game"); 	games.classList.add("game-light");
		select.forEach(element=>{
			element.classList.remove("title");
			element.classList.add("title-light");
		})
		scoreboard.forEach(element => {
			element.classList.remove("score");
			element.classList.add("score-light");	
		});
        allButton.forEach((buttons)=>{
			buttons.classList.remove("button");
			buttons.classList.add("button-light");}
			)
		finalButton.forEach((buttons)=>{
			buttons.classList.remove("finalButton");
			buttons.classList.add("finalButton-light");}
			)
		menuButton.forEach((buttons)=>{
			buttons.classList.remove("menuButton");
			buttons.classList.add("menuButton-light");}
			)
		}
}

// Untuk menentukan pemenang pada hasil akhir
const gameOver = (playerTurn,movesLeft) => {
	const chooseMove = document.querySelector('.move');
	const result = document.querySelector('.result');
	const resetButton = document.querySelector('#reset');
	const backButton = document.querySelector('#mainMenu');
	const timeLeft = document.querySelector('#countdown');
	//mematikan hitung mundur
	stop();	
	// menghilangkan setiap tombol button hand, tampilan Move Left sisa dan waktu countdown
	playerTurn.forEach(action => {
		action.style.display = 'none';
	})
	movesLeft.style.display = 'none';
	timeLeft.style.display = 'none';

	// Menampilkan game over
	chooseMove.innerText = 'Game Over!!'
	// Memperbesar ukuran font hasil akhir
	result.style.fontSize = '2rem';

	// Kalkulasi dan aksi terhadap hasil akhir
	if(playerScore > botScore){
		result.innerText = 'You are the winner !!!'
	}
	else if(playerScore < botScore){
		result.innerText = 'Bot is the winner !!';
	}
	else{
		result.innerText = 'Draw match';
	}
	// menampilkan tombol reset dan back to menu utama
	resetButton.style.display = 'flex';
	backButton.style.display = 'flex';

	//aksi tombol reset
	resetButton.addEventListener('click',()=>{
		const playerScoreBoard = document.querySelector('.playerPoint');
		const botScoreBoard = document.querySelector('.botPoint');
		const playerHand = document.querySelector('.player-hand');
		const botHand = document.querySelector('.bot-hand');
		// Menampilkan kembali button rock paper scissor
		playerTurn.forEach(action => {
			action.style.display = 'flex';
		})
		chooseMove.innerText = 'Choose Your Attempt!!'
		// Menghilangkan button reset dan main menu
		resetButton.style.display = 'none';
		backButton.style.display = 'none';
		// reset kondisi semula
		playerScore = 0;
		botScore = 0;
		moves = 5;
		result.style.fontSize = '1.2rem';
		movesLeft.style.display = 'flex';
		timeLeft.style.display = 'flex';
		movesLeft.innerText = `Move Left : ${moves}`;
		document.getElementById("countdown").innerText = `Timer Left : 10 s`;
		result.innerText = '';
		playerHand.src = `rockmatch.png`;
		botHand.src = `rockmatch.png`;
		botScoreBoard.textContent = botScore;
		playerScoreBoard.textContent = playerScore;
		// memulai hitung mundur
		start();
})
	// aksi button balik ke menu utama 
	backButton.addEventListener('click',function(){
		window.location.reload();
	})
}

//tampilan menu utama 	
const menu = () => {
	const playBtn = document.querySelector("#playButton");
	const infoBtn = document.querySelector("#infoButton");
	const game = document.querySelector(".game");
	const menu = document.querySelector(".menu");
	const tutorial = document.querySelector(".tutorial");
	const exitButton = document.querySelector("#exitButton");
	// Aksi masuk ke game
	playBtn.addEventListener('click',() => {
		menu.style.display = "none";
		game.style.display = "flex";
		// memulai hitung mundur
		start();
	})
	// Aksi masuk ke demo tutorial
	infoBtn.addEventListener('click',() => {
		menu.style.display = "none";
		tutorial.style.display = "flex";
	});
	// AKsi exit close the window
	exitButton.addEventListener('click',() => {
		window.close();
	}) // aku gak ngerti kenapa kadang gak berfungsi ya
}

var timer;
var timeLeft;
// memulai countdown
const start = () =>{
	var value = true
	const result = document.querySelector('.result');
	const botScoreBoard = document.querySelector('.botPoint');
	const movesLeft = document.querySelector('.movesleft');
	const playerTurn = [document.querySelector('#rock'),document.querySelector('#paper'),document.querySelector('#scissor')];
	timeLeft = 10;
	timer = setInterval(()=>{
		document.getElementById("countdown").innerText = `Timer Left : ${timeLeft} s`;
		// Aksi ketika waktu telah habis
		if (timeLeft == 0){
			// menghentikan hitung mundur
			stop();
			// Player dipaksa kalah dengan tampilan batu oleh player dan kertas oleh bot
			document.querySelector('.player-hand').src = `rockmatch.png`;
			document.querySelector('.bot-hand').src = `papermatch.png`;
			// Move left berkurang
			moves -= 1;
			movesLeft.innerText = `Move Left : ${moves}`;
			document.getElementById("countdown").innerText = `Times Up !!!`;
			// Penambahan skor bot dan aksi kekalahan
			botScore += 1;
			botScoreBoard.textContent = botScore;
			result.textContent = 'You Lose';
			// ketika moveLeft telah habis
			if(moves == 0){
				gameOver(playerTurn,movesLeft);
				// tidak perlu rekursi countdown
				value = false;
			}
			// rekursi countdown
			if(value == true){
			start();
			}
		}
	// pengurangan timeLeft tiap detik
	timeLeft -= 1;
	}, 1000);
}

//fungsi untuk menghentikan countdown
const stop=()=>{
	clearInterval(timer);
}

//game
var moves;
var botScore;
var playerScore;
const game = () => {
	//skor bot, player, dan moveLeft
	moves = 5;
	botScore = 0;
	playerScore = 0;
	// Deklarasi awal button player
	const playGame = () => {
		const rockButton = document.querySelector('#rock');
		const paperButton = document.querySelector('#paper');
		const scissorButton = document.querySelector('#scissor');
		const playerTurn = [rockButton,paperButton,scissorButton];
		const botTurn = ['rock','paper','scissors'];
		const playerHand = document.querySelector('.player-hand');
		const botHand = document.querySelector('.bot-hand');
		const hands = document.querySelectorAll('.popUp img');;
		
		// Aksi untuk tiap button
		playerTurn.forEach(action => {
			action.addEventListener('click',function(){
				const movesLeft = document.querySelector('.movesleft');
				moves -= 1;
				movesLeft.innerText = `Move Left : ${moves}`;
				// pilihan random bot
				const botChoice = botTurn[Math.floor(Math.random()*3)];
				// Mematikan fungsionalitas button ketika animasi
				playerTurn.forEach(buttons => {
					buttons.disabled = true;
				})
				// Menampilkan tampilan batu ketika animasi
				playerHand.src = `rockmatch.png`;
                botHand.src = `rockmatch.png`;
				// proses setelah animasi
				setTimeout(() => {
					// call fungsi untuk cek pemenangnya siapa
					winner(this.innerText,botChoice);
					// mengaktifkan kembali button
					playerTurn.forEach(buttons => {
						buttons.disabled = false;
					})
					// menampilkan gambar hasil pertandingan
					playerHand.src = `${this.innerText}match.png`;
                	botHand.src = `${botChoice}match.png`;
					// Deklarasi kalau jatah giliran sudah habis
					if(moves == 0){
						gameOver(playerTurn,movesLeft);
					}
				}, 2000);
				// Proses selama animasi 
				//menghentikan intercval
				stop();
				playerHand.style.animation = 'shakePlayer 2s ease';
				botHand.style.animation = 'shakeBot 2s ease';
			})
		})
		// animasi untuk setiap gambar
		hands.forEach(hand => {
			hand.addEventListener('animationend', function(){
				this.style.animation = "";
			});
		});
		
	}
	// Fungsi untuk menentukan pemenang
	const winner = (player,bot) => {
		const result = document.querySelector('.result');
		const playerScoreBoard = document.querySelector('.playerPoint');
		const botScoreBoard = document.querySelector('.botPoint');
		start();
		//Kasus Tie
		if(player == bot){
			result.textContent = 'Tie'
		}
		//Kasus You Lose
		else if(player == 'paper' && bot == 'scissors' ||
				player == 'scissors' && bot == 'rock' ||
				player == 'rock' && bot == 'paper'){
				result.textContent = 'You Lose';
				botScore += 1;
				botScoreBoard.textContent = botScore;
		}
		//Kasus You Win
		else{
				result.textContent = 'You Win'
				playerScore += 1;
				playerScoreBoard.textContent = playerScore;
		}
	}
	// Mulai Game
	playGame();
}
// Mulai panggil Frame
menu();
game();