$(document).ready(function(){





	////////////////MAIN VARIABLES////////////////

	const freshDeck = createDeck();
	var playersHand =[];
	var dealersHand =[];
	var theDeck = freshDeck.slice();
	var gameStart=false;
	var playerBank = 100;
	var dealerbank = 1000;

	$('.deal-button').click(function(){
		// console.log('User clicked deal')
		// theDeck = shuffleDeck();
		reset();
		console.log(theDeck);
		// Remove top car and give it to the player or the dealer
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		// Change DOM to add images

		placeCard('player',1,playersHand[0])
		placeCard('player',2,playersHand[1])

		placeCard('dealer',1,dealersHand[0])
		placeCard('dealer',2,dealersHand[1])

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
		gameStart=true;
		$('.bet-total').html('')
		// checkWin();
	});

	$('.hit-button').click(function(){
		// console.log('User clicked hit')
		var playerTotal = calculateTotal(playersHand, 'player')
		if(playerTotal < 21){
			playersHand.push(theDeck.shift());
			placeCard('player', playersHand.length,playersHand[playersHand.length-1]);
			playerTotal = calculateTotal(playersHand, 'player');
		}
		// checkWin();
		
	});

	$('.stand-button').click(function(){
		// console.log('User clicked stand')
		var dealerTotal = calculateTotal(dealersHand, 'dealer')
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			placeCard('dealer', dealersHand.length,dealersHand[dealersHand.length-1])
			dealerTotal = calculateTotal(dealersHand, 'dealer')
		};
		checkWin();

	});


	$('.bet-10-button').click(function(){
		addBet(10);
	});

	$('.bet-25-button').click(function(){
		addBet(25);
	});
	$('.bet-50-button').click(function(){
		addBet(50);
	});



	////////////////UTILITY FUNCTIONS////////////////


	function addBet(amount){
		if(gameStart==true){
			$('.bet-total').html('You have bet $'+amount)
		}
	};


	function reset(){
		// In order to reset the game we need to:
		// 1. Reset the Deck 
		theDeck = freshDeck.slice();
		shuffleDeck();
		// 2. reset the hand arrays
		playersHand = [];
		dealersHand = [];
		// 3. reset the cards in the document
		$('.card').html('');
		// 4.reset the totals
		$('.dealer-total-number').html('0');
		$('.message').html('');
	};

	function checkWin(){
		var playerTotal = calculateTotal(playersHand, 'player')
		var dealerTotal = calculateTotal(dealersHand, 'dealer')
		var winner = ""
		if(playerTotal > 21){
			winner = "You busted, the dealer wins."
		}else if(dealerTotal > 21){
			winner = "The dealer busted, you win!"
		}else if ((playerTotal == 21) && (playersHand.length==2) && (dealerTotal!=21)) {
			winner = "Blackjack! You win!"
		}else{
			if((playerTotal > dealerTotal) && (dealerTotal >=17)){
			winner = "You win!"
			}
			else if((dealerTotal > playerTotal)){
			winner = "You lose."
			}
			else{
				winner = "It's a push."
			}

		}
		$('.message').text(winner)
		
	}

	function calculateTotal (hand, who){
		// console.log(hand)
		var totalHandValue = 0;
		var thisCardValue = 0;
		var hasAce = false;
		var totalAces = 0;
		for(let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			if (thisCardValue > 10){
				thisCardValue = 10;
			}else if(thisCardValue == 1){
				hasAce = true;
				totalAces++;
				thisCardValue = 11;
			}

			totalHandValue += thisCardValue;

		};
		for(let i = 0; i<totalAces; i++){
			if(totalHandValue > 21){
			totalHandValue -= 10;
			};
		};
		

		var totalToUpdate = '.'+who+'-total-number';
		$(totalToUpdate).text(totalHandValue);
		return totalHandValue;
	};


	function placeCard(who, where, what){
		// Find the DOM elements based on the args that we want to Change
		// i.e. find where to put the picture
		var slotForCard = '.' + who + '-cards .card-' + where;
		// console.log(slotForCard);
		imageTag = '<img src="cards/'+what+'.png">';
		$(slotForCard).html(imageTag)
	};

	function createDeck(){
		var newDeck = [];
		// Two loops, one for suit, one for card value
		var suits = ['h','s','d','c']
		// Outer loop which iterates the suit/letter
		for(let s = 0; s < suits.length; s++){
			// InnerLoop which iterates the value/number
			for(let c = 1; c <= 13; c++){
				// Push value + suit onto newDeck
				newDeck.push(c+suits[s])
			};
		};
		return newDeck;

	};
	// console.log(freshDeck)





	function shuffleDeck(){
		// Swap 2 elements many many times
		for(let i = 0; i < 14000; i++){
			var random1 = Math.floor(Math.random() * 52);
			var random2 = Math.floor(Math.random() * 52);
			var temp = theDeck[random1];
			theDeck[random1] = theDeck[random2];
			theDeck[random2] = temp;
			// console.log('test')
		};
		return theDeck;
	};

	

});