/* 
C = trebol
D = diamante
H = corazón
S = rombo
*/
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJG = 0;
let puntosPC = 0;

//Referencias HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const puntosHTML = document.querySelectorAll("small");
const cartasJG = document.querySelector("#jugador-cartas");
const cartasPC = document.querySelector("#pc-cartas");

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
};

crearDeck();

//Pedir carta del deck
const pedirCarta = () => {
  if (deck.length === 0) throw "No hay cartas en el deck";

  const carta = deck.pop();
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

//turno PC
const turnoPC = (puntosMinimos) => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  do {
    const carta = pedirCarta();
    puntosPC = valorCarta(carta, puntosPC);
    puntosHTML[1].innerText = puntosPC;
    const cartaHTML = document.createElement("img");
    cartaHTML.classList.add("carta");
    cartaHTML.src = `assets/cartas/cartas/${carta}.png`;
    cartasPC.append(cartaHTML);
    if (puntosPC === 21) break;
  } while (puntosMinimos >= puntosPC);
};

//Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJG = valorCarta(carta, puntosJG);
  puntosHTML[0].innerText = puntosJG;
  const cartaHTML = document.createElement("img");
  cartaHTML.classList.add("carta");
  cartaHTML.src = `assets/cartas/cartas/${carta}.png`;
  cartasJG.append(cartaHTML);

  if (puntosJG > 21) {
    console.warn("Perdiste");
    btnPedir.disabled = true;
    turnoPC(0);
  } else if (puntosJG === 21) {
    console.warn("Ganaste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPC(puntosJG);
  }
}); //Una función que pasa por argumento de otra otra función es un Callback

btnDetener.addEventListener("click", () => {
  turnoPC(puntosJG);
  if (puntosPC > puntosJG && puntosPC < 21) {
    console.warn("Perdiste");
  } else {
    console.warn("Ganaste");
  }
});
