
require('../../app.js') 
console.log(process.env.API)


const urlApi = "https://ws.audioscrobbler.com"
const API = process.env.API



function visibleResult () {
 
 // Seleciono na DOM usuário e resultados que serão usados dentro da função
 let userSearch = document.querySelector("#user")
 let viewResult = document.querySelector(".searchResult")
 
 // Aqui eu vou passar a url Api da Lastfm. Puxar estas informações em um arquivo .env 
 const url = `${urlApi}/2.0/?method=user.getinfo&user=${userSearch.value}&api_key=${API}&format=json`
 const urlLovedTracks = `${urlApi}/2.0/?method=user.getrecenttracks&user=${userSearch.value}&api_key=${API}&format=json`
 const urlTopAlbums = `${urlApi}/2.0/?method=user.gettopalbums&user=${userSearch.value}&api_key=${API}&format=json`

 // se Usuário estiver preenchido sigo.
 if (userSearch.value != "") {
   viewResult.removeAttribute("hidden")  

   function getUser() {
     axios.get(url) //busco a url alterando apenas o nome do usuário
     .then(response => { 
       const data = response.data.user // linha para não ter que ficar repetindo response.data      
   
       let textPhoto = JSON.stringify(data.image[3])
       let urlPhoto = textPhoto.substring(textPhoto.indexOf("https://")+0)
       photoProfile.innerHTML = `<img src=${urlPhoto}>`
       let name = JSON.stringify(data.realname)
       if (name !== "") {
         realName.innerHTML = `${JSON.stringify(data.realname)}`   
       }
   
       urlLink.innerHTML = `<a href=${JSON.stringify(data.url)} class="btn btn-success">Perfil no LastFM</a>` 
       country.textContent = `${JSON.stringify(data.country)}` 
     })
     
     .catch(error => console.error(error))
   } 

   function getLovedTracks() {
     axios.get(urlLovedTracks)
     .then(response => {
       const data = response.data.recenttracks

       // Com JSON.stringify eu transformo o objeto em texto.
       // Com substring eu vou extrair parte deste texto.
       // Como o texto muda a cada nova música eu uso o indexOf para localizar quando começa e quando termina o texto que quero buscar
       // crio um loop com for pra não ter que ficar repetindo tudo
       
       // função para achar o artista
       function artistTrack(track) {
         let textArtist = JSON.stringify(data.track[track].artist)
         let artistName = textArtist.substring(textArtist.indexOf("text")+7, textArtist.indexOf('"}')+0)
         return artistName
       }
       
       // função para achar a música
       function musicTrack(track) {
         let musicName = data.track[track].name
         return musicName
       }
       
       // loop de artista e música
       let track = ""
       for (let i = 0; i < 10; i++) {
         track += `<li> ${musicTrack(i)} de ${artistTrack(i)} </li>`
       }

       // inserir informações acima no HTML
       loveTracks.innerHTML = `<p class=h4>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
           <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
           <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
           <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
           <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
         </svg>
         
       Últimas 10 músicas tocadas:</p>                                 <ol>${track}</ol> `
                               
   })
     .catch(error => console.error(error))
   }

   function getTopAlbums(){
     axios.get(urlTopAlbums)
     .then(response => {
       const data = response.data.topalbums

       // função para achar o artista do álbum
       
       // função para achar o artista
       function artistTrack(track) {
         let artistName = JSON.stringify(data.album[track].artist.name)
         return artistName
       }
       
       // função para achar a música
       function albumTrack(track) {
         let albumName = data.album[track].name
         return albumName
       }
       
         // loop de artista e música
         let track = ""
         for (let i = 0; i <= 4; i++) {
           track += `<li> ${albumTrack(i)} de ${artistTrack(i)} </li>`
         }

       loveAlbums.innerHTML = `<p class=h4>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
           <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
           <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
           <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
           <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
           </svg>
       
       5 Albuns mais escutados:</p>  
       <ol> ${track} </ol>`
       
       let textAlbum = JSON.stringify(data.album[0].image[2])
       let urlAlbum = textAlbum.substring(textAlbum.indexOf("https://")+0)
      
       bestAlbum.innerHTML = `<img src=${urlAlbum}> <p>Álbum mais ouvido</p>`        
       
     })
     .catch(error => console.error(error))
   }

   getUser()
   getLovedTracks()
   getTopAlbums()

 }
}




