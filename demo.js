const music = document.querySelector("audio")
const songTitle = document.querySelector(".song-title")
const artistName = document.querySelector(".artist-name")
const playBtn = document.querySelector(".play-pause")
const playIcn = document.querySelector(".playIcn")
const pauseIcn = document.querySelector(".pauseIcn")
const albumArtAnimation = document.querySelector(".album-art")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const musicCurrentTime = document.querySelector(".current-time")
const musicTotalTime = document.querySelector(".total-time")
const musicProgress = document.querySelector(".progress")
const musicProgressDot = document.querySelector(".progress-dot")



console.log(prevBtn, nextBtn);


let songs = [
     {
          title: "title1",
          artist: "artist1",
          src: './music/music01.mp3'
     },
     {
          title: "title2",
          artist: "artist2",
          src: './music/music02.mp3'
     },
     {
          title: "title3",
          artist: "artist3",
          src: './music/music03.mp3'
     },
     {
          title: "title4",
          artist: "artist4",
          src: './music/music04.mp3'
     },
     {
          title: "title5",
          artist: "artist5",
          src: './music/music05.mp3'
     },
     {
          title: "title6",
          artist: "artist6",
          src: './music/music06.mp3'
     }
]



let isPlaying = false
let songNumber = 0
let musicProgressCal = 0



function playMusic() {
     isPlaying = true
     music.play()
     updatePlayPauseIcn()
}


function pauseMusic() {
     isPlaying = false
     music.pause()
     updatePlayPauseIcn()

}




function updatePlayPauseIcn() {
     playIcn.style.display = isPlaying ? "none" : "block"
     pauseIcn.style.display = isPlaying ? "block" : "none"
     albumArtAnimation.classList.toggle("rotate-animation")
}


playBtn.addEventListener("click", () => isPlaying ? pauseMusic() : playMusic())







function musicDetailsUpdate(songs) {
     songTitle.textContent = songs.title
     artistName.textContent = songs.artist
     music.src = songs.src
}


musicDetailsUpdate(songs[songNumber])


prevBtn.addEventListener("click", () => {
     songNumber = (songNumber - 1 + songs.length) % songs.length
     musicDetailsUpdate(songs[songNumber])
     playMusic()
})

nextBtn.addEventListener("click", () => {
     songNumber = (songNumber + 1) % songs.length
     musicDetailsUpdate(songs[songNumber])
     playMusic()
})









music.addEventListener("timeupdate", (e) => {
     const { currentTime, duration } = e.target
     const currentTimeInMin = musicTimeFormatter(currentTime, "/")
     const currentTimeInSec = musicTimeFormatter(currentTime, "%")
     musicCurrentTime.textContent = `${currentTimeInMin}:${currentTimeInSec}`

     if (duration) {
          const totalTimeInMin = musicTimeFormatter(duration, "/")
          const totalTimeInSec = musicTimeFormatter(duration, "%")
          musicTotalTime.textContent = `${totalTimeInMin}:${totalTimeInSec}`
     }



    musicProgressCal = (currentTime/duration)*100
     musicProgress.style.width = `${musicProgressCal}%`
     musicProgressDot.style.left = `${musicProgressCal}%`

})



function musicTimeFormatter(sec, op) {
     if (op == "/") {
          return Math.floor(sec / 60)
     } else if (op == "%") {
          return Math.floor(sec % 60).toString().padStart(2,"0")
     }
}