console.log("Welcome to spotify");

let songIndex=0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songButton = document.getElementById('songButton');
let masterSongName = document.getElementById('masterSongName');

let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Creme Brulee - The Soundlings",filePath:"songs\Creme Brulee - The Soundlings.mp3", coverPath: "cover/1.jpg"},
    {songName:"Deck The Halls - The Soundlings",filePath:"songs\Deck The Halls - The Soundlings.mp3", coverPath:"cover/2.jpg"},
    {songName:"Going Home - The Soundlings",filePath:"songs\Going Home - The Soundlings.mp3", coverPath: "cover/3.jpg"},
    {songName:"Jingle Bells - The Soundlings",filePath:"songs\Jingle Bells - The Soundlings.mp3", coverPath: "cover/4.jpg"},
    {songName:"Silent Night - The Soundlings",filePath:"songs\Silent Night - The Soundlings.mp3", coverPath:"cover/5.jpg"},
    {songName:"Salame-e-Ishq",filePath:"songs/6.mp3", coverPath: "cover/6.jpg"},
    {songName:"Salame-e-Ishq",filePath:"songs/7.mp3", coverPath:"cover/7.jpg"},
    {songName:"Salame-e-Ishq",filePath:"songs/8.mp3", coverPath: "cover/8.jpg"},
    {songName:"Salame-e-Ishq",filePath:"songs/9.mp3", coverPath: "cover/9.jpg"},
    {songName:"Salame-e-Ishq",filePath:"songs/10.mp3", coverPath: "cover/10.jpg"},
]


let audioElement = new Audio('songs/1.mp3');

//handle play pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songs")[0].innerText = songs[i].songName;
});
//listen to event
audioElement.addEventListener('timeupdate', ()=>{
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
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
        gif.style.opacity=1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=9;
    }else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})