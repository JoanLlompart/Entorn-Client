document.addEventListener('DOMContentLoaded',function() {
// Hacer una solicitud a la API para obtener la lista de razas de gatos
fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('breeds');
        const imatgeCat = document.getElementById("imatge");

    // Iterar sobre las razas y agregar opciones al elemento select
    data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        selectElement.appendChild(option);
        });

        //guardar id
        const idRaza = data[0];
        console.log(idRaza);
    })
    .catch(error => console.error('Error al obtener las razas de gatos:', error));
    
    // Agregar un evento de cambio al elemento select
    selectElement.addEventListener('change', function () {
        const selectedBreedId = selectElement.value;

        // Hacer una solicitud a la API para obtener la imagen de la raza seleccionada
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`)
            .then(response => response.json())
            .then(data => {
                // Verificar si se recibió una respuesta válida
                if (data && data.length > 0) {
                    const imageUrl = data[0].url;
                    // Mostrar la imagen en el elemento de la imagen
                    imatgeCat.src = imageUrl;
                } else {
                    console.error('No se pudo obtener la imagen de la raza seleccionada.');
                }
            })
            .catch(error => console.error('Error al obtener la imagen de la raza seleccionada:', error));
    });
    
});