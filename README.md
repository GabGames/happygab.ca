<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Masquer le bouton de volume */
        #my-video::-webkit-media-controls-volume-slider,
        #my-video::-webkit-media-controls-mute-button,
        #my-video::-webkit-media-controls-volume-control {
            display: none;
        }

        /* Styliser le sélecteur audio */
        #audioSelector {
            position: absolute;
            bottom: -25px;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
        }

        /* Styliser le sélecteur vidéo */
        #videoSelector {
            position: absolute;
            bottom: -25px;
            left: 100px;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    </style>
    <script src="https://www.youtube.com/iframe_api"></script>
</head>

<body>
    <div id="player-container" style="position: relative;">
        <!-- Balise audio pour la piste audio -->
        <audio id="audioPlayer" controls style="display: none;"></audio>

        <!-- Menu déroulant pour les pistes audio -->
        <select id="audioSelector">
            <option value="0" label="Par défaut" selected>Par défaut</option>
            <option value="1" label="Français">Français</option>
            <option value="2" label="English">English</option>
            <option value="3" label="Japonais">Japonais</option>
        </select>

        <!-- Menu déroulant pour les vidéos -->
        <select id="videoSelector">
            <option value="x1j758Oye58" label="Mon absence…" selected>Vidéo 1</option>
            <option value="Nv5ouwXVRek" label="Quand j'ouvre un jeu sur mon ancien laptop...">Vidéo 2</option>
            <!-- Ajoutez d'autres options pour différentes vidéos -->
        </select>

        <div id="player"></div>
    </div>

    <script>
        var player;
        var audioSelector = document.getElementById("audioSelector");
        var audioPlayer = document.getElementById("audioPlayer");
        var videoSelector = document.getElementById("videoSelector");
        var isVideoPlaying = false;

        // Débogage : Ajouter des messages pour vérifier le chargement de l'API YouTube
        console.log("Chargement de l'API YouTube...");

        function onYouTubeIframeAPIReady() {
            console.log("API YouTube prête.");
            var selectedVideoId = videoSelector.value;
            initializeYouTubePlayer(selectedVideoId);
        }

        function initializeYouTubePlayer(videoId) {
            if (player) {
                player.destroy();
            }

            player = new YT.Player('player', {
                height: '720',
                width: '1140',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            // Lorsque le lecteur vidéo YouTube est prêt
            var playerElement = document.getElementById("player");

            // Activer le mode plein écran
            playerElement.requestFullscreen = playerElement.requestFullscreen || playerElement.mozRequestFullScreen || playerElement.webkitRequestFullscreen || playerElement.msRequestFullscreen;
            
            if (playerElement.requestFullscreen) {
                playerElement.requestFullscreen();
            }
        }

        function onPlayerStateChange(event) {
            // Lorsque l'état de la vidéo change (lecture, pause, etc.)
            var state = event.data;

            console.log("État de la vidéo :", state);

            if (state === YT.PlayerState.PLAYING) {
                // La vidéo est en cours de lecture, commencez la piste audio si elle est sélectionnée
                isVideoPlaying = true;
                updateAudio();
            } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
                // La vidéo est en pause ou terminée, mettez en pause la piste audio
                isVideoPlaying = false;
                updateAudio();
            }
        }

        audioSelector.addEventListener("change", function () {
            // Lorsque la sélection de piste audio change, mettez à jour la piste audio en cours de lecture
            console.log("Changement de la piste audio...");
            updateAudio();
        });

        videoSelector.addEventListener("change", function () {
            // Lorsque la sélection de vidéo change, chargez la nouvelle vidéo
            audioPlayer.pause();

            console.log("Changement de la vidéo...");
            var selectedVideoId = videoSelector.value;
            initializeYouTubePlayer(selectedVideoId);
        });

        function updateAudio() {
            var selectedVideoId = videoSelector.value;

            if (isVideoPlaying) {
                var selectedAudioTrack = audioSelector.value;
                 // Piste en Français
                if (selectedAudioTrack === "1") {
                    if (selectedVideoId === "x1j758Oye58") {
                        audioPlayer.src = "https://drive.google.com/uc?export=download&id=1e2z74oGhEW4JTkKQTwUPL3SrPK8SVcCm";
                    } else if (selectedVideoId === "Nv5ouwXVRek") {
                        audioPlayer.src = "https://drive.google.com/uc?export=download&id=1sO7v8swNKTnbKgMHoCCi09AXjaLlRbmS";
                    }

                    audioPlayer.currentTime = player.getCurrentTime();
                    audioPlayer.play();
                    player.mute();

                // Piste en Anglais
                } else if (selectedAudioTrack === "2") {
                    if (selectedVideoId === "x1j758Oye58") {
                        audioPlayer.src = "https://drive.google.com/uc?export=download&id=1H6sZ1aqIZ5p74ucoWhZ85Xd5gqnuZ3Lc";
                    } else if (selectedVideoId === "Nv5ouwXVRek") {
                        audioPlayer.src = "https://drive.google.com/uc?export=download&id=1BWDnYccNXZ0IeUCCfVTfkXgGm-A2YVs5";
                    }

                    audioPlayer.currentTime = player.getCurrentTime();
                    audioPlayer.play();
                    player.mute();
                } else {
                    audioPlayer.src = "";
                    player.unMute();
                }
            } else {
                audioPlayer.pause();
            }
        }
    </script>
</body>

</html>
