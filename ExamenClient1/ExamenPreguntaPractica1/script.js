/*
Implementa una pàgina que mostri la data actual 
(s'ha d'actualitzar cada segon), amb l'any, mes, dia del mes, dia de la setmana, hora, minuts i segons, 
en el següent format: "Dimecres 15 de desembre de 2021, 15:00:00"
*/

function actualitzaData() {
    const data = new Date();
    const diesSetmana = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
    const mesos = ["de gener", "de febrer", "de març", "d'abril", "de maig", "de juny", "de juliol", "d'agost", "de setembre", "d'octubre", "de novembre", "de desembre"];

    const diaSetmana = diesSetmana[data.getDay()];
    const dia = data.getDate();
    const mes = mesos[data.getMonth()];
    const any = data.getFullYear();
    const hora = (data.getHours() < 10 ? "0" : "") + data.getHours();
    const minuts = (data.getMinutes() < 10 ? "0" : "") + data.getMinutes();
    const segons = (data.getSeconds() < 10 ? "0" : "") + data.getSeconds();

    const dataString = `${diaSetmana} ${dia} de ${mes} de ${any}, ${hora}:${minuts}:${segons}`;
    document.getElementById("data").textContent = dataString;
}
  // Actualitza la data cada segon
setInterval(actualitzaData, 1000);
  // Cridem a la funció per mostrar la data en la carrega inicial
actualitzaData();