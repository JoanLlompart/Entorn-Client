document.addEventListener('DOMContentLoaded', function () {
    const breedList = document.getElementById('breedList');
    const imatgeCat = document.getElementById('imatge');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const apiKey = 'live_GgbvvQT25dVUAsuZH69auOwR9PsUHCAGUnR3Ij6yY8HQWINBvz90kghPdotnztK2';
    let currentIndex = 0;

    function updateImageAndHistory(selectedBreedId) {
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
                const newUrl = selectedBreedId ? `/cat?breed_id=${selectedBreedId}` : '/cat';
                history.pushState({ breed: selectedBreedId }, null, newUrl);
            } else {
                console.error('No se pudo obtener la imagen de la raza seleccionada.');
            }
        })
        .catch(error => console.error('Error al obtener la imagen de la raza seleccionada:', error));
    }

    function navigateNext() {
        currentIndex++;
        const selectedBreedId = breedList.children[currentIndex].getAttribute('data-breed-id');
        updateImageAndHistory(selectedBreedId);
    }

    function navigatePrev() {
        currentIndex = Math.max(0, currentIndex - 1);
        const selectedBreedId = breedList.children[currentIndex].getAttribute('data-breed-id');
        updateImageAndHistory(selectedBreedId);
    }

    fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(breed => {
            // Crear un elemento de lista por cada raza
            const listItem = document.createElement('li');
            listItem.setAttribute('data-breed-id', breed.id);

            // Crear un enlace para dirigirse a la página de la raza
            const breedLink = document.createElement('a');
            breedLink.href = `/cat?breed_id=${breed.id}&index=${currentIndex}`;
            breedLink.textContent = breed.name;

            listItem.appendChild(breedLink);
            breedList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error al obtener las razas de gatos:', error));

    prevButton.addEventListener('click', navigatePrev);
    nextButton.addEventListener('click', navigateNext);
});
