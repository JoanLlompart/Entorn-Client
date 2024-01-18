document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('breeds');
    const imatgeCat = document.getElementById("imatge");
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const apiKey = 'live_GgbvvQT25dVUAsuZH69auOwR9PsUHCAGUnR3Ij6yY8HQWINBvz90kghPdotnztK2'; 

    // Función para actualizar la imagen y el historial
    function updateImageAndHistory(selectedBreedId) {
        // Hacer una solicitud a la API para obtener la imagen de la raza seleccionada
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`, {
            headers: {
                'x-api-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            // Verificar si se recibió una respuesta válida
            if (data && data.length > 0) {
                const imageUrl = data[0].url;
                // Mostrar la imagen en el elemento de la imagen
                imatgeCat.src = imageUrl;

                // Agregar una entrada al historial con la URL modificada
                const newUrl = `?breed=${selectedBreedId}`;
                history.pushState({ breed: selectedBreedId }, null, newUrl);
            } else {
                console.error('No se pudo obtener la imagen de la raza seleccionada.');
            }
        })
        .catch(error => console.error('Error al obtener la imagen de la raza seleccionada:', error));
    }

    // Hacer una solicitud a la API para obtener la lista de razas de gatos
    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // Iterar sobre las razas y agregar opciones al elemento select
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            selectElement.appendChild(option);
        });

        // Verificar la URL actual para establecer la raza seleccionada
        const urlParams = new URLSearchParams(window.location.search);
        const selectedBreedIdFromURL = urlParams.get('breed');
        if (selectedBreedIdFromURL) {
            selectElement.value = selectedBreedIdFromURL;
            updateImageAndHistory(selectedBreedIdFromURL);
        }
    })
    .catch(error => console.error('Error al obtener las razas de gatos:', error));

    // Agregar un evento de cambio al elemento select
    selectElement.addEventListener('change', function () {
        const selectedBreedId = selectElement.value;
        updateImageAndHistory(selectedBreedId);
    });
});
