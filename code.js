import playlist from "./playlists.json";
import canciones from "./canciones.json";

console.log("El módulo se ha importado correctamente.");

// Reproductor de musica

const reproductor = document.querySelector("audio");
const botonPrimero = document.querySelectorAll(".botonPlayLista");

// Funcion para que cada boton de play tome como value el nombre de su span ( Para luego matchear con el nombre de la cancion y que se reproduzca)

let regex = /\w+/gi;
botonPrimero.forEach((boton) => {
  const botones = boton.parentNode;
  boton.value = botones
    .querySelector("span")
    .textContent.match(regex)
    .join(" ");
});

// Nombre de cancion en el reproductor

const nombreCancion = document.querySelector(
    ".nombreCancionReproductor"
  );

  const cancionNombreRepro = nombreCancion.appendChild(
    document.createElement("span")
  );

  // Funcion que matchea el valor del boton play con el nombre de la cancion, si existe se pasa al reproductor , se muestra el nombre de la cancion en el reproductor y se pone play

botonPrimero.forEach((boton) => {
  boton.addEventListener("click", () => {
    for (let cancion of canciones) {
      if (boton.value.includes(cancion.name)) {
        reproductor.src = `${cancion.url}`;
        reproductor.play();
        cancionNombreRepro.textContent = `${cancion.name} - ${cancion.artist}`;
      }
    }
  });
});
