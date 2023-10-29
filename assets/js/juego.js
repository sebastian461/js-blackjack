/* Una función ánonima no tiene un nombre por el cual acceder,
por eso se usa esta sintaxis para poder trabajar con la función
para que sea llamada una vez es creada (patrón módulo)
*/
//evita que el código sea accedido por el cliente
(() => {
  "use strict"; //evalua de manera estricta el código dentro del módulo
  const juegos = ["Elden ring", "Dark souls", "Dota"];
  console.log({ juegos });
})(); //la función se ejecuta automaticamente

(() => {
  /* 
    C = trebol
    D = diamante
    H = corazón
    S = rombo
  */

  let deck = [],
    puntosJugadores = [];

  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  //Referencias HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const puntosHTML = document.querySelectorAll("small"),
    cartaHTML = document.querySelectorAll(".div-cartas");

  //Barajear deck
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    cartaHTML.forEach((c) => (c.innerHTML = ""));
    puntosHTML.forEach((p) => (p.innerText = 0));
    btnDetener.disabled = false;
    btnPedir.disabled = false;
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) puntosJugadores.push(0);
  };

  //Crea la baraja
  const crearDeck = () => {
    //inserción de las cartas normales
    deck = [];
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

    return _.shuffle(deck);
  };

  //Pedir carta del deck
  const pedirCarta = () => {
    if (deck.length === 0) throw "No hay cartas en el deck";

    return deck.pop();
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

  const puntuacion = (carta, turno) => {
    puntosJugadores[turno] = valorCarta(carta, puntosJugadores[turno]);
    puntosHTML[turno].innerText = puntosJugadores[turno];
  };

  const dibujarCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    cartaHTML[turno].append(imgCarta);
  };

  const determinarGanador = (puntosPC) => {
    setTimeout(() => {
      mensaje =
        puntosJugadores[0] === puntosJugadores[puntosPC]
          ? "Empate"
          : puntosJugadores[0] > 21 ||
            (puntosJugadores[0] < 21 &&
              puntosJugadores[0] < puntosJugadores[puntosPC] &&
              puntosJugadores[puntosPC] <= 21)
          ? "Perdiste"
          : "Ganaste";
      alert(mensaje);
    }, 100);
  };

  //turno PC
  const turnoPC = (puntosMinimos) => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    const puntosPC = puntosJugadores.length - 1;
    do {
      const carta = pedirCarta();
      puntuacion(carta, puntosPC);
      dibujarCarta(carta, puntosPC);
      if (puntosJugadores[puntosPC] === 21) break;
    } while (puntosMinimos >= puntosJugadores[puntosPC]);

    determinarGanador(puntosPC);
  };

  //Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    puntuacion(carta, 0);
    dibujarCarta(carta, 0);

    if (puntosJugadores[0] > 21) {
      turnoPC(0);
    } else if (puntosJugadores[0] === 21) {
      turnoPC(puntosJugadores[0]);
    }
  }); //Una función que pasa por argumento de otra otra función es un Callback

  btnDetener.addEventListener("click", () => {
    turnoPC(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  inicializarJuego();
})();
