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
        let chunks = [];

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
            document.getElementById("btnStop").classList.replace("stop_hidden","stop_visible");
        })
        stop.addEventListener('click', (ev) => {
            mediaRecorder.stopRecording();
            console.log(mediaRecorder.state);
            let form = new FormData();
            form.append('file', mediaRecorder.getBlob(), 'myGif.gif');
            console.log(form.get('file'));

            // crea el Blob del Gif cuando se presiona el boton stop

            let videoURL = URL.createObjectURL(form.get('file'));
            let newGif = document.createElement("IMG");
            newGif.style.margin = "5px"
            newGif.style.width = "290px"
            newGif.style.height = "290px"
            newGif.setAttribute("src", videoURL)
            document.getElementById("results_container").appendChild(newGif);
        });

    })