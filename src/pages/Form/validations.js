export default function validations(input) {
    let err = {};

    // Nombre del libro
    if(!input.name) err.name = "Error: name not found"
    else err.name = "";

    // Nombre del autor
    if(!input.author) err.author = "Error: author not found"
    else err.author = "";

    // Imagen de portada
    if(!input.cover) err.cover = "Error: cover not found"
    else err.cover = "";

    // Descripción
    if(!input.description) err.description = "Error: description not found"
    else err.description = "";

    // Precio
    if(!input.price) err.price = "Error: price not found"
    else err.price = "";

    // Editorial
    if(!input.publisher) err.publisher = "Error: publisher not found"
    else err.publisher = "";

    // Fecha de salida
    if(!input.publisher_date) err.publisher_date = "Error: date not found"
    else err.publisher_date = "";

    // Número de páginas
    if(!input.pages) err.pages = "Error: number of pages not found"
    else err.pages = "";

    // Idioma
    if(!input.language) err.language = "Error: language not found"
    else err.language = "";

    // Géneros
    if(!input.genres) err.genres = "Error: genres not found"
    else err.genres = "";

}