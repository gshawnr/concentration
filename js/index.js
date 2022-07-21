// GLOBAL VARIABLES
var sourceArray = loadSourceArray();
var sourceArrayIndex = 0;
var turnedCards = 0;
var compareCard1 = null;
var compareCard2 = null;
var turnCounter = 0;
var correctCards = 0;
var guesses = document.getElementById("guesses");

// PROGRAM EXECUTION
for (let j = 0; j < 2; j++) {
  for (let i = 0; i < sourceArray.length / 2; i++) {
    let card = document.createElement("div");
    card.setAttribute('class', 'card');
    card.setAttribute("id", sourceArray[sourceArrayIndex]);
    card.setAttribute("status", "in");
    card.setAttribute("facing", "down");
    
    sourceArrayIndex++;
    card.onclick = selectCard;
    
    let container = document.getElementById("container");
    container.appendChild(card);
  }
}

// FUNCTIONS
function loadSourceArray(){
  let cardArray = [];
  let loopCounter = 0;
  for(let j= 0; j<2; j++)
    for(let i = 97; i<= 105; i++)
      cardArray.push(String.fromCharCode(i));
  
  shuffle(cardArray);
  return cardArray;
}
function turnUp(card) {
  let letter = card.id;
  let imagesObj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9 };
  var image = imagesObj[letter];
  card.style.backgroundColor = "white";
  card.style.backgroundImage = "url('./images/" + image + ".jpeg')";
  card.setAttribute("facing", "up");
  turnCounter++;
  guesses.innerHTML = "Turns: " + turnCounter.toString();
}
function shuffle(array) {
  let currentIndex = array.length,
  temporaryValue,
  randomIndex;
  
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}
function turnDown(card) {
  card.style.backgroundImage = "";
  card.style.backgroundColor = "#997300";
  card.style.color = "#997300";
  card.setAttribute("facing", "down");
}
function compareCards() {
  console.log(compareCard1["id"] + "compareCard");
  
  if (compareCard1["id"] === compareCard2["id"]) {
    compareCard1.setAttribute("status", "out");
    compareCard2.setAttribute("status", "out");
    compareCard1 = null;
    turnedCards = 0;
    correctCards++;
    if (correctCards == 9) {
      alert("You win!!");
      alert("You took " + turnCounter + " turns.");
    }
  } else {
    turnDown(compareCard1);
    turnDown(compareCard2);
    compareCard1 = null;
    turnedCards = 0;
  }
}
function selectCard(selected) {
  let card = selected.target;
  
  // only consider in play cards
  if (turnedCards === 0) {
    turnedCards++;
    compareCard1 = card;
    turnUp(card);
  } else if (turnedCards === 1) {
    if (card == compareCard1) {
      turnDown(card);
      turnedCards--;
      return;
    }
    turnUp(card);
    compareCard2 = card;
    turnedCards++;
    guesses.innerHTML = "Turns: " + turnCounter.toString();
    setTimeout(compareCards, 1000);
  } else {
    return;
  }
}