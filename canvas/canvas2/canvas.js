const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Cambiar fondo con ctx
ctx.fillStyle= "#000";
ctx.fillRect(0,0,400,300);

/* CIRCULO
ctx.beginPath();
ctx.ellipse(300/2, 300/2, 300/2, 300/2, 0,  0, 2 * Math.PI);
ctx.fillStyle = "#f00"; //color de dentro
ctx.fill();

ctx.lineWidth = 4;
ctx.strokeStyle = "#fff";
ctx.stroke();
*/

//Quadratica
ctx.beginPath();
ctx.moveTo(0,0);
ctx.quadraticCurveTo(300/2,300,300,0);

ctx.lineWidth = 4;
ctx.strokeStyle = "#fff";
ctx.stroke();


