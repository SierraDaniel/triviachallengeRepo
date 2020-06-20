/* Toggle de dropdown */
function drop() {
  document.getElementById("myDropdown").classList.toggle("show");
}


function modeSelector(sheet) {
  document.getElementById("styleSheet").setAttribute('href', sheet);
  document.getElementById("logo-img").setAttribute('src', "images/gifOF_logo_dark.png");
}

// funcion dark mode

darkBtn = document.getElementById("sailor_night")
darkBtn.addEventListener("click", () => {
  document.getElementById("styleSheet").setAttribute('href', 'styles/dark_mode_misguifos.css');
  document.getElementById("logo-img").setAttribute('src', "images/gifOF_logo_dark.png");
})

// funcion light mode
lightBtn = document.getElementById("sailor_day")
lightBtn.addEventListener("click", () => {
  document.getElementById("styleSheet").setAttribute('href', 'styles/styles_misguifos.css');
  document.getElementById("logo-img").setAttribute('src', "images/gifOF_logo.png");
})

function imprimir() {

  for (let i = 0; i < localStorage.length; i++) {

    let clave = localStorage.key(i);
    let gifURL = localStorage.getItem(clave);

    var img = document.createElement("img");
    img.style.margin = "5px"
    img.style.width = "290px"
    img.style.height = "290px"
    img.src = gifURL
    document.getElementById("results_container").appendChild(img);
  }}
  //Imprime gifs guardados en localStorage 
  imprimir();