//////////////////////////////////
// Aufgabe: Kollision zwischen Ball & Spielern hinzufügen
//
// Dafür brauchen wir eine zusätzliche Methode, mit der wir die Kolision zwischen zwei Rechtecken berechnen können.
//
// Wo fügen wir diese hinzu?
// => character.collidesWith(otherCharacter)


import Game from './classes/Game.js';


// Spiel erst starten, wenn die gesamte Seite geladen ist
window.onload = () => {
  const game = new Game();
  game.start();
}

