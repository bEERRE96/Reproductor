import playlist from "./playlists.json";
import canciones from "./canciones.json";

console.log("El módulo se ha importado correctamente.")

const inputBuscar = document.querySelector("#inputBuscar");


inputBuscar.addEventListener("keyup", (e) => {
    console.log(e.target.value)
})



