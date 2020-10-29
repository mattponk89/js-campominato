// funzione per generare un numero random da min a max
function randomNum(min, max) { // min and max inclusi
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// funzione che genera i numeri delle mine
function genMine(min, max, target){
  var i = 0;
  var numGen = [];
  while (i < target){
    var random = randomNum(min, max);
    if (!numGen.includes(random)){
      i++;
      numGen.push(random);
    }
  }
  return numGen;
}
