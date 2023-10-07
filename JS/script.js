window.onload = function () {
  // VARIABLES
  let myButton = document.getElementById("myButton");
  let mySection = document.getElementById("section");
  let articles = mySection.querySelectorAll("article");
  let wordDisplay = document.getElementById("wordDisplay");
  let myInput = document.getElementById("myInput");
  let randomWord = "";
  let imageOne = document.getElementById("imageOne");
  let imageTwo = document.getElementById("imageTwo");
  let imageThree = document.getElementById("imageThree");

  let myButton2 = document.getElementById("myButton2");

  let mostrarIncorrectas = document.getElementById("mostrarIncorrectas");
  let mostrarCorrectas = document.getElementById("mostrarCorrectas");

  let partidasGanadas = document.getElementById("contadorGanadas");
  let partidasPerdidas = document.getElementById("contadorPerdidas");

  let winsParty = 0;
  let lossesParty = 0;
  let dashes = "";
  let comprobacion = 1;

  let contadorPuntuacion = document.getElementById("contadorPuntuacion");
  let puntuacion = 0;

  // ARRAY CON LAS PALABRAS PARA EL JUEGO
  const arrayWords = [
    "EDIFICIO",
    "DOCTORADO",
    "ABOGADO",
    "CORBATA",
    "SANDALIAS",
    "EJERCICIO",
    "TECLADO",
    "ORDENADOR",
    "LIBRETA",
    "PELUQUERIA",
    "DENTISTA",
    "GUITARRA",
    "VENTANA",
    "COCINA",
    "BICICLETA",
    "PINTURA",
    "PARAGUAS",
    "ZAPATILLAS",
    "TELEFONO",
    "CAMISETA",
    "RELOJ",
    "LAPIZ",
    "REVISTA",
    "ESCUELA"
  ];

  // ARRAY PARA EL CONTEO DE LETRAS CORRECTAS E INCORRECTAS
  const arrayLetrasCorrectas = [];
  const arrayLetrasIncorrectas = [];

  // CON ESTA FUNCION EMPEZAREMOS EL JUEGO
  function empezarJuego() {

    //BOTON PARA CAMBIAR EL COLOR DEL TEMA (LO COGEREMOS POSTERIORMENTE)
    let botonCambioFondo = document.getElementById("botonCambioFondo");

    // ESTILOS PARA MOSTRAR LAS SECCIONES OCULTAS Y QUEDE UNA INTRODUCCIÓN AL JUEGO BONITA Y SUAVE
    myButton.style.opacity = "0";

    // CON LA FUNCION SETTIMEOUT LE HAREMOS 300ms PARA QUE AL DARLE AL BOTON DE EMPEZAR JUEGO SE HAGA UNA TRANSICION SUAVE
    setTimeout(function () {

      //MOSTRAREMOS/OCULTAREMOS LOS ELEMENTOS QUE NO/NOS HAGA FALTA VISUALIZAR DURANTE EL JUEGO
      myButton.style.display = "none";
      mySection.style.display = "flex";
      botonCambioFondo.style.display = "flex";

      articles.style.display = "flex";


    }, 300);

    // CON ESTAS 2 LINEAS OBTENDREMOS UNA PALABRA ALEATORIA DEL ARRAY DE PALABRAS
    let randomIndex = Math.floor(Math.random() * arrayWords.length);
    randomWord = arrayWords[randomIndex];
    console.log(randomWord);

    //VAMOS A SELECCIONAR DEL HTML CADA CLASE CON LA PALABRA pista Y LE AÑADIMOS EL VALOR DE LA Z
    let pista = document.querySelector(".pista" + randomIndex);
    pista.style.display = "flex";

    // CON ESTA LINEA VAMOS A CREAR UN STRING CON _ SEGUN LA LONGITUD DE LA PALABRA ALEATORIA
    dashes = "_".repeat(randomWord.length);

    // AQUI MOSTRAMOS LOS GUIONES GENERADOS SEGUN EL TAMAÑO DE LA PALABRA EN EL HTML
    wordDisplay.innerHTML = dashes;
  }

  myButton.addEventListener("click", empezarJuego);

  // Función para manejar la tecla presionada
  function manejarTeclaPresionada(event) {
    var keyCode = event.keyCode;

    if (keyCode == 13) {
      let inputValue = myInput.value.toUpperCase();

      if (randomWord.includes(inputValue)) {
        if (arrayLetrasCorrectas.includes(inputValue)) {
          alert("Ya has introducido esa letra, prueba con otra");
        } else {
          arrayLetrasCorrectas.push(inputValue);
          puntuacion += 30;
          contadorPuntuacion.innerHTML = puntuacion;
        }

        mostrarCorrectas.innerHTML = arrayLetrasCorrectas.join(", ");
        mostrarCorrectas.style.color = "green";

        dashes = "";

        for (let i = 0; i < randomWord.length; i++) {
          if (randomWord[i] === inputValue) {
            dashes += inputValue;
          } else {
            dashes += wordDisplay.innerHTML[i];
          }
        }

        wordDisplay.innerHTML = dashes;

        // Verifica si el usuario ha ganado
        if (!dashes.includes("_")) {
          winsParty += 1;
          comprobacion = 1;

          //ALERTA PERSONALIZADA CON LIBRERIA BOOTBOX
          let dialog = bootbox.dialog({
            title: "ESTAMOS COMPROBANDO TU RESULTADO...",
            message:
              '<p><i class="fas fa-spin fa-spinner"></i>Valorando tus respuestas...</p>' +
              '<img src="./IMG/ganar.gif" style="width: 100px;" >',
          });

          dialog.init(function () {
            setTimeout(function () {
              dialog.find(".bootbox-body").html("HAS GANADO LA PARTIDA");
            }, 10000);
          });

          //LLAMAMOS A LA FUNCION REINICIAR JUEGO
          reiniciarJuego();
        }
      } else {
        if (arrayLetrasIncorrectas.includes(inputValue)) {
          alert("Ya has introducido esa letra, prueba con otra");
        } else {
          arrayLetrasIncorrectas.push(inputValue);
          puntuacion -= 10;
          contadorPuntuacion.innerHTML = puntuacion;
        }

        mostrarIncorrectas.style.color = "red";
        mostrarIncorrectas.textContent = arrayLetrasIncorrectas.join(", ");

        switch (arrayLetrasIncorrectas.length) {
          case 1:
            imageTwo.style.display = "none";
            break;
          case 2:
            imageThree.style.display = "none";
            break;
          case 3:
            imageOne.style.display = "none";
            break;
        }

        if (imageOne.style.display === "none") {
          let dialog = bootbox.dialog({
            title: "ESTAMOS COMPROBANDO TU RESULTADO...",
            message:
              '<p><i class="fas fa-spin fa-spinner"></i>Valorando tus respuestas...</p>' +
              '<img src="./IMG/perder.gif" style="width: 100px;" >',
          });

          dialog.init(function () {
            setTimeout(function () {
              dialog.find(".bootbox-body").html("HAS PERDIDO LA PARTIDA");
            }, 10000);
          });

          comprobacion = 0;
          lossesParty += 1;

          reiniciarJuego();
        }
      }
    }
  }
  document.addEventListener("keydown", manejarTeclaPresionada);

  function reiniciarJuego() {
    if (comprobacion === 1) {
      partidasGanadas.innerHTML = winsParty;
      partidasGanadas.style.color = "green";
    }

    if (comprobacion === 0) {
      partidasPerdidas.innerHTML = lossesParty;
      partidasPerdidas.style.color = "red";
    }

    // Ocultar todas las pistas
    let pistas = document.querySelectorAll(".pista");
    for (let pista of pistas) {
      pista.style.display = "none";
    }

    // REINICIAMOS LA PALABRA RANDOM
    randomWord = "";

    // REINICIAMOS LOS ARRAYS QUE LLEVAN EL CONTEO DE LETRAS CORRECTAS E INCORRECTAS
    arrayLetrasCorrectas.length = 0;
    arrayLetrasIncorrectas.length = 0;

    imageOne.style.display = "flex";
    imageTwo.style.display = "flex";
    imageThree.style.display = "flex";

    mostrarCorrectas.innerHTML = "";
    mostrarIncorrectas.innerHTML = "";

    // LLAMAMOS OTRA VEZ A MATH.FLOOR PARA GENERAR UNA PALABRA NUEVA
    let randomIndex = Math.floor(Math.random() * arrayWords.length);
    randomWord = arrayWords[randomIndex];

    // LA VARIABLE DASHES LA VOLVEMOS A REINICIAR SEGUN LA LONFITUD DE LA PALABRA ALEATORIA
    dashes = "_".repeat(randomWord.length);
    wordDisplay.innerHTML = dashes;

    // OBTENEMOS LA NUEVA PISTA Y LA MOSTRAMOS
    let pistaNueva = document.querySelector(".pista" + randomIndex);
    pistaNueva.style.display = "flex";

    // MOSTRAREMOS EL JUEGO UNA VEZ REINICIEMOS EL JUEGO
    mySection.style.display = "flex";

    // QUITAREMOS EL BOTON DE REINICIAR JUEGO
    myButton2.style.display = "none";
  }

  myButton2.addEventListener("click", reiniciarJuego);

  
  //TODO LO RELACIONADO CON EL VOLUMEN
  let buttonVolume = document.getElementById("buttonVolume");
  let desplegableVolume = document.getElementById("desplegableVolume");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const volumeControl = document.getElementById("volumeControl");

  function desplegarAjustesVolumen() {
    desplegableVolume.style.display = "flex";
  }

  buttonVolume.addEventListener("click", desplegarAjustesVolumen);

  volumeControl.addEventListener("input", function () {
    backgroundMusic.volume = this.value;
  });
  

  //TODO LO RELACIONADO CON EL CAMBIO DEL COLOR DEL TEMA
  let bolaSeleccion = document.getElementById("bolaSeleccion");
  let imagenOscuro = document.getElementById("imagenOscuro");

  let imagenOscuro2 = document.getElementById("imagenOscuro2");
  let bolaSeleccion2 = document.getElementById("bolaSeleccion2");

  let miBody = document.getElementById("miBody");

  //CON QUERYSELECTORALL PARA COGER TODOS LOS ELEMENTOS CON CLASE .PISTA
  let pistas = document.querySelectorAll(".pista");

  function fondoOscuro() {
    let buttonVolume = document.getElementById("buttonVolume");
    let buttonReglas = document.getElementById("buttonReglas");
    let titulo = document.getElementById("titulo");
    let misEstadisticas = document.getElementById("misEstadisticas");
    let botonCambio = document.getElementById("botonCambio");
    let bolaSeleccion2 = document.getElementById("bolaSeleccion2");
    let imagenOscuro2 = document.getElementById("imagenOscuro2");
    let vidas = document.getElementById("vidas");
    let contadorPartidasGan = document.getElementById("contadorPartidasGan");
    let contadorPartidasPerd = document.getElementById("contadorPartidasPerd");
    let punt = document.getElementById("punt");


    bolaSeleccion.style.display = "none";
    bolaSeleccion2.style.display = "flex";

    miBody.style.backgroundColor = "#1f1f1f";

    buttonVolume.style.backgroundColor = "#36393B";
    buttonVolume.style.boxShadow = "12px 12px 30px 0px #000";
    buttonVolume.style.color = "white";

    buttonReglas.style.backgroundColor = "#e5e5e5";

    titulo.style.color = "white";

    misEstadisticas.style.backgroundColor = "#36393B";
    misEstadisticas.style.boxShadow = "12px 12px 30px 0px #000";
    contadorPartidasGan.style.color = "white";
    contadorPartidasPerd.style.color = "white";
    punt.style.backgroundColor = "#36393B";
    punt.style.boxShadow = "12px 12px 30px 0px #000";

    botonCambio.style.backgroundColor = "#fca311";
    bolaSeleccion2.style.backgroundColor = "black";
    imagenOscuro2.style.display = "none";

    vidas.style.backgroundColor = "#36393B";
    vidas.style.boxShadow = "12px 12px 30px 0px #000";

    //PARA CADA CLASE CON NOMBRE PISTA LE APLICAREMOS EL ESTILO
    //HACEMOS UNA FUNCION CALLBACK (PISTAS)
    pistas.forEach(function(pistas) {

      pistas.style.backgroundColor = "#36393B";
      pistas.style.boxShadow = "12px 12px 30px 0px #000";


      let parrafosPistas = document.querySelectorAll("p");

      //REALIZO OTRO FOREACH DENTRO DEL DEL PADRE PARA COGER CADA ELEMENTO P DENTRO DE CADA CLASE PISTA
      parrafosPistas.forEach(function(parrafosPistas){

        parrafosPistas.style.color="white";

      });

    });


  }
  imagenOscuro2.addEventListener("click", fondoOscuro);

  //CON ESTA FUNCION LO QUE HAGO ES REINICIAR LOS COLORES AL 'PREDETERMINADO' DE LA APP
  function fondoClaro() {
    bolaSeleccion.style.display = "";
    bolaSeleccion2.style.display = "";

    miBody.style.backgroundColor = "";

    buttonVolume.style.backgroundColor = "";
    buttonVolume.style.boxShadow = "";
    buttonVolume.style.color = "";

    buttonReglas.style.backgroundColor = "";

    titulo.style.color = "";

    misEstadisticas.style.backgroundColor = "";
    misEstadisticas.style.boxShadow = "";
    contadorPartidasGan.style.color = "";
    contadorPartidasPerd.style.color = "";

    botonCambio.style.backgroundColor = "";
    bolaSeleccion2.style.backgroundColor = "";

    vidas.style.backgroundColor = "";
    vidas.style.boxShadow = "";
    punt.style.backgroundColor = "";
    punt.style.boxShadow = "";

    //PARA CADA CLASE CON NOMBRE PISTA LE APLICAREMOS EL ESTILO
    //HACEMOS UNA FUNCION CALLBACK (PISTAS)
    pistas.forEach(function(pistas) {
      pistas.style.backgroundColor = "";
      pistas.style.boxShadow = "";

      let parrafosPistas = document.querySelectorAll("p");

      parrafosPistas.forEach(function(parrafosPistas){
        parrafosPistas.style.color="";
      });

    });

    imagenOscuro2.style.display = "flex";
  }
  imagenOscuro.addEventListener("click", fondoClaro);

};
