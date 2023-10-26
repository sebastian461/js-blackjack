/* 
C = trebol
D = diamante
H = corazón
S = rombo
*/
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntos = 6;

//Crea la baraja
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
  console.log({ deck });
};

crearDeck();

//Pedir carta del deck
const pedirCarta = () => {
  if (deck.length === 0) throw "No hay cartas en el deck";

  const carta = deck.pop();
  console.log({ carta, deck });
  return carta;
};

//Obtiene el valor de la carta extraida
const valorCarta = (carta, puntos) => {
  const valor = carta.substring(0, carta.length - 1);

  return (puntos += !isNaN(valor)
    ? valor * 1
    : valor === "A"
    ? puntos + 11 > 21
      ? 1
      : 11
    : 10);
};

puntos = valorCarta(pedirCarta(), puntos);
console.log({ puntos });
