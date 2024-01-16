document.addEventListener('DOMContentLoaded', function () {
    const catImage = document.getElementById('imatge');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentIndex = 0;
    let catImages = [];

    // Función para cargar imágenes de gatos desde la API
    async function loadCatImages() {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
            const data = await response.json();
            catImages = data;
            updateCatImage();
        } catch (error) {
            console.error('Error al cargar las imágenes de gatos:', error);
        }
    }

    // Función para actualizar la imagen de gato en la página
    function updateCatImage() {
        const currentCat = catImages[currentIndex];
        catImage.src = currentCat.url;

        // Agregar la entrada al historial cuando cambia la imagen
        const newState = { catIndex: currentIndex };
        const newTitle = `Imagen ${currentIndex + 1}`;
        const newURL = `/image/${currentIndex + 1}`;

        history.pushState(newState, newTitle, newURL);
    }

    // Función para manejar los clics en los botones de navegación
    function handleNavigationClick(direction) {
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < catImages.length - 1) {
            currentIndex++;
        }

        updateCatImage();
    }

    // Manejar eventos de clic en los botones de navegación
    prevButton.addEventListener('click', () => handleNavigationClick('prev'));
    nextButton.addEventListener('click', () => handleNavigationClick('next'));

    // Escuchar el evento popstate para manejar cambios en la navegación
    window.addEventListener('popstate', function (event) {
        const newState = event.state;

        if (newState && newState.catIndex !== undefined) {
            currentIndex = newState.catIndex;
            updateCatImage();
        }
    });

    // Cargar las imágenes de gatos al cargar la página
    loadCatImages();
});
