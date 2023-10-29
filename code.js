import canciones from "./canciones.json" assert { type: "json" };
import albums from "./albums.json" assert { type: "json" };
import playlist from "./playlist.json" assert { type: "json" };

const botonReproducir = document.querySelectorAll("#reproducir");
const reproductorMusica = document.querySelector("audio");
const botonPlay = document.querySelector("#botonPlay");
const botonPause = document.querySelector("#botonPause");
const botonNext = document.querySelector("#botonNext");
const botonStop = document.querySelector("#botonStop");
const botonBack = document.querySelector("#botonBack");
const volume = document.querySelector("#volume-control");
const nombreCancionReproducida = document.querySelector(
  "#nombreCancionReproducida"
);

/*************FUNCIONALIDADES REPRODUCTOR*************/
reproductorMusica.volume = 0.1; // Hago que la cancion empiece con el 50% del volumen para despues interactuar con el

volume.value = 10; // Le asigno un valor inicial a la barra de volumen

let regex = /\w+/gi;
//Busca los espacios en blanco y los elimina
///\w+/ de regex encuentra los caracteres alfanumericos seguidos
//gi no importa que sean minisculas o mayusculas

botonReproducir.forEach((boton) => {
  const botones = boton.parentNode; //parent node se utiliza para que trabaje en cada bloque padre de cada elemento y no se utilice siempre el primero
  boton.value = botones
    .querySelector("span")
    .textContent.match(regex)
    .join(" "); //(.querySelector) va a seleccionar el primer elemento hijo del elemento padre})

  //textContent : todo el texto que tiene adentro el elemento seleccionado previamente

  //funcion match: captura todos los alfanumericos y los mete en un array - y el metodo join (" ") le da espacio a las palabras almacenadas con el match.
});

/* CREA UN ELEMENTO SPAN Y SE LO AGREGO AL DIV DECLARADO EN EL HTML*/
let crearSpan = document.createElement("span");
nombreCancionReproducida.appendChild(crearSpan);

botonReproducir.forEach((boton) => {
  boton.addEventListener("click", () => {
    for (let cancion of canciones) {
      //separa en constantes diferentees cada objeto en el JSON
      if (cancion.nombre.toLowerCase() === boton.value.toLowerCase()) {
        // Comparamos si canciones.nombre es igual a boton.value (toLowerCase es una funcion predeterminada que si existe alguna mayuscula la toma como igual)
        reproductorMusica.src = `${cancion.url}`; //Se coloca template string porque debe pasarse como texto al html
        reproductorMusica.play(); //si encuentra todo va a pasar el URL a audio y le da play a la musica

        botonPlay.style.display = "none";
        botonPause.style.display = "block";
        crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}`; //El span creado cambia su contenido de texto dependiendo la cancion pasada al elemento audio. El objeto cancion toma como dato el nombre de la cancion y el nombre del artista.
      }
    }
  });
});

botonNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; //.currenTime es la propiedad que me marca el tiempo actual de la cancion
});

botonPause.addEventListener("click", () => {
  reproductorMusica.pause(); //.pause es una funcion ya predeterminada del elemento audio
  botonPlay.style.display = "block";
  botonPause.style.display = "none";
});

botonStop.addEventListener("click", () => {
  // evento boton Stop
  reproductorMusica.pause(); //Damos el mismo valor al evento del boton Pause
  reproductorMusica.currentTime = 0; //A diferencia igualamos el conteo a "0"
  if ((botonPause.style.display = "block")) {
    //Condicional si el boton pause esta visible, hacemos que cuando apretamos en "stop", aparezca nuevamente el boton play.
    botonPlay.style.display = "block";
    botonPause.style.display = "none";
  }
});

botonPlay.addEventListener("click", () => {
  //Evento boton play para que se reproduzca si hay una cancion enviada al elemento audio
  if (reproductorMusica.src != "#") {
    //Condicion si el src no se encuentra vacio = se ejecuta la funcion play y se esconde el play y aparece el pause.
    reproductorMusica.play();
    botonPlay.style.display = "none";
    botonPause.style.display = "block";
  }
});

//funcion que cuando aprete click, adelante 5 seg la cancion
botonNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; //.currenTime es la propiedad que me marca el tiempo actual de la cancion
});

//funcion que cuando aprete click, atrase 5 seg la cancion
botonBack.addEventListener("click", () => {
  if (reproductorMusica.currentTime >= 6) {
    reproductorMusica.currentTime -= 5;
  }
});

//funcion para manejar el volumen respecto a una barra input de rangos
volume.addEventListener("change", (ev) => {
  reproductorMusica.volume = ev.currentTarget.value / 100;
  console.log(reproductorMusica.volume);
});

/**************RENDERIZADO DE PLAYLIST*********************/
/*
const contenedorPrincipal = document.querySelector("#contenedorPrincipal")
const contenedorListas = document.querySelector("#musicList")
const listasReproduccion = document.querySelector("#listasReproduccion");
let crearSpanListas = document.createElement("span");


listasReproduccion.forEach( botonPlaylist => {  
botonPlaylist.addEventListener("click", () => {
  contenedorPrincipal.style.display = "none"
  contenedorListas.appendChild(crearSpanListas);
})
});

*/
/*******************BOTON ATRAS*****************************/

/*******************INPUT BUSCAR CANCION********************/

/*****************PASAR DE CANCION ***********************/

const app = document.querySelector("#renderizadoSecundario");
const listasDePlay = document.querySelectorAll("#listasReproduccion");
const renderPrinci = document.querySelector("#renderizadoPrincipal");

listasDePlay.forEach((playlists) => {
  playlists.addEventListener("click", () => {
    renderPrinci.style.display = "none";
    app.style.display = "flex";
    for (let playlista of playlists.children) {
      const info = playlista.querySelector("span");
      playlist.forEach((listas) => {
        if (info) {
          if (
            listas.nombre.toLocaleLowerCase() ==
            info.textContent.toLocaleLowerCase()
          ) {
            if (app.children.length == 0) {
              listas.listado.forEach((lista) => {
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                div.setAttribute("id", "divPlaylist");
                div2.setAttribute("id", "divPlaylist2");
                botonPlaylist.setAttribute("id", "reproducir2");
                app.appendChild(div);
                div2.appendChild(spanCancion);
                div2.appendChild(spanArtista);
                div.appendChild(div2);
                div.appendChild(botonPlaylist);
                spanCancion.textContent = `${lista.nombre}`;
                spanArtista.textContent = `${lista.artista}`;
                botonPlaylist.textContent = `Play`;

                
                botonPlaylist.addEventListener("click", () => {
                  console.log("Hello");
                });
              });
            } else {
              app.innerHTML = `<div id="renderizadoSecundario"></div>`;
              listas.listado.forEach((lista) => {
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                div.setAttribute("id", "divPlaylist");
                div2.setAttribute("id", "divPlaylist2");
                botonPlaylist.setAttribute("id", "reproducir2");
                app.appendChild(div);
                div2.appendChild(spanCancion);
                div2.appendChild(spanArtista);
                div.appendChild(div2);
                div.appendChild(botonPlaylist);
                spanCancion.textContent = `${lista.nombre}`;
                spanArtista.textContent = `${lista.artista}`;
                botonPlaylist.textContent = `Play`;


                botonPlaylist.addEventListener("click", () => {
                  console.log("Hello");
                });
              });
            }
          }
        }
      });
    }
  });
});



/* Funcion para avanzar o retroceder cancion siguiente o anterior
let cancionSelec = canciones.findIndex((cancion) =>
 cancion.url == audio.src);

if (cancionSelec === canciones.length - 1) {
  audio.src = canciones[0].url;
} else {
  audio.src = canciones[cancionSelec + 1].url;
}

*/
