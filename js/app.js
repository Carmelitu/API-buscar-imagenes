import API_KEY from './apikey.js';

const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === ''){
        mostrarAlerta('Agrega un término de búsqueda');

        return;
    }

    buscarImagenes(terminoBusqueda);

}

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
                <strong class="font-bold">Error:</strong>
                <span class="block sm:inline">${mensaje}</span>
            `;

        formulario.appendChild(alerta);
    }
}

function buscarImagenes(termino){
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${termino}&per_page=100`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits);
        })

}

function mostrarImagenes(imagenes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    // iterar sobre arreglo de imagenes

    imagenes.forEach(imagen => {
        const {previewURL, likes, views, largeImageURL} = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Likes </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Views </span> </p>

                        <a 
                        class="block w-full bg-blue-800 hover:bg-blue-500 uppercase text-white font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                        Ver Imagen
                        </a>
                    </div>

                </div>
            </div>
        `
    })

}




