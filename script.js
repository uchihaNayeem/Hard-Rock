const link = 'https://api.lyrics.ovh';
const suggest = 'https://api.lyrics.ovh/suggest'

let searchingSong = () => {
    const searchingTextArea = document.getElementById('song-search').value;
    console.log(searchingTextArea);
    fetch(`${suggest}/${searchingTextArea}`)
    .then(response=>response.json())
    .then( x => displayTitle(x.data));
}

let displayTitle = title =>{
    console.log(title);
    const songTitle = title.map(song=>song.title);
    const songArtist = title.map(songs=>songs.artist.name);

    let assignResult = document.getElementById('showing-result');

    for (let i = 0; i < 10; i++) {
        const title = songTitle[i];
        const artistTitle = songArtist[i];
        const Items = document.createElement('div');
        Items.innerHTML=
        `<div class="single-result row align-items-center my-3 p-3">                    
          <div class="col-md-9">
           <h3 class="titleColor lyrics-name" id="title">${title}</h3>
           <p class="author lead">Album by <span id="artist">${artistTitle}</span></p>
          </div>
         <div class="col-md-3 text-md-right text-center">
          <button class="btn btn-success" onclick="displayLyrics('${title}','${artistTitle}')">Get Lyrics</button>
         </div>
        </div>`;
        assignResult.appendChild(Items);
    }

}

let displayLyrics = (titleOfSong,titleOfArtist) =>{
    fetch(`${link}/v1/${titleOfArtist}/${titleOfSong}`)
        .then(response=>response.json())
        .then(data=>{const addLyrics = document.getElementById('lyrics');
        if(data.lyrics != undefined){ 
        addLyrics.innerHTML=data.lyrics;}
        else{addLyrics.innerHTML='Lyrics Not Available!!!'}

});
    document.getElementById('song-title').innerText = titleOfSong;

}



