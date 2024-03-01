// Die Klasse `Ball` soll auf der Klasse `Character` aufbauen, da wir dieselben Eigenschaften & Methodene brauchen

import Character from './Character.js';

export default class Ball extends Character {
  constructor(x, y, width, height, spriteImagePath) {
    super(x, y, width, height);
    this.spriteImage = new Image();
    this.spriteImage.src = spriteImagePath;
  }

  // Start-Geschwindigkeit überschreiben
  velocity = {
    x: 1,
    y: 1
  }
}