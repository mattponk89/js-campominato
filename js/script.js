var NUM_MINE = 16; // Numero mine
var NUM_MINIMO = 1; // Numero minimo per il range
var NUM_MAX = 100; // Numero massimo per il range


// indirizzo al dom alcune variabili
numUserEl = document.getElementById('numUser');
btnAvviaEl = document.getElementById('btnAvvia');
resultEl = document.getElementById('result');

// funzione per generare un numero random da min a max
function randomNum(min, max) { // min and max inclusi
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// funzione che genera i numeri delle mine

function genMine(target){
  var i = 0;
  var numGen = [];
  while (i < target){
    var random = randomNum(NUM_MINIMO, NUM_MAX);
    if (!numGen.includes(random)){
      i++;
      numGen.push(random);
    }
  }
  return numGen;
}

var mineAttive = genMine(NUM_MINE);
console.log(mineAttive);

var numUserAttivi = [];
**
var cont = 0;


btnAvviaEl.addEventListener('click', function(){
  numUser = parseInt(numUserEl.value);
  console.log(numUser, typeof numUser);
  if ((numUser > NUM_MAX) || (numUser < NUM_MINIMO)){
    alert('Inserito un numero non valido! Riprovare inserendoci un numero da 1 a 100!');
  } else if (numUserAttivi.includes(numUser)) {
    resultEl.innerHTML = 'Inserito un numero già inserito precedentemente! NON BARARE!';
  } else if (mineAttive.includes(numUser)){
    resultEl.innerHTML = 'HAI PERSO! Il numero inserito era tra quelli vietati!';
    cont=0;
    mineAttive = genMine(NUM_MINE);
    console.log(mineAttive);
  } else {
    cont++;
    resultEl.innerHTML = 'Il tuo punteggio: ' + cont;
  }
});
