var NUM_MINE = 16; // Numero mine
var NUM_MINIMO = 1; // Numero minimo per il range
var numMax = 100; // Numero massimo per il range
var numVictory = numMax - NUM_MINE;

// indirizzo al dom alcune variabili
numUserEl = document.getElementById('numUser');
resultEl = document.getElementById('result');
elencoUserNumEl = document.getElementById('elencoUserNum');
selectDifEl = document.getElementById('selectDif');
btnStartGameEl = document.getElementById('btnStartGame');
gameBoxEl = document.getElementById('gameBox');
numberChoiceEl = document.getElementById('numberChoice');
numPrecEl = document.getElementById('numPrec');
gameOverEl = document.getElementById('gameOver');

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

  // creo una variabile di vittoria
  numVictory = numMax - NUM_MINE;


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
  btnStartGameEl.innerHTML = 'RESTART';
  numUserEl.style.display = 'inline-block';
  numUserEl.placeholder = '1 / ' + numMax;
});

// alla pressione del tasto invio nel input si esegue:
numUserEl.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
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
        numUserEl.style.display = 'none';
        numPrecEl.innerHTML = '';
        numberChoiceEl.innerHTML = '';
        gameOverEl.innerHTML = 'i numeri vietati erano: ' + mineAttive;
        mineAttive = genMine(NUM_MINE);
        console.log(mineAttive);
      } else { // altrimenti ha fatto tutto giusto e aggiorno conteggio ed output
        cont++;
        numPrecEl.innerHTML = 'Numeri scelti in precedenza:';
        elencoUserNumEl.innerHTML += numUser + ', ';
        numUserAttivi.push(numUser);
        numUserEl.value = '';
        numUserEl.placeholder = '1 / ' + numMax;
        resultEl.innerHTML = 'Il tuo punteggio: ' + cont;
      }
      if (cont === numVictory){
        resultEl.innerHTML = 'HAI VINTO! COMPLIMENTI!';
        gameOverEl.innerHTML = 'i numeri vietati erano: ' + mineAttive;
      }
    }
});
