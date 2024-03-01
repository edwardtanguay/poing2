export default class Field {
  draw(context) {
    context.beginPath();
    context.moveTo(20, 70);
    context.lineTo(580, 70);
    context.lineTo(580, 380);
    context.lineTo(20, 380);
    context.closePath();
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.stroke();
    // Mittellinie Y=Achse
    context.beginPath();
    context.moveTo(300, 70);
    context.lineTo(300, 380);
    context.stroke();
    // oberer Aussenbereich
    context.beginPath();
    context.moveTo(20, 100);
    context.lineTo(580, 100);
    context.stroke();
    // unterer Aussenbereich
    context.beginPath();
    context.moveTo(20, 350);
    context.lineTo(580, 350);
    context.stroke();
    // linker Spielerbereich
    context.beginPath();
    context.moveTo(140, 100);
    context.lineTo(140, 350);
    context.stroke();
    // rechter Spielerbereich
    context.beginPath();
    context.moveTo(460, 100);
    context.lineTo(460, 350);
    context.stroke();
    // Mittellinie X-Achse
    context.beginPath();
    context.moveTo(140, 225);
    context.lineTo(460, 225);
    context.stroke();
  }
}
