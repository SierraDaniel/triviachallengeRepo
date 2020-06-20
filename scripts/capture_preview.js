let constraintObj = {
    audio: false,
    video: {
        height: {
            max: 480
        }
    }
};


navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
        //conecta media stream al elemento contenedor de video
        let video = document.querySelector('video');
        video.srcObject = mediaStreamObj;

        video.onloadedmetadata = function (ev) {
            //muestra en el elemento video lo que está siendo grabado
            video.play();
        };

        //declara listeners para grabar gif
        let start = document.getElementById('btnStart');
        let stop = document.getElementById('btnStop');
        let upload = document.getElementById('btnUpload');

        //Crea el objeto recorder desde la libreria
        mediaRecorder = RecordRTC(mediaStreamObj, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('started')
            },
        });
        // startRecording y stopRecording, ev= evento del Mouse
        start.addEventListener('click', (ev) => {
            mediaRecorder.startRecording();
            console.log(mediaRecorder.state);
            document.getElementById("btnStop").classList.replace("stop_hidden", "stop_visible");
        })
        stop.addEventListener('click', (ev) => {
            mediaRecorder.stopRecording();
            console.log(mediaRecorder.state);
            let form = new FormData();
            form.append('file', mediaRecorder.getBlob(), 'myGif.gif');
            console.log(form.get('file'));

            // muestra el gif guardado en el contenedor de video

            let videoURL = URL.createObjectURL(form.get('file'));
            let preview = document.getElementById("preview_player");

            preview.setAttribute("src", videoURL);
            preview.classList.toggle("preview_player_visible");

            // muestra los botones ocultos
            document.getElementById("btnStop").classList.replace("stop_visible", "stop_hidden");
            document.getElementById("btnStart").classList.replace("button_capture", "capture_hidden");
            document.getElementById("afterButtons").classList.replace("hidden_buttons", "shown_buttons");

        });

        upload.addEventListener('click', async function (ev) {
            document.getElementById("preview_player").classList.replace("preview_player_visible", "player_hidden");
            document.getElementById("success_container").classList.replace("success_hidden", "success_visible");
            document.getElementById("playerWindow").classList.replace("playerWindowVisible", "playerWindowHidden")
            let formdata = new FormData();
            formdata.append("api_key", "cwvIclC4Z5Ondbs0vcsTLdgXmOOllsEM");
            formdata.append('file', mediaRecorder.getBlob(), 'myGif.gif');

            // fetch para sacar el Id

            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            let gifId;
            let gifURL;
            await fetch("https://upload.giphy.com/v1/gifs", requestOptions)
                .then(response => response.text())
                .then(result => result.split('"', 6))
                .then((result) => {
                    (console.log("Gif Id is: " + result[5]));
                    return gifId = result[5]
                })
                .catch(error => console.log('error', error));

            // fetch get para sacar la URL del Id
            await fetch('https://api.giphy.com/v1/gifs/' + gifId + '?api_key=cwvIclC4Z5Ondbs0vcsTLdgXmOOllsEM')
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    console.log(json.data.images.downsized.url)
                    return gifURL = json.data.images.downsized.url
                })

            // guardar en LocalStorage
            localStorage.setItem(gifId, gifURL);

            document.getElementById("display_saved").setAttribute("src", gifURL);

            // boton copiar url del gif
            let copy = document.getElementById("btnCopy")
            copy.addEventListener('click', function copiarAlPortapapeles() {

                // Crea un campo de texto "oculto"
                var aux = document.createElement("input");
                // Asigna el contenido del elemento especificado al valor del campo
                aux.setAttribute("value", gifURL);
                // Añade el campo a la página
                document.body.appendChild(aux);
                // Selecciona el contenido del campo
                aux.select();
                // Copia el texto seleccionado
                document.execCommand("copy");
                // Elimina el campo de la página
                document.body.removeChild(aux);
            })

            // boton descargar gif
            let BtnDownload = document.getElementById("btnDownload")
            BtnDownload.addEventListener('click', (ev) => {
                BtnDownload.href = gifURL;
                BtnDownload.target = "_blank"

            })

        });

        function imprimir() {

            for (let i = 0; i < localStorage.length; i++) {
          
              let clave = localStorage.key(i);
              let gifURL = localStorage.getItem(clave);
          
              var img = document.createElement("img");
              img.style.margin = "5px"
              img.style.width = "290px"
              img.style.height = "290px"
              img.src = gifURL
              document.getElementById("results_container2").appendChild(img);
            }}
            //Imprime gifs guardados en localStorage 
            imprimir();

    });
