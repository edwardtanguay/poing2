import Color from './Color.js';
import Settings from './Settings.js';
import Character from './Character.js';
import Keyboard from './Keyboard.js';
import Ball from './Ball.js';
import Player from './Player.js';
import Field from './Field.js';
export default class Game {
  // Canvas-Eigenschaften
  canvas;
  context;

  // Spiel-Elemente
  player1 = new Player(30, Settings.canvas.height / 2, 40, 90, 'Baseballschläger.png');
  player2 = new Player(Settings.canvas.width - 35, Settings.canvas.height / 2, 40, 90, 'Laterne.png');
  ball = new Ball(20, 40, 20, 20, 'tennisBall.png');


  pointsPlayer1 = 0;
  pointsPlayer2 = 0;
  //Sound einsetzen
  soundhit1 = new Audio("punch.wav");
  soundhit2 = new Audio("catching.wav");
  soundLeft = new Audio("voice-laugh.wav");
  soundRight = new Audio("creature-laugh.wav");
  soundOutSide = new Audio("short-whistle.wav");



  start() {
    console.log("Spiel startet");

    this.canvas = document.getElementById('2d-canvas');
    this.canvas.width = Settings.canvas.width;
    this.canvas.height = Settings.canvas.height;

    this.context = this.canvas.getContext('2d');

    // Keyboard-Input aufsetzen
    Keyboard.setup();

    // Animations-Loop starten
    // Da die Funktion `update` zu einem späteren Zeitpunkt ausgeführt wird, müssen `this` an die Funktion binden. Ansonsten ist `this` beim späteren Ausführen der Funktion `undefined`.
    requestAnimationFrame(this.update.bind(this));

    
  }

  update() {
    console.log("Spiel Update");
    // Reset Canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Daten updaten
    this.updateData();

    // Spiel-Elemente zeichnen
    this.draw();

    // Animations-Loop ausführen
    requestAnimationFrame(this.update.bind(this));

  }

  updateData() {
    // Hier werden wir die Daten des Spiels updaten

    // Auf Ball-Kollisionen reagieren:
    // Kollision mit linker oder rechter Wand:
    // (x-Geschwindigkeit umkehren)
    if (this.ball.collidesWithLeftWall()) {      
      this.pointsPlayer2++; // Spieler 2 bekommt einen Punkt
      this.soundRight.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundRight.volume = 1.0;
      this.soundRight.play(); // Sound abspielen
      this.resetBall(); // Der Ball kommt neu ins Spiel
    } else if (this.ball.collidesWithRightWall()) {
      this.pointsPlayer1++; // Spieler 1 bekommt einen Punkt
      this.soundLeft.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundLeft.volume = 1.0;
      this.soundLeft.play(); // Sound abspielen      
      this.resetBall(); // Der Ball kommt neu ins Spiel
    }   else if (this.ball.collidesWithTopWall() ) {
      console.log('Hallo')}
    this.ball.position.y 
    // Kollision mit oberer oder unterer Wand:
    // (y-Geschwindigkeit umkehren)
    // Begrenzung für Spieler 1 Y-Achse
    if (this.player1.position.y < 50) {
      this.player1.position.y = 50;      
    } else if (this.player1.position.y + this.player1.size.height > this.canvas.height) {
      this.player1.position.y = this.canvas.height - this.player1.size.height;
    }

    if (this.player1.position.x < 10) {
      this.player1.position.x = 10;      
    } else if (this.player1.position.x + this.player1.size.width > this.canvas.width /2) {
      this.player1.position.x = this.canvas.width /2 - this.player1.size.width;
    }

    // Begrenzung für Spieler 2
    if (this.player2.position.y < 50) {
      this.player2.position.y = 50;
    } else if (this.player2.position.y + this.player2.size.height > this.canvas.height) {
      this.player2.position.y = this.canvas.height - this.player2.size.height;
    }

    if (this.player2.position.x < 300) {
      this.player2.position.x = 300;
    } else if (this.player2.position.x + this.player2.size.width > this.canvas.width) {
      this.player2.position.x = this.canvas.width  - this.player2.size.width;
    }

    // Begrenzung der Ballbewegung innerhalb des grünen Bereichs
    if (this.ball.position.y < 90) {     
      this.ball.position.y = 90;
      this.soundOutSide.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundOutSide.volume = 1.0;
      this.soundOutSide.play(); // Sound abspielen  
        if (this.ball.position.x < 300) {
          this.pointsPlayer2++;
        }
        if (this.ball.position.x > 300) {
          this.pointsPlayer1++;
        }
      this.resetBall(); // Der Ball kommt neu ins Spiel  

    } else if (this.ball.position.y + this.ball.size.height > this.canvas.height) {
      this.ball.position.y = this.canvas.height - this.ball.size.height;  

    } else if (this.ball.position.y >340) {
      this.ball.position.y = 340; 
      this.soundOutSide.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundOutSide.volume = 1.0;
      this.soundOutSide.play(); // Sound abspielen 
      if (this.ball.position.x < 300) {
        this.pointsPlayer2++;
      }
      if (this.ball.position.x > 300) {
        this.pointsPlayer1++;
      }

      this.resetBall(); // Der Ball kommt neu ins Spiel

      this.ball.velocity.y *= -1; // Umkehr der Ballrichtung      
    } else if (this.ball.position.y + this.ball.size.height > this.canvas.height) {
      this.ball.position.y = this.canvas.height - this.ball.size.height;           
    }
  
    // Position der Spieler basierend auf Keyboard-Input aktualisieren
    // Player1 (Steuerung mit W & S):
    if (!Keyboard.keyW.isPressed && !Keyboard.keyS.isPressed) {
      this.player1.velocity.y = 0;
    } else if (Keyboard.keyW.isPressed && Keyboard.keyS.isPressed) {
      this.player1.velocity.y = 0;
    } else if (Keyboard.keyW.isPressed) {
      this.player1.velocity.y = -2;
    } else if (Keyboard.keyS.isPressed) {
      this.player1.velocity.y = 2;
    }
    
    // Player1 (Steuerung mit A & D):
    if (!Keyboard.keyA.isPressed && !Keyboard.keyD.isPressed) {
      this.player1.velocity.x = 0;
    } else if (Keyboard.keyA.isPressed && Keyboard.keyD.isPressed) {
      this.player1.velocity.x = 0;
    } else if (Keyboard.keyA.isPressed) {
      this.player1.velocity.x = -2;
    } else if (Keyboard.keyD.isPressed) {
      this.player1.velocity.x = 2;
    }

    // Player2 (Steuerung mit ArrowUp & ArrowDown):
    if (!Keyboard.arrowUp.isPressed && !Keyboard.arrowDown.isPressed) {
      this.player2.velocity.y = 0;
    } else if (Keyboard.arrowUp.isPressed && Keyboard.arrowDown.isPressed) {
      this.player2.velocity.y = 0;
    } else if (Keyboard.arrowUp.isPressed) {
      this.player2.velocity.y = -2;
    } else if (Keyboard.arrowDown.isPressed) {
      this.player2.velocity.y = 2;
    }

    
    // Player2 (Steuerung mit ArrowLeft & ArrowRight):
    if (!Keyboard.arrowLeft.isPressed && !Keyboard.arrowRight.isPressed) {
      this.player2.velocity.x = 0;
    } else if (Keyboard.arrowLeft.isPressed && Keyboard.arrowRight.isPressed) {
      this.player2.velocity.x = 0;
    } else if (Keyboard.arrowLeft.isPressed) {
      this.player2.velocity.x = -2;
    } else if (Keyboard.arrowRight.isPressed) {
      this.player2.velocity.x = 2;
    }

    // Falls einer der Spieler mit der Wand kollidiert, dann wollen wir die Geschwindigkeit wieder auf null setzen:
    if (this.player1.collidesWithTopWall() || this.player1.collidesWithBottomWall()) {
      this.player1.velocity.y = 0;
    }

    if (this.player2.collidesWithTopWall() || this.player2.collidesWithBottomWall()) {
      this.player2.velocity.y = 0;
    }  

    if (
      this.ball.collidesWith(this.player1)
    ) {      
      this.soundhit1.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundhit1.volume = 1.0;
      this.soundhit1.play(); // Sound abspielen
      this.ball.velocity.x *= -1;
    }

    if (
      this.ball.collidesWith(this.player2)
    ) {      
      this.soundhit2.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
      this.soundhit2.volume = 1.0;
      this.soundhit2.play(); // Sound abspielen
      this.ball.velocity.x *= -1;
    }

    

    // Charakter bewegen
    this.ball.move();
    this.player1.move();
    this.player2.move();
  }

  
  draw() {
    // Spiel-Elemente zeichnen
    
    
    // Hintergrund zeichnen
    this.context.fillStyle = Color.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.context.fillStyle = Color.playArea;
    this.context.fillRect(0, 0, this.canvas.width, 50);

    // Spielfeldumrandung
    const field = new Field();
    field.draw(this.context);      

    // Ball zeichnen  
    this.context.drawImage(this.ball.spriteImage, this.ball.position.x, this.ball.position.y, this.ball.size.width, this.ball.size.height);

    // Player1 zeichnen
    // this.context.fillStyle = Color.player1;
    // this.context.fillRect(this.player1.position.x, this.player1.position.y, this.player1.size.width, this.player1.size.height);
    // / Player1 zeichnen
    const player1Image = new Image();
    player1Image.src = "Baseballschläger.png";
    this.context.drawImage(
      player1Image,
      this.player1.position.x,
      this.player1.position.y,
      this.player1.size.width,
      this.player1.size.height
    );
     // Player2 zeichnen
     const player2Image = new Image();
     player2Image.src = "Laterne.png";
     this.context.drawImage(
       player2Image,
       this.player2.position.x,
       this.player2.position.y,
       this.player1.size.width,
      this.player1.size.height,
     );
    // Player2 zeichnen
    // this.context.fillStyle = Color.player2;
    // this.context.fillRect(this.player2.position.x, this.player2.position.y, this.player2.size.width, this.player2.size.height);

    // Punkte
    this.context.fillStyle = Color.points;
    this.context.font = '20px Arial';    
    this.context.textAlign = 'center';
    this.context.fillText(`${this.pointsPlayer1} : ${this.pointsPlayer2}`, Settings.canvas.width / 2, 30);
  }
  
  resetBall() {
    // Ball zurücksetzen
    this.ball.position.x = Settings.canvas.width / 2;
    this.ball.position.y = Settings.canvas.height / 2;
    this.ball.velocity.x = -this.ball.velocity.x; // Richtung umkehren
    
  }
  
}

//https://de.freepik.com/search?format=search&last_filter=page&last_value=2&page=2&query=png+tennis#uuid=c49f4cdf-60fb-4dbf-81f5-237e7d6a894d
// import Color from "./Color.js";
// import Settings from "./Settings.js";
// import Character from "./Character.js";
// import Keyboard from "./Keyboard.js";
// import Ball from "./Ball.js";
// import Player from "./Player.js";

// export default class Game {
//   // Canvas-Eigenschaften
//   canvas;
//   context;

//   // Spiel-Elemente
//   player1 = new Player(10, Settings.canvas.height / 2, 5, 80);
//   player2 = new Player(
//     Settings.canvas.width - 15,
//     Settings.canvas.height / 2,
//     5,
//     80
//   );

//   player1Score = 0;
//   player2Score = 0;

//   soundPlayer = new Audio("smallhit.wav");

//   ball = new Ball(0, 40, 10, 10);

//   start() {
//     console.log("Spiel startet");

//     this.canvas = document.getElementById("2d-canvas");
//     this.canvas.width = Settings.canvas.width;
//     this.canvas.height = Settings.canvas.height;

//     this.context = this.canvas.getContext("2d");

//     // Keyboard-Input aufsetzen
//     Keyboard.setup();

//     // Animations-Loop starten
//     // Da die Funktion `update` zu einem späteren Zeitpunkt ausgeführt wird, müssen `this` an die Funktion binden. Ansonsten ist `this` beim späteren Ausführen der Funktion `undefined`.
//     requestAnimationFrame(this.update.bind(this));
//   }

//   update() {
//     console.log("Spiel Update");
//     // Reset Canvas
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

//     // Daten updaten
//     this.updateData();

//     // Spiel-Elemente zeichnen
//     this.draw();

//     // Animations-Loop ausführen
//     requestAnimationFrame(this.update.bind(this));
//   }

//   updateData() {
//     // Hier werden wir die Daten des Spiels updaten

//     // Auf Ball-Kollisionen reagieren:
//     // Kollision mit linker oder rechter Wand:
//     // (x-Geschwindigkeit umkehren)
//     // if (this.ball.collidesWithLeftWall() || this.ball.collidesWithRightWall()) {
//     //   this.ball.velocity.x *= -1;
//     // }

//     if (this.ball.collidesWithLeftWall()) {
//       this.player2Score += 10;
//       this.resetBall();
//     } else if (this.ball.collidesWithRightWall()) {
//       this.player1Score += 10;
//       this.resetBall();
//     }

//     // Kollisition mit oberer oder unterer Wand:
//     // (y-Geschwindigkeit umkehren)
//     if (this.ball.collidesWithTopWall() || this.ball.collidesWithBottomWall()) {
//       this.ball.velocity.y *= -1;
//     }

//     // Position der Spieler basierend auf Keyboard-Input aktualisieren
//     // Player1 (Steuerung mit W & S):
//     if (!Keyboard.keyW.isPressed && !Keyboard.keyS.isPressed) {
//       this.player1.velocity.y = 0;
//     } else if (Keyboard.keyW.isPressed && Keyboard.keyS.isPressed) {
//       this.player1.velocity.y = 0;
//     } else if (Keyboard.keyW.isPressed) {
//       this.player1.velocity.y = -2;
//     } else if (Keyboard.keyS.isPressed) {
//       this.player1.velocity.y = 2;
//     }

//     // Player2 (Steuerung mit ArrowUp & ArrowDown):
//     if (!Keyboard.arrowUp.isPressed && !Keyboard.arrowDown.isPressed) {
//       this.player2.velocity.y = 0;
//     } else if (Keyboard.arrowUp.isPressed && Keyboard.arrowDown.isPressed) {
//       this.player2.velocity.y = 0;
//     } else if (Keyboard.arrowUp.isPressed) {
//       this.player2.velocity.y = -2;
//     } else if (Keyboard.arrowDown.isPressed) {
//       this.player2.velocity.y = 2;
//     }

//     // Falls einer der Spieler mit der Wand kollidiert, dann wollen wir die Geschwindigkeit wieder auf null setzen:
//     if (
//       this.player1.collidesWithTopWall() ||
//       this.player1.collidesWithBottomWall()
//     ) {
//       this.player1.velocity.y = 0;
//     }

//     if (
//       this.player2.collidesWithTopWall() ||
//       this.player2.collidesWithBottomWall()
//     ) {
//       this.player2.velocity.y = 0;
//     }

//     // Kollision von Ball mit Spieler testen
//     // if (
//     //   this.ball.collidesWith(this.player1) ||
//     //   this.ball.collidesWith(this.player2)
//     // ) {
//     //   this.ball.velocity.x *= -1;
//     // }

//     // Sound hinzufügen bei kollision vom Player und Ball

//     if (
//       this.ball.collidesWith(this.player1) ||
//       this.ball.collidesWith(this.player2)
//     ) {
//       this.soundPlayer.currentTime = 0; // Setzt die Zeit auf den Anfang des Sounds
//       this.soundPlayer.volume = 1.0;
//       this.soundPlayer.play(); // Sound abspielen
//       this.ball.velocity.x *= -1;
//     }

//     // Charakter bewegen
//     this.ball.move();
//     this.player1.move();
//     this.player2.move();
//   }

//   draw() {
//     // Spiel-Elemente zeichnen

//     // Hintergrund zeichnen
//     this.context.fillStyle = Color.background;
//     this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

//     // Ball zeichnen
//     this.context.fillStyle = Color.character;
//     this.context.fillRect(
//       this.ball.position.x,
//       this.ball.position.y,
//       this.ball.size.width,
//       this.ball.size.height
//     );

//     // Player1 zeichnen
//     this.context.fillStyle = Color.player1;
//     this.context.fillRect(
//       this.player1.position.x,
//       this.player1.position.y,
//       this.player1.size.width,
//       this.player1.size.height
//     );

//     // Player2 zeichnen
//     this.context.fillStyle = Color.player2;
//     this.context.fillRect(
//       this.player2.position.x,
//       this.player2.position.y,
//       this.player2.size.width,
//       this.player2.size.height
//     );

//     // Punkte Score zeichen
//     this.context.fillStyle = Color.character;
//     this.context.font = "20px Arial";
//     this.context.fillText(`Player 1: ${this.player1Score}`, 60, 30);
//     this.context.fillText(`Player 2: ${this.player2Score}`, 330, 30);
//   }

//   resetBall() {
//     this.ball.position.x = Settings.canvas.width / 2;
//     this.ball.position.y = Settings.canvas.height / 2;
//     this.ball.velocity.x *= -1;
//   }
// }
