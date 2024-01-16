const { TheCatAPI } = require("@thatapicompany/thecatapi");
/* Per altres moduls*/

// import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI("live_GgbvvQT25dVUAsuZH69auOwR9PsUHCAGUnR3Ij6yY8HQWINBvz90kghPdotnztK2");

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_GgbvvQT25dVUAsuZH69auOwR9PsUHCAGUnR3Ij6yY8HQWINBvz90kghPdotnztK2"
});

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));        