let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');
const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const bacButton = document.querySelector('.back-button');
const disk = document.querySelector('.disk')

playButton.addEventListener('click', () => {
    if(playButton.className.includes(pause)){
        music.play();
    }
    else {
        music.play();
    }
    playButton.classList.toggle('pause')
    disk.classList.toggle('play')
})


const setMusic = (i) =>{
    seekBar.ariaValueText = 0;
    let song = songs(i);
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentMusic.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.ariaValueMax = music.duration;
        songDuration.innerHTML= formatTime(music.duration)
        console.log(music.duration);
    },300)
  

}

setMusic(0);


const formatTime = (time) =>{
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}


setInterval(()=>{
    seekBar.ariaValueNow = music.currentTime;
    currentTime.innerHTML =formatTime(music.currentTime);
    if(Math.floor(music.currentTime)==Math.floor(seekBar.ariaValueMax)){
        forwardButton.click();
    }
},500)

seekBar.addEventListener('change',()=>{
    music.currentTime = seekBar.ariaValueNow;
})

const playMusic = () => {
    music.play();
    playButton.classList.remove('pause');
    disk.classList.remove('play')

}

forwardButton.addEventListener('click',()=>{
    if(currentMusic >= songs.length-1){
        currentMusic=0;
    }
    else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

bacButton.addEventListener('click',()=>{
    if(currentMusic <= 0){
        currentMusic= songs.length-1;
    }
    else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})