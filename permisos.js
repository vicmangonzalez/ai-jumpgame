let enlaceAlJuego = document.getElementById('linkAlJuego')

let abrirCamara = () => {
      navigator.mediaDevices.getUserMedia({
            video: true
      }).then((stream) => {
            let video = document.getElementById('laCamara')
            video.srcObject = stream
            video.onloadedmetadata = (ev) => video.play()
            enlaceAlJuego.classList.remove('d-none')
      }).catch((err) => console.log(err))
}