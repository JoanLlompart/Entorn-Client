document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('breeds');
    const imatgeCat = document.getElementById('imatge');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const apiKey = 'live_GgbvvQT25dVUAsuZH69auOwR9PsUHCAGUnR3Ij6yY8HQWINBvz90kghPdotnztK2'; 
    let currentIndex = 0; // Variable para realizar un seguimiento del índice actual de la imagen

    // Función para actualizar la imagen y el historial
    function updateImageAndHistory(selectedBreedId) {
        // Hacer una solicitud a la API para obtener la imagen de la raza seleccionada o cualquier raza si no se selecciona
        const apiUrl = selectedBreedId ? `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}` : 'https://api.thecatapi.com/v1/images/search';

        fetch(apiUrl, {
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
                const newUrl = selectedBreedId ? `/cat?breed_id=${selectedBreedId}&index=${currentIndex}` : `/cat?index=${currentIndex}`;
                history.pushState({ breed: selectedBreedId, index: currentIndex }, null, newUrl);
            } else {
                console.error('No se pudo obtener la imagen de la raza seleccionada.');
            }
        })
        .catch(error => console.error('Error al obtener la imagen de la raza seleccionada:', error));
    }

    // Función para manejar la navegación hacia adelante
    function navigateNext() {
        currentIndex++;
        const selectedBreedId = selectElement.value;
        updateImageAndHistory(selectedBreedId);
    }

    // Función para manejar la navegación hacia atrás
    function navigatePrev() {
        currentIndex = Math.max(0, currentIndex - 1);
        const selectedBreedId = selectElement.value;
        updateImageAndHistory(selectedBreedId);
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

        // Verificar la URL actual para establecer la raza seleccionada y el índice
        const urlParams = new URLSearchParams(window.location.search);
        const selectedBreedIdFromURL = urlParams.get('breed_id');
        const indexFromURL = parseInt(urlParams.get('index'), 10) || 0;
        currentIndex = indexFromURL;

        if (selectedBreedIdFromURL) {
            selectElement.value = selectedBreedIdFromURL;
            updateImageAndHistory(selectedBreedIdFromURL);
        }
    })
    .catch(error => console.error('Error al obtener las razas de gatos:', error));

    // Agregar eventos de cambio al elemento select
    selectElement.addEventListener('change', function () {
        currentIndex = 0; // Restablecer el índice al seleccionar una nueva raza
        const selectedBreedId = selectElement.value;
        updateImageAndHistory(selectedBreedId);
    });

    // Agregar eventos de clic a los botones de navegación
    prevButton.addEventListener('click', navigatePrev);
    nextButton.addEventListener('click', navigateNext);
});
