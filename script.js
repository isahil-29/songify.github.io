console.log("Welcome To Songify")
let audioElement = new Audio('../songs/1.mp3');
// audioElement.play();
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs= [
    {songName: "Warriyo Mortals (NCS Release)" , filepath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "Ceilo - Huma Huma (NCS Release) " , filepath: "songs/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "Deaf - Key Key On  (NCS Release)" , filepath: "songs/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "Different Heaven (NCS Release)" , filepath: "songs/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Janji Heroes Heroes (NCS Release)" , filepath: "songs/5.mp3" , coverPath: "covers/5.jpg"},
    {songName: "Sub Urban - Cradles(NCS Release)" , filepath: "songs/6.mp3" , coverPath: "covers/6.jpg"},
    {songName: "Cartoon - On & On (NCS Release)" , filepath: "songs/7.mp3" , coverPath: "covers/7.jpg"},
    {songName: "Time To Talk Talk (NCS Release)" , filepath: "songs/8.mp3" , coverPath: "covers/8.jpg"},
]
songItems.forEach((element , i)=> {
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

//handling play pause

masterPlay.addEventListener('click' , () =>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// hadning progress bar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;

})
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click' , (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById("next").addEventListener('click' , ()=>{
    if(songIndex >= 7){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    makeAllPlays();
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})

document.getElementById("previous").addEventListener('click' , ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})

