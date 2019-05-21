 //open Overlay to change the player's name
 function OverlayOpen(){
	$("#overlayBackground").css("display","block");
	
	// Names in the input field for player 1
	var player1 = $("#nameOfPlayer1").text();
	$("#playerName1").val(player1)
	
	// Names in the input field for player 2
	var player2 = $("#nameOfPlayer2").text();
	$("#playerName2").val(player2)
}
 
// overlay is not open to change player's name
function OverlayClose() {
  $("#overlayBackground").css("display","none");
}

//save button
function Namechange() {
	//Change name player 1
	$("#nameOfPlayer1").empty();
	var player1 = $("#playerName1").val();
	$('#nameOfPlayer1').append(player1)
	
	//Change name player 2
	$("#nameOfPlayer2" ).empty();
	var player2 = $("#playerName2").val();
	$("#nameOfPlayer2").append(player2)
		
	 $("#overlayBackground").css("display","none");
} 

//INITIALIZATION OF GAMES PIECES 

//Mainclass for for weapon and players
class Piece {
	constructor(symbol, damage){
		this.symbol = symbol;
		this.damage = damage
	}
	
	randomCurrentPosition(){
		return this.currentPosition = Math.floor(Math.random() * 90) + 1;
	}
}

var Weapon1 = new Piece('<i class="fas fa-hammer"></i>', 32);
var Weapon2 = new Piece('<i class="fas fa-bomb"></i>', 40);
var Weapon3 = new Piece('<i class="fas fa-broom"></i>', 20);
var Weapon4 = new Piece('<i class="fas fa-gavel"></i>', 26);

var allWeapon = [Weapon1, Weapon2, Weapon3, Weapon4]

class Player extends Piece{
	constructor(symbol, damage, cssDesign, energy, hasWeapon, hasOldWeapon){;
		super(symbol, damage);
		
		this.cssDesign = cssDesign;
		this.energy = energy;
		this.hasWeapon = hasWeapon;
		this.hasOldWeapon = hasOldWeapon;
		// player don't change the row if player go further and player don't fight if another player one case front of the other row
		this.plusOne = [11,21,31,41,51,61,71,81,91];
		//player don't change the row if player go back and player don't fight if another player one case back on the other row		
		this.minusOne = [10,20,30,40,50,60,70,80]
	
	}
	
	//Cases around a player
	aroundPlayer(){	
	this.around = []
		//case over the player
		this.around.push(this.currentPosition - 10);
		//case right of the player and check: no case for the next row
		if(!this.minusOne.includes(this.currentPosition)){
			this.around.push(this.currentPosition + 1);
		}
		//case under the player
		this.around.push(this.currentPosition + 10);
		//case left the player and check: no case for the row before
		if(!this.plusOne.includes(this.currentPosition)){
			this.around.push(this.currentPosition - 1);
		}
		return this.around
	}	
}

var Player1 = new Player('<i class="fas fa-snowman"></i>', 10, "firstPlayerDesign", 100, false, false)
var Player2 = new Player('<i class="fas fa-snowman"></i>', 10, "secondPlayerDesign", 100, false, false)

var allPlayer = [Player1, Player2]

//cases of the mountain 
var mountainPostionNumber = []

// the other player is on the turn
function OtherPlayer(p){
	var p = p 
	var other = "";
	if(p == 0){
		other = 1;
		return other
	}else {
		other = 0;
		return other
	}	
}
 
// GAME START
function start(){
	
	// Restart after the first play
	if(allPlayer[0].currentPosition != undefined){
		$("#overlaybackgroundDeath").css("display","none");
		for(var i = 0; i < 2; i++){
			var place = i + 1
			allPlayer[i].energy = 100;
			allPlayer[i].damage = 10
			allPlayer[i].hasWeapon = false;
			allPlayer[i].hasOldWeapon = false
			allPlayer[i].oldWeaponPostion = null
			allPlayer[i].LastCurrentPosition = null
			allPlayer[i].currentPosition = null
			allPlayer[i].currentBetweenPostion = null
			allPlayer[i].betweenPostion = null
			allPlayer[i].possibleMove = null
			$("#energyPlayer" + place).text(allPlayer[i].energy + " %")
			$("#energyPlayer" + place).attr("style", "width:" + allPlayer[i].energy + "%");
			$("#" + "case" + allPlayer[i].currentPosition).children().remove()
			$("#WeaponOfPlayer" + place).removeClass("weaponDesign").children().remove()		
		}
		
		for(var i = 1; i < 91; i++){
			$("#" + "case" + [i]).children().remove()
			$("#" + "case" + [i]).removeClass("possibleMoving").removeClass("weaponDesign")
			$("#" + "case" + [i]).removeClass("mountainDesign")
			$("#" + "case" + [i]).removeClass("secondPlayerDesign")
			$("#" + "case" + [i]).removeClass("firstPlayerDesign")
			$("#" + "case" + [i]).off("click");
		}
	mountainPostionNumber = []
	}
	
	var allStartPosition = []
	var allWeaponPosition = []

	
	
	 //create mountains
	CreateMountains();
	//add mountain position to one item
    allStartPosition = mountainPostionNumber
	// create weapons
	CreateWeapon(allWeaponPosition, allStartPosition);
	//add weapon position to one item
	allStartPosition = allStartPosition.concat(allWeaponPosition)
	// create player
	PlayerPostion(allStartPosition);
	
	//p = current player
	var p = 0;
	Play(p)	
} 
 
function CreateMountains(){
	var min = 1;
	var max = 11;
	var mountainNumber = 0;
	 
	for(var i = 0; i < 9; i++){
		var randomNumber = Math.floor(Math.random() * (max - min) ) + min;
		 //add to the array for all cases of the mountain 
		 mountainPostionNumber[i] = randomNumber; 
		//visible the mountain on the board
		$('#' + "case" + randomNumber).addClass("mountainDesign").append('<i class="fas fa-mountain mountainDesign"></i>'); 
		min += 10;
		max += 10;
		mountainNumber++;
	};   
};

function CreateWeapon(allWeaponPosition, allStartPosition) {

	for (var i=0; i < allWeapon.length; i++){
		allWeapon[i].randomCurrentPosition()  
			while( allWeaponPosition.includes(allWeapon[i].currentPosition) || (allStartPosition.includes(allWeapon[i].currentPosition)) ){	
				allWeapon[i].randomCurrentPosition()   
			};
		$("#" + "case" + allWeapon[i].currentPosition).addClass("weaponDesign").append(allWeapon[i].symbol);
		allWeaponPosition.push(allWeapon[i].currentPosition);	
	};
};

function PlayerPostion(allStartPosition) {
	for(var i = 0; i < allPlayer.length; i++){
		allPlayer[i].randomCurrentPosition()
		while( allStartPosition.includes(allPlayer[i].currentPosition) ){
			allPlayer[i].randomCurrentPosition()
			};
		$("#" + "case" + allPlayer[i].currentPosition).addClass(allPlayer[i].cssDesign).append(allPlayer[i].symbol);
		//only Player 1. Push the postion of player 1 and the cases around the first player in the array to check that the player is not on the same case like the player 1 and the players are not besides 
		if(i == 0){
		allStartPosition.push(allPlayer[i].currentPosition) 
		allStartPosition = allStartPosition.concat(allPlayer[i].aroundPlayer())				
		}
	}
};

function Play (p){
	var other = OtherPlayer(p)
	
	//Initialize the current position as the last current position for taking Weapon on the way
	allPlayer[p].LastCurrentPosition = allPlayer[p].currentPosition
	PlayerMoving(p, other)
}

function PlayerMoving(p, other){
	allPlayer[p].possibleMove = [];
	//initial for the 2d array
	for (var i = 0;  i < 4 ; i++) {			
		allPlayer[p].possibleMove.push([i])
	}

	// possible Move up
	var directionPosition = 0
	for (var i = 0; i < 3; i++){
		directionPosition = directionPosition - 10;
		allPlayer[p].possibleMove[0][i] = allPlayer[p].currentPosition + (directionPosition);	
		if((allPlayer[p].possibleMove[0][i] > 0) && (allPlayer[p].possibleMove[0][i] != allPlayer[other].currentPosition) && !mountainPostionNumber.includes(allPlayer[p].possibleMove[0][i])){
			$("#" + "case" + allPlayer[p].possibleMove[0][i]).addClass("possibleMoving")
			document.getElementById("case"+ allPlayer[p].possibleMove[0][i]).addEventListener("click", MoveClick(allPlayer[p].possibleMove[0][i], p))
		} else {
			break
		}
	}	
	
	// possible Move right
	var directionPosition = 0
	for (var i = 0; i < 3; i++){
		directionPosition = directionPosition + 1
		
		allPlayer[p].possibleMove[1][i] = allPlayer[p].currentPosition + directionPosition;	
		if(!allPlayer[p].plusOne.includes(allPlayer[p].possibleMove[1][i]) && (allPlayer[p].possibleMove[1][i] != allPlayer[other].currentPosition) && !	mountainPostionNumber.includes(allPlayer[p].possibleMove[1][i])){
			$("#" + "case" + allPlayer[p].possibleMove[1][i]).addClass("possibleMoving");			
			document.getElementById("case"+ allPlayer[p].possibleMove[1][i]).addEventListener("click", MoveClick(allPlayer[p].possibleMove[1][i], p))	
		} else {
			break
		}
	}
	
	// possible Move down
	var directionPosition = 0
	for (var i = 0; i < 3; i++){
		directionPosition = directionPosition + 10
		allPlayer[p].possibleMove[2][i] = allPlayer[p].currentPosition + directionPosition;	
		if((allPlayer[p].possibleMove[2][i] < 91) && (allPlayer[p].possibleMove[2][i] != allPlayer[other].currentPosition) && !mountainPostionNumber.includes(allPlayer[p].possibleMove[2][i])){
			$("#" + "case" + allPlayer[p].possibleMove[2][i]).addClass("possibleMoving")
			document.getElementById("case"+ allPlayer[p].possibleMove[2][i]).addEventListener("click", MoveClick(allPlayer[p].possibleMove[2][i], p))
		} else {
			break
		}
	}
	
	// possible Move left
	var directionPosition = 0
	for (var i = 0; i < 3; i++){
		directionPosition = directionPosition - 1
		allPlayer[p].possibleMove[3][i] = allPlayer[p].currentPosition + directionPosition;	
		if(!allPlayer[p].minusOne.includes(allPlayer[p].possibleMove[3][i]) && (allPlayer[p].possibleMove[3][i] != allPlayer[other].currentPosition) && !mountainPostionNumber.includes(allPlayer[p].possibleMove[3][i])){
			$("#" + "case" + allPlayer[p].possibleMove[3][i]).addClass("possibleMoving")
			document.getElementById("case"+ allPlayer[p].possibleMove[3][i]).addEventListener("click", MoveClick(allPlayer[p].possibleMove[3][i], p))  
		} else {
			break
		}
	}
}

function MoveClick(field, p, oldPosition){ 
	$("#" + "case" + field).on("click", function(){
		//remove the visibled piece of the player
		$("#" + "case" + allPlayer[p].currentPosition).removeClass(allPlayer[p].cssDesign).children().remove(":first");
		//Player has a new Postion
		allPlayer[p].currentPosition = field
		//visble piece of the player to the new position 
		$("#" + "case" + field).addClass(allPlayer[p].cssDesign).append(allPlayer[p].symbol);
		//remove all possible postion of the player with CSS classes
		for (var i = 0 ; i < allPlayer[p].possibleMove.length; i++){
			for(var j = 0; j < allPlayer[p].possibleMove[i].length; j++){
				$("#" + "case" + allPlayer[p].possibleMove[i][j]).off("click");
				$("#" + "case" + allPlayer[p].possibleMove[i][j]).removeClass("possibleMoving");
			}
		} 
		PlayerTakeWeapon(p, oldPosition)
	});
}

function PlayerTakeWeapon(p){
	//Player name for Weapon class of the navigation
	var cssNamePlayer = p + 1 
	
	//Postion between old position and new postion of the player
	allPlayer[p].betweenPostion = allPlayer[p].currentPosition - allPlayer[p].LastCurrentPosition 
	
	// To get the loops for up or down moving 
	if (Math.abs(allPlayer[p].betweenPostion) == 10 || Math.abs(allPlayer[p].betweenPostion) == 20 || Math.abs(allPlayer[p].betweenPostion) == 30) {
		var loopsForMoving = allPlayer[p].betweenPostion / 10  
		loopsForMoving = Math.abs(loopsForMoving)
	// To get the loops for right or left moving 	
	}else{
		loopsForMoving = allPlayer[p].betweenPostion   
		loopsForMoving = Math.abs(loopsForMoving)	
	}
		
	for(var k = 1 ; k <= loopsForMoving; k++){
		//different to the next case of the player to move
		var currentMoving = (Math.abs(allPlayer[p].betweenPostion) / loopsForMoving) * k
		//check not more than 3 case moving
		if(currentMoving <= Math.abs(allPlayer[p].betweenPostion)) {
			// new postion of the player
			allPlayer[p].currentPosition = allPlayer[p].LastCurrentPosition + (allPlayer[p].betweenPostion / loopsForMoving * (k ) ) 
						
			//all weapon are the first children of the case
			//the result is to get the CSS class of the weapon (example: <i class="fas fa-hammer"></i>) if a weapon on the case.
			var fullHTMLNode = $('#' + "case" + allPlayer[p].currentPosition).html()
			var beginElement = fullHTMLNode.search("<i");
			var endElement = fullHTMLNode.search("</i>");
			var CSSclassWeapon = fullHTMLNode.slice(beginElement, endElement + 4)
			
			//PLAYER HAS OLD WEAPON AFTER GET A NEW WEAPON
			//If the player change the weapon in the last turn. Now the player has now 2 weapon. In the next turn (the turn now) the player put the old weapon on the case  
			// If the player change the weapon on the way, in the next loop the player loose the old weapon
			if(allPlayer[p].oldHasWeapon == true){
			//old weapon of the player is visibled	
			$("#" + "case" + allPlayer[p].oldWeaponPostion).addClass("weaponDesign").append(allWeapon[allPlayer[p].oldWeapon].symbol)
			allPlayer[p].oldHasWeapon = false
			}
			
			//Does the case a weapon on the new player position?
			for(var i = 0; i < allWeapon.length; i++){
				//check is the weapon on the case
				if(allWeapon[i].symbol == CSSclassWeapon){
					
					//IF THE PLAYER HAS ALREADY A WEAPON
					if(allPlayer[p].hasWeapon == true){
						//the player a current weapon and old weapon
						allPlayer[p].oldHasWeapon = true
						allPlayer[p].oldWeapon = allPlayer[p].Weapon
						allPlayer[p].oldWeaponPostion = allPlayer[p].currentPosition
						//new and current postion of the old weapon for the weapon classes
						allWeapon[allPlayer[p].Weapon].currentPosition = allPlayer[p].currentPosition;					
					}				
					
					//GET THE PLAYER THE FIRST WEAPON OR A NEW WEAPON
					
					//Player has a weapon now
					allPlayer[p].hasWeapon = true;
					//which weapon has Player
					allPlayer[p].Weapon = i;
					//no more weapon on the field:
					 allWeapon[i].currentPosition = null; 
					 //remove weapon in navigation
					$("#WeaponOfPlayer" + cssNamePlayer).children().remove();
					 //change power of weapon for player
					 allPlayer[p].damage = allWeapon[i].damage
					 //change weapon power in the display of the overlay
					 $("#weaponDamage").text(allPlayer[p].damage)
					//you will see the player's design class and not weapon class for the pieces :
					$("#" + "case" + allPlayer[p].currentPosition).removeClass("weaponDesign"); 
					//Weapon add in Navigation
					$("#WeaponOfPlayer" + cssNamePlayer).addClass("weaponDesign").append(allWeapon[i].symbol)
					// weapon remove on case:
					$("#" + "case" + allPlayer[p].currentPosition).children(":first").remove();  //anschauen
				}			
			}		
		}
	}
	PlayerFight(p)
	NextPlayerturn(p)										
};

function NextPlayerturn(p){
		var p = p;
		p++
        if(p == 1){
		  return Play(p)
		}else {
			p = p - 2
		  return Play(p)
		}		
}

function PlayerFight(p){
	
	//Cases around the player
	var caseAroundPlayer = allPlayer[p].aroundPlayer()
	
	//Number for the ID-Player
	var playerNumber = p + 1;
	
	//get the other player
	var other = OtherPlayer(p, playerNumber)
	var otherPlayerNumber = other + 1
	
	if(caseAroundPlayer.includes(allPlayer[other].currentPosition)){
		Fightprepare(p, playerNumber)
		var defendButton = document.getElementById("defend");
		var attackButton = document.getElementById("attack");
		
		//Player on the turn: wants to defent
		defendButton.onclick = function(){	
			Fightprepare(other, otherPlayerNumber)
			
			// other player wants also to defent
			defendButton.onclick = function(){
			$("#overlaybackgroundFight").css("display","none");
			 Play(other)
			}
			
			// other player wants to attack 
			attackButton.onclick = function(){
				Fightprepare(other, otherPlayerNumber)
				allPlayer[p].energy = allPlayer[p].energy - (allPlayer[other].damage / 2)
				$("#energyPlayer" + playerNumber ).attr("style", "width:" + allPlayer[p].energy + "%");
				$("#energyPlayer" + playerNumber ).text(allPlayer[p].energy + " %")
				$("#overlaybackgroundFight").css("display","none");
				Death(p, playerNumber)
				
			}
		}
		
		//Player on the turn: wants to attack
		attackButton.onclick = function(){
			Fightprepare(other, otherPlayerNumber)
			
			// other player wants also to defent
			defendButton.onclick = function(){			
				allPlayer[other].energy = allPlayer[other].energy - (allPlayer[p].damage / 2)
				$("#energyPlayer" + otherPlayerNumber ).attr("style", 'width:' + allPlayer[other].energy + "%");
				$("#energyPlayer" + otherPlayerNumber ).text(allPlayer[other].energy + " %")
				$("#overlaybackgroundFight").css("display","none");
				Death(other, otherPlayerNumber)
				Death(p, playerNumber)
			}
			
			// other player wants also to ATTACK
			attackButton.onclick = function(){
				allPlayer[other].energy = allPlayer[other].energy - (allPlayer[p].damage)
				$("#energyPlayer" + otherPlayerNumber ).attr("style", "width:" + allPlayer[other].energy + "%");
				$("#energyPlayer" + otherPlayerNumber ).text(allPlayer[other].energy + " %")
				$("#overlaybackgroundFight").css("display","none");
				allPlayer[other].energy
				Death(other, otherPlayerNumber)
				// PLAYER ON THE TURN LOSE ENERGY if other Player has over 0 energy
				if(allPlayer[other].energy > 0){				
					allPlayer[p].energy = allPlayer[p].energy - (allPlayer[other].damage)
					$("#energyPlayer" + playerNumber ).attr("style", "width:" + allPlayer[p].energy + "%");
					$("#energyPlayer" + playerNumber ).text(allPlayer[p].energy + " %")
					Death(p, playerNumber)
					allPlayer[p].energy
				}
			
			}
		}
	}	
}

//statements in the oberlay for fight
function Fightprepare(p, playerNumber){ 
	$("#overlaybackgroundFight").css("display","block");
	var playerName = $("#nameOfPlayer" + playerNumber).text();	
	$("#playerNameFight").text(playerName)
	$("#weaponDamage").text(allPlayer[p].damage) 
}

// Player died
function Death(p, playerNumber){
	if (allPlayer[p].energy <= 0){
		$("#energyPlayer" + playerNumber ).attr("style", "width:" + 0 + "%");
		$("#energyPlayer" + playerNumber ).text(0 + " %")
		$("#overlaybackgroundDeath").css("display","block");
		var playerName = $("#nameOfPlayer" + playerNumber).text();	
		var other = OtherPlayer(p, playerNumber)
		var otherPlayerNumber = other + 1
		var otherPlayer = $("#nameOfPlayer" + otherPlayerNumber).text();	
		$("#playerNameDeath").html(playerName + " is death." + "<br>" + otherPlayer + " has won.")
		
	}
}