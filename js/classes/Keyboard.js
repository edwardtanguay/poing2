class Key {
  constructor(name) {
    this.name = name;
  }

  isPressed = false;
}

export default class Keyboard {
  // Alle Tasten sind im keys-Array gespeichert:
  static keys = [];

  // Die einzelnen Tasten, auf die wir reagieren möchten:
  static arrowUp = new Key("ArrowUp");
  static arrowDown = new Key("ArrowDown");
  static arrowLeft = new Key("ArrowLeft");
  static arrowRight = new Key("ArrowRight");
  static keyW = new Key("KeyW");
  static keyS = new Key("KeyS");
  static keyA = new Key("KeyA");
  static keyD = new Key("KeyD");

  // Event-Listener registrieren & Tasten updaten
  static setup() {
    this.keys = [this.arrowUp, this.arrowDown, this.arrowLeft, this.arrowRight, this.keyW, this.keyS, this.keyA, this.keyD];

    const reactToKeyDownEvent = (event) => {
      console.log(event.code);
      // Status der gedrückten Taste updaten:
      for (const key of this.keys) {
        if (key.name === event.code) {
          key.isPressed = true;
        }
      }
    };

    const reactToKeyUpEvent = (event) => {
      // Status der gedrückten Taste updaten:
      for (const key of this.keys) {
        if (key.name === event.code) {
          key.isPressed = false;
        }
      }
    };

    document.addEventListener("keydown", reactToKeyDownEvent.bind(this));

    document.addEventListener("keyup", reactToKeyUpEvent.bind(this));
  }
}