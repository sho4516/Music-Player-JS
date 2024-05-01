const songs = [
    {
        id: 1,
        name: 'Saari duniya jala denge',
        artist: 'B Praak',
        img: './static/images/Saari-Duniya-Jalaa-Denge-From-ANIMAL-Hindi-2023-20231124191004-500x500.jpg',
        genre: 'Rock',
        source: './static/audio/saariDuniya.mp3'
    },
    {
        id: 2,
        name: 'Heeriye',
        artist: 'Arijit Singh',
        img: './static/images/heeriye.jpeg',
        genre: 'Jazz',
        source: './static/audio/Heeriye - Arijit Singh-(DJMaza).mp3'
    },
    {
        id: 3,
        name: 'Nit Nit',
        artist: 'Jasleen Royal',
        img: './static/images/nitnit.jpeg',
        genre: 'Rock',
        source: './static/audio/Nit Nit Lofi Version - Jasleen Royal-(DJMaza).mp3'
    },
    {
        id: 4,
        name: 'Rani Teri Vodka',
        artist: 'Sachet Parampara',
        img: './static/images/raniTeriVodka.jpeg',
        genre: 'Hip-hop',
        source: './static/audio/Rani Teri Vodka - Sachet Parampara-(DJMaza).mp3'
    },
    {
        id: 5,
        name: 'Toxic',
        artist: 'Ap Dhillon',
        img: './static/images/toxic.jpeg',
        genre: 'Jazz',
        source: './static/audio/Toxic-AP_Dhillon-(Djjaani.com).mp3'
    },
    {
        id: 6,
        name: 'Kya baat ay',
        artist: 'Hardy Sandhu',
        img: './static/images/kyaBaatAy.jpeg',
        genre: 'Hip-hop',
        source: './static/audio/Kya_Baat_Ay-Hardy_Sandhu-(Djjaani.com).mp3'
    },
    {
        id: 7,
        name: 'Sajjda',
        artist: 'Ghulam Jugni',
        img: './static/images/sajjda.jpeg',
        genre: 'Rock',
        source: './static/audio/Sajjda - Gulam Jugni-(DJMaza).mp3'
    },
    {
        id: 8,
        name: 'White-brown-black',
        artist: 'Avvy sra',
        img: './static/images/hqdefault.jpg',
        genre: 'Hip-hop',
        source: './static/audio/White Brown Black - Karan Aujla-(DJMaza).mp3'
    },
    {
        id: 9,
        name: 'Zihaal-e-miskin',
        artist: 'Vishal Mishra',
        img: './static/images/maxresdefault.jpg',
        genre: 'Rock',
        source: './static/audio/Zihaal e Miskin - Vishal Mishra-(DJMaza).mp3'
    },
    {
        id: 10,
        name: 'Elevated',
        artist: 'Shubh',
        img: './static/images/elevated.jpeg',
        genre: 'Sad',
        source: './static/audio/Elevated - Shubh-(DJMaza).mp3'
    },
    {
        id: 11,
        name: 'O Saathi',
        artist: 'Atif Aslam',
        img: './static/images/osaathi.jpeg',
        genre: 'Romantic',
        source: './static/audio/O Saathi - Baaghi 2-(DJMaza).mp3'
    }
];

const genres = [...new Set(songs.map(song => song.genre))];
populateGenres(genres);

const toggleLabel = document.querySelector('.toggle-label');
const toggleTextEl = document.querySelector('.toggle-text');
const allSongListEl = document.querySelector('.all-song-list');
const selectedGenreEl = document.querySelector('.selectedGenre');
const cardEl = document.querySelector('.card');
let isDarkMode = false;
let playlist = [];
let currentPlaylist;
showSongs('All');

toggleLabel.addEventListener("click", ()=>{
    const allSongListItemEl = document.querySelectorAll('.all-song-list-item');
    const songCardEl = document.querySelector('.song-card');
    const allSongEl = document.querySelector('.all-song');
    const playlistEl = document.querySelector('.playlist');

    if(toggleLabel.classList.contains('toggle-text-direction')){
        isDarkMode = true;
        toggleTextEl.textContent = 'Light';
        setBackgroundColor('grey');
        allSongEl.style.backgroundColor = '#253238';
        playlistEl.style.backgroundColor = '#253238';
        songCardEl.style.backgroundColor = '#63696d';
        allSongListItemEl.forEach((item)=>{
            item.style.backgroundColor = '#63696d';
        });   
        cardEl.style.backgroundColor = '#253238'; 
        renderAllPlaylists();
        toggleLabel.classList.remove('toggle-text-direction');
    }else{
        isDarkMode = false;
        toggleTextEl.textContent = 'Dark';
        setBackgroundColor('white');
        allSongEl.style.backgroundColor = '#6bb8de';
        playlistEl.style.backgroundColor = '#6bb8de';
        songCardEl.style.backgroundColor = '#0d81bc';
        cardEl.style.backgroundColor = '#6bb8de'; 
        allSongListItemEl.forEach((item)=>{
            item.style.backgroundColor = '#0d81bc';
        });
        renderAllPlaylists();
        toggleLabel.classList.add('toggle-text-direction');
    }
});

selectedGenreEl.addEventListener("change", ()=>{
    allSongListEl.textContent = '';
    const selectedGenre = selectedGenreEl.options[selectedGenreEl.selectedIndex];
    showSongs(selectedGenre.text);
});

function setBackgroundColor(color){
    document.body.style.backgroundColor = color;
}

function populateGenres(genres){
    const selectedGenre = document.querySelector('.selectedGenre');
    genres.forEach((genre)=>{
        const genreItem = document.createElement('option');
        genreItem.textContent = genre;
        selectedGenre.appendChild(genreItem);
    });    
}

function showSongs(genre){
    let isFirstSongLoaded = false;
    const genreSongs = songs.filter((song) => {
        return genre === 'All' || genre == song.genre;
    });
    genreSongs.forEach((song)=>{
        if(!isFirstSongLoaded){
            isFirstSongLoaded = true;
            loadSongDetails(song, genreSongs, isFirstSongLoaded);
        }
        const allSongListItemDiv = createSongListItem(song);
        allSongListEl.appendChild(allSongListItemDiv);
        allSongListItemDiv.addEventListener('click', ()=>{
            loadSongDetails(song, genreSongs, false);
        });
    });
}

function createSongListItem(song){
    const allSongListItemDiv = document.createElement('div');
    allSongListItemDiv.classList.add('all-song-list-item');
    allSongListItemDiv.innerHTML = `        
        <p>${song.name} - ${song.artist}</p>
    `;
    isDarkMode ? allSongListItemDiv.style.backgroundColor = '#63696d' : allSongListItemDiv.style.backgroundColor = '#0d81bc';
    return allSongListItemDiv;
}

function createSongCard(song) {
    const songCardEl = document.createElement('div');
    songCardEl.classList.add('song-card');
    songCardEl.innerHTML = `
        <div class="song-image-holder">
            <img src="${song.img}" alt="">
        </div>
        <div class="song-name">
            <p>${song.name}</p>
        </div>
        <div class="artist-name">
            <p>${song.artist}</p>
        </div>
    `;
    isDarkMode ? songCardEl.style.backgroundColor = '#63696d' : songCardEl.style.backgroundColor = '#0d81bc';
    return songCardEl;
}

function createSongAudio(song, autoplay) {
    const songAudioEl = document.createElement('div');
    songAudioEl.innerHTML = `
        <audio class="song-audio-bar" controls ${autoplay ? '' : 'autoplay'}>
            <source src="${song.source}" type="audio/mpeg">
        </audio>
    `;
    return songAudioEl;
}

function createMusicControls(genreSongs, song){
    const currentIndex = genreSongs.findIndex(item => item.id === song.id);
    const musicControls = document.createElement('div');
    musicControls.classList.add('music-controls');
    musicControls.innerHTML = `
        <button id="prevBtn" ${currentIndex==0 ? 'disabled' : ''}> <i class="fa-solid fa-backward"></i> </button>
        <button id="nextBtn" ${currentIndex>=genreSongs.length-1 ? 'disabled' : ''}> <i class="fa-solid fa-forward"></i> </button>
    `;
    return musicControls;
}

function createPlaylistButton(song){
    const playlistButton = document.createElement('div');
    playlistButton.classList.add('playlist-button');
    playlistButton.innerHTML = `<button type="button" id="playlistBtn">Add to playlist</button>`;
    playlistButton.addEventListener('click', ()=>{
        addToPlaylist(song);
    });
    return playlistButton;
}

function addToPlaylist(song){
    if(currentPlaylist === undefined){
        alert('No Playlist selected');
    }else{
        playlist[currentPlaylist].songs.push(song);
        renderCurrentPlaylist(playlist[currentPlaylist].songs);
    }
}

function addNextAndPrevFunctionality(song, genreSongs){
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const currentIndex = genreSongs.findIndex(item => item.id === song.id);

    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1);
        loadSongDetails(genreSongs[nextIndex],genreSongs);
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1);// + genreSongs.length) % genreSongs.length;
        loadSongDetails(genreSongs[prevIndex],genreSongs);
    });
}

function loadSongDetails(song, genreSongs, isFirst=false) {
    currentPlayingIndex = song.id;
    cardEl.textContent = '';

    const songCardEl = createSongCard(song);
    cardEl.appendChild(songCardEl);

    const songAudioEl = createSongAudio(song, isFirst);
    cardEl.appendChild(songAudioEl);

    const musicControls = createMusicControls(genreSongs, song);
    cardEl.appendChild(musicControls);

    const playlistButton = createPlaylistButton(song);
    cardEl.appendChild(playlistButton);

    addNextAndPrevFunctionality(song, genreSongs);
}

const addToPlaylistBtnEl = document.getElementById('addToPlaylistBtn');
addToPlaylistBtnEl.addEventListener('click', ()=>{
    createPlaylist();
})

function createPlaylist(){
    const inputField = document.getElementById('addToPlaylistInput');
    const value = inputField.value;
    if(value == ''){
        alert('Enter Playlist name');
    }else{
       const obj = {
        name: value,
        songs: []
       };
       playlist.push(obj);
       renderAllPlaylists();
    }
}

function renderAllPlaylists(){
    const myPlaylistsEl = document.querySelector('.my-playlists');
    myPlaylistsEl.innerHTML = `<h3>My Playlist</h3>`;
    playlist.forEach((item, index) => {
        const playListItemDiv = document.createElement('div');
        playListItemDiv.classList.add('play-list-item');
        playListItemDiv.innerHTML = `        
            <p>${item.name}</p>
        `;
        isDarkMode ? playListItemDiv.style.backgroundColor = '#62696d' : playListItemDiv.style.backgroundColor = '#0d81bc';
        playListItemDiv.addEventListener('click', ()=>{
            currentPlaylist = index;
            renderCurrentPlaylist(item.songs);
        })
        myPlaylistsEl.appendChild(playListItemDiv);
    });
}

function renderCurrentPlaylist(currentPlaylistSongs){
    const currentPlaylistEl = document.querySelector('.current-playlist');
    currentPlaylistEl.innerHTML = `<h3>Current Playlist</h3>`;
    currentPlaylistSongs.forEach((song)=>{
        const songListItem = createSongListItem(song);
        songListItem.addEventListener('click', ()=>{
            loadSongDetails(song, currentPlaylistSongs);
        });
        currentPlaylistEl.appendChild(songListItem);
    });
}