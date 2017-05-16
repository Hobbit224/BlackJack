$(document).ready(function(){

	const freshDeck = createDeck();
	// console.log(freshDeck);
	var theDeck = freshDeck;
	var playersHand = []
	var dealersHand = []


	function createDeck(){
		var newDeck = [];
		const suits = ['h','s','d','c'];
		// loop for suits
		for(let s = 0; s < suits.length; s++){
			// loop for card values/inner loop
			for(let c = 1; c <= 13; c++)
				newDeck.push(c + suits[s])
		}
		return newDeck;
	}

	$('.deal-button').click(function(){
		// console.log('User clicked deal')
		// Shuffle the deck
		theDeck = shuffleDeck();
		// the deck is now shuffled
		// update the player and dealer's hands
		removedCard = theDeck.shift()
		playersHand.push(removedCard)

		removedCard = theDeck.shift()
		dealersHand.push(removedCard)

		removedCard = theDeck.shift()
		playersHand.push(removedCard)

		removedCard = theDeck.shift()
		dealersHand.push(removedCard)

		// console.log(playersHand)
		// console.log(dealersHand)

		// console.log(theDeck.length);
		placeCard('player',1,playersHand[0])
		placeCard('dealer',1,dealersHand[0])
		placeCard('player',2,playersHand[1])
		placeCard('dealer',2,dealersHand[1])

		calculateTotal(playersHand, 'player')
		calculateTotal(dealersHand, 'dealer')


	});

	$('.hit-button').click(function(){
		// console.log('User clicked hit');
		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');

	
	});
	$('.stand-button').click(function(){
		console.log('User clicked stand')
		
	});


	function calculateTotal(hand, who){
		// console.log(hand)
		var total = 0;
		// create a temp value for this card's value
		var thisCardValue = 0;
		// Loop through array hand
		// grab the number in the elemnt and add it to the total
		for(let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			// console.log(thisCardValue)
			total += thisCardValue;

		}
		// console.log(total)
		var classSelector = '.' + who + '-total';
		// console.log(classSelector)
		$(classSelector).html(total);
	}


	function placeCard(who, where, cardToPlace){
		var classSelector = '.' + who + '-cards .card-' + where;
		// console.log(classSelector)
		$(classSelector).html('<img src="cards/' + cardToPlace + '.png">')
	}

	function shuffleDeck(){
		// Each tiem we switch 2 elements in the array
		for(let i = 0; i < 50000; i++){
			var randomCard1 = Math.floor(Math.random() * theDeck.length);
			var randomCard2 = Math.floor(Math.random() * theDeck.length);
			// switch theDeck[randomCard1] with theDeck[randomCard2]
			// Stash the value of randomCard1 so we can get it back

			// console.log(theDeck[randomCard1])
			// console.log(theDeck[randomCard2])

			var temp = theDeck[randomCard1]
			// Now it's safe to overwrite
			theDeck[randomCard1] = theDeck[randomCard2]
			// Now we overwrite randomCard2
			theDeck[randomCard2] = temp
			
		}
		// console.log(theDeck);
		return theDeck;
		
	};

});