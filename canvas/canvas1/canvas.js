const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Cambiar fondo con ctx
ctx.fillStyle= "#000";
ctx.fillRect(0,0,400,300);

ctx.strokeStyle = "#fff"
ctx.lineWidth = 10;
ctx.beginPath(); //Crear un Path
ctx.moveTo(400/2,0); //Coordenada de partida
ctx.lineTo(400,300); //longitud
ctx.lineTo(0,300); //longitud
ctx.closePath();
ctx.stroke(); //necesario para pintar
ctx.fillStyle = "#f00"; //color de dentro
ctx.fill();



/* Esta era una linea
ctx.beginPath(); //Crear un Path
ctx.moveTo(10,10); //Coordenada de partida
ctx.lineTo(400,300); //longitud
ctx.closePath();
ctx.stroke(); //necesario para pintar

*/

