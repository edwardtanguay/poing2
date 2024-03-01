import Settings from './Settings.js';

export default class Character {
  constructor(x, y, width, height) {
    this.position = {
      x: x,
      y: y
    };
    this.size = {
      width: width,
      height: height
    };
  }
  
  velocity = {
    x: 0,
    y: 0
  };

  // Charakter bewegen
  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Die nächste Position ausrechnen (für Kollisionen)
  nextPosition() {
    const nextPosition = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this.velocity.y
    };
    return nextPosition;
  }

  // Kollisionen mit Wänden testen

  // Kollision mit der linken Wand des Canvas
  // (x < 0)
  collidesWithLeftWall() {
    return this.nextPosition().x < 0;
  }
  
  // Kollisition mit der oberen Wand des Canvas
  // (y < 0)
  collidesWithTopWall() {
    return this.nextPosition().y < 0;
  }

  // Kollision mit der rechten Wand des Canvas
  // (x + size.width > canvas.width)
  collidesWithRightWall() {
    return this.nextPosition().x + this.size.width > Settings.canvas.width;
  }

  // Kollision mit der unteren Wand des Canvas
  // (y + size.height > canvas.height)
  collidesWithBottomWall() {
    return this.nextPosition().y + this.size.height > Settings.canvas.height;
  }

  // Kollision zwischen zwei Spiel-Charakteren berechnen
  collidesWith(other) {
    // Dazu müssen wir testen, ob die beiden Rechtecke sich überlappen. Das machen wir, indem wir die Positionen der Eckpunkte miteinander vergleichen:
    return this.position.x < other.position.x + other.size.width && 
            this.position.x + this.size.width > other.position.x &&
            this.position.y < other.position.y + other.size.height &&
            this.position.y + this.size.height > other.position.y;
  }
}