/* 
C = trebol
D = diamante
H = corazón
S = rombo
*/
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const crearDeck = () => {
  //inserción de las cartas normales
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(`${i}${tipo}`);
    }
  }

  //inserción de cartas especiales
  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(`${especial}${tipo}`);
    }
  }

  deck = _.shuffle(deck);
};

crearDeck();
