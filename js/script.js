var NUM_MINE = 16; // Numero mine
var NUM_MINIMO = 1; // Numero minimo per il range
var numMax = 100; // Numero massimo per il range


// indirizzo al dom alcune variabili
numUserEl = document.getElementById('numUser');
btnAvviaEl = document.getElementById('btnAvvia');
resultEl = document.getElementById('result');
elencoUserNumEl = document.getElementById('elencoUserNum');
selectDifEl = document.getElementById('selectDif');
btnStartGameEl = document.getElementById('btnStartGame');
gameBoxEl = document.getElementById('gameBox');
numberChoiceEl = document.getElementById('numberChoice');
numPrecEl = document.getElementById('numPrec');
gameOverEl = document.getElementById('gameOver');
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


btnStartGameEl.addEventListener('click', function(){
  console.log(typeof(selectDifEl.value));
  switch (selectDifEl.value) {
  case "1":
    numMax = 100;
    break;
  case "2":
    numMax = 80;
    break;
  case "3":
    numMax = 50;
    break;
  default:
    numMax = 100;
}

  // genero numeri mine
  mineAttive = genMine(NUM_MINIMO, numMax, NUM_MINE);
  console.log(mineAttive);

  //punteggio utente (numeri giusti consecutivi)
  cont = 0;
  //creo array che avrà i numeri inseriti consecutivamente dall'utente
  numUserAttivi = [];

  // display Box
  gameBoxEl.style.display = "block";

  // visualizzo il numero col range giusto
  numberChoiceEl.innerHTML = 'Inserisci un numero da 1 a ' + numMax;

  // resetto un eventuale partita precedente
  resultEl.innerHTML = '';
  numUserEl.value = '';
  elencoUserNumEl.innerHTML = '';
  numPrecEl.innerHTML = '';
  gameOverEl.innerHTML = '';
});



// al click del tasto avvio tutto
btnAvviaEl.addEventListener('click', function(){
  gameOverEl.innerHTML = '';
  //prendo il numero inserito
  numUser = parseInt(numUserEl.value);
  console.log(numUser, typeof numUser);
  //controllo il numero che non sia superiore o inferiore o nullo
  if ((numUser > numMax) || (numUser < NUM_MINIMO) || (isNaN(numUser) )){
    alert('Inserito un numero non valido! Riprovare inserendoci un numero da 1 a ' + numMax +'!');
  } else if (numUserAttivi.includes(numUser)) { //controllo se il numero lo ha già inserito
    resultEl.innerHTML = 'Inserito un numero già inserito precedentemente! NON BARARE!';
  } else if (mineAttive.includes(numUser)){ //controllo se il numero è tra i numeri vietati
    resultEl.innerHTML = 'HAI PERSO! Il numero inserito era tra quelli vietati!';
    cont=0;
    numUserAttivi= [];
    elencoUserNumEl.innerHTML = '';
    gameOverEl.innerHTML = 'i numeri vietati erano: ' + mineAttive;
    mineAttive = genMine(NUM_MINE);
    console.log(mineAttive);
  } else { // altrimenti ha fatto tutto giusto e aggiorno conteggio ed output
    cont++;
    numPrecEl.innerHTML = 'Numeri scelti in precedenza:';
    elencoUserNumEl.innerHTML += numUser + ', ';
    numUserAttivi.push(numUser);
    numUserEl.value = '';
    resultEl.innerHTML = 'Il tuo punteggio: ' + cont;
  }
});
