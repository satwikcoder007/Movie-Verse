let movie_name=document.querySelector(".movie-title");
let m_genre_1=document.querySelector(".genre1")
let m_genre_2=document.querySelector(".genre2")
let m_genre_3=document.querySelector(".genre3")
let movie_overview=document.querySelector(".movie-description")
let movie_year=document.querySelector(".movie-year");
let movie_duraion=document.querySelector(".movie-duration")
let movie_language=document.querySelector(".movie-language")
let lang1=document.querySelector(".language1")
let lang2=document.querySelector(".language2")
let lang3=document.querySelector(".language3")
let movie_title=document.querySelector(".movie-title")
let image_container=document.querySelector(".image-container")

let genre="hello";
let card1_photo=document.querySelector("#card1")
let card1_name=document.querySelector(".card1-title")

let card1_id=document.querySelector(".movie_id1")
let card2_photo=document.querySelector("#card2")
let card2_name=document.querySelector(".card2-title")
let card2_id=document.querySelector(".movie_id2")
let card3_photo=document.querySelector("#card3")
let card3_name=document.querySelector(".card3-title")
let card3_id=document.querySelector(".movie_id3")
let card4_photo=document.querySelector("#card4")
let card4_name=document.querySelector(".card4-title")
let card4_id=document.querySelector(".movie_id4")

let img_cast1=document.querySelector(".img-card1")
let name_cast1=document.querySelector(".cast-card1-name")
let desc_cast1=document.querySelector(".cast-card1-desc")

let img_cast2=document.querySelector(".img-card2")
let name_cast2=document.querySelector(".cast-card2-name")
let desc_cast2=document.querySelector(".cast-card2-desc")

let img_cast3=document.querySelector(".img-card3")
let name_cast3=document.querySelector(".cast-card3-name")
let desc_cast3=document.querySelector(".cast-card3-desc")

let img_cast4=document.querySelector(".img-card4")
let name_cast4=document.querySelector(".cast-card4-name")
let desc_cast4=document.querySelector(".cast-card4-desc")

let img_cast5=document.querySelector(".img-card5")
let name_cast5=document.querySelector(".cast-card5-name")
let desc_cast5=document.querySelector(".cast-card5-desc")

let img_cast6=document.querySelector(".img-card6")
let name_cast6=document.querySelector(".cast-card6-name")
let desc_cast6=document.querySelector(".cast-card6-desc")

let img_cast7=document.querySelector(".img-card7")
let name_cast7=document.querySelector(".cast-card7-name")
let desc_cast7=document.querySelector(".cast-card7-desc")

let img_cast8=document.querySelector(".img-card8")
let name_cast8=document.querySelector(".cast-card8-name")
let desc_cast8=document.querySelector(".cast-card8-desc")

let service1=document.querySelector(".service-provider1")



let id=localStorage.movieId;
api_id(id)






function renderbyID(response){
  
    movie_name.innerText=response.original_title
    

      if(response.genres.length>=1)
        m_genre_1.textContent=response.genres[0].name
      if(response.genres.length>=2)
        m_genre_2.textContent="| "+response.genres[1].name
      if(response.genres.length>=3)
        m_genre_3.textContent="| "+response.genres[2].name
    
    lang1.innerText=""
    lang2.innerText=""
    lang3.innerText=""
    movie_overview.innerText=response.overview
    movie_year.innerText=response.release_date.slice(0,4)
    movie_duraion.innerText=response.runtime+" minutes"
    movie_language.innerText=response.spoken_languages.length+" "+"languages"
    if(response.spoken_languages.length>=1)
        
        lang1.innerText=response.spoken_languages[0].english_name
    if(response.spoken_languages.length>=2)

        lang2.innerText=response.spoken_languages[1].english_name
    if(response.spoken_languages.length>=3)
        lang3.innerText=response.spoken_languages[2].english_name


    // var img=document.createElement('img')

    
   
    let fullpath="https://image.tmdb.org/t/p/w500"+response.poster_path
    document.getElementById("movie_poster").src=fullpath
    // img.style.display="block"
    // img.style.width="70%"

    // image_container.appendChild(img)

    

  }

  function renderServiceProvider(response){
    let full_path1="https://image.tmdb.org/t/p/w500"+response.buy[0].logo_path
    document.getElementById("sp1").src=full_path1

    let full_path2="https://image.tmdb.org/t/p/w500"+response.buy[1].logo_path
    document.getElementById("sp2").src=full_path2

    let full_path3="https://image.tmdb.org/t/p/w500"+response.flatrate[0].logo_path
    document.getElementById("sp3").src=full_path3
  }


   function renderRecommenation(response){
    let img_path1=response.results[0].poster_path
    let full_path1="https://image.tmdb.org/t/p/w500"+img_path1
    document.getElementById("card1_photo").src=full_path1
    card1_id.innerText=response.results[0].id
    card1_name.innerText=response.results[0].original_title


    let img_path2=response.results[1].poster_path
    let full_path2="https://image.tmdb.org/t/p/w500"+img_path2
    document.getElementById("card2_photo").src=full_path2
    card2_id.innerText=response.results[1].id
    card2_name.innerText=response.results[1].original_title

    let img_path3=response.results[2].poster_path
    let full_path3="https://image.tmdb.org/t/p/w500"+img_path3
    document.getElementById("card3_photo").src=full_path3
    card3_id.innerText=response.results[2].id
    card3_name.innerText=response.results[2].original_title

    let img_path4=response.results[3].poster_path
    let full_path4="https://image.tmdb.org/t/p/w500"+img_path4
    document.getElementById("card4_photo").src=full_path4
    card4_id.innerText=response.results[3].id
    card4_name.innerText=response.results[3].original_title

    
  }

   function renderCast(response){
    
    let path="https://image.tmdb.org/t/p/w500"+response.cast[0].profile_path
    img_cast1.href="https://en.wikipedia.org/wiki/"+response.cast[0].original_name


    desc_cast1.innerText="Played as "+response.cast[0].character
    document.getElementById("img_card1").src=path
    name_cast1.innerText=response.cast[0].name
    
    let path2="https://image.tmdb.org/t/p/w500"+response.cast[1].profile_path
    img_cast2.href="https://en.wikipedia.org/wiki/"+response.cast[1].original_name
    document.getElementById("img_card2").src=path2
    name_cast2.innerText=response.cast[1].name
    desc_cast2.innerText="Played as "+response.cast[1].character

    let path3="https://image.tmdb.org/t/p/w500"+response.cast[2].profile_path
    img_cast3.href="https://en.wikipedia.org/wiki/"+response.cast[2].original_name
    document.getElementById("img_card3").src=path3
    name_cast3.innerText=response.cast[2].name
    desc_cast3.innerText="Played as "+response.cast[2].character

    let path4="https://image.tmdb.org/t/p/w500"+response.cast[3].profile_path
    img_cast4.href="https://en.wikipedia.org/wiki/"+response.cast[3].original_name
    document.getElementById("img_card4").src=path4
    name_cast4.innerText=response.cast[3].name
    desc_cast4.innerText="Played as "+response.cast[3].character

    let path5="https://image.tmdb.org/t/p/w500"+response.cast[4].profile_path
    img_cast5.href="https://en.wikipedia.org/wiki/"+response.cast[4].original_name
    document.getElementById("img_card5").src=path5
    name_cast5.innerText=response.cast[4].name
    desc_cast5.innerText="Played as "+response.cast[4].character

    let path6="https://image.tmdb.org/t/p/w500"+response.cast[5].profile_path
    img_cast6.href="https://en.wikipedia.org/wiki/"+response.cast[5].original_name
    document.getElementById("img_card6").src=path6
    name_cast6.innerText=response.cast[5].name
    desc_cast6.innerText="Played as "+response.cast[5].character

    let path7="https://image.tmdb.org/t/p/w500"+response.cast[6].profile_path
    img_cast7.href="https://en.wikipedia.org/wiki/"+response.cast[6].original_name
    document.getElementById("img_card7").src=""
    document.getElementById("img_card7").src=path7
    name_cast7.innerText=response.cast[6].name
    desc_cast7.innerText="Played as "+response.cast[6].character

    let path8="https://image.tmdb.org/t/p/w500"+response.cast[7].profile_path
    img_cast8.href="https://en.wikipedia.org/wiki/"+response.cast[7].original_name
    document.getElementById("img_card8").src=path8
    name_cast8.innerText=response.cast[7].name
    desc_cast8.innerText="Played as "+response.cast[7].character

   


  }
  
  

  

  

  
 



async function api_id(id){
    options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
        }
      };

      
      fetch('https://api.themoviedb.org/3/movie/'+id+'?language=en-US', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          console.log(id)
            renderbyID(response)
            api_service_provider(id)
            api_recommendation(id)
            api_cast(id)
          
            
        })
        .catch(err => console.error(err));
  }

  async function api_service_provider(id){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/'+id+'/watch/providers', options)
      .then(response => response.json())
      .then(response => {
        renderServiceProvider(response.results.IN)})
      .catch(err => console.error(err));
  }

    async function api_recommendation(id){
      console.log("Hello")
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/'+id+'/recommendations?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
          renderRecommenation(response)
        })
        .catch(err => console.error(err));
    }


    async function api_cast(id){
      let options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?language=en-US', options)
        .then(response => response.json())
        .then(response =>{
          renderCast(response)
          
        })
        .catch(err => console.error(err));

    }
   
    card1_photo.addEventListener('click',()=>{
      document.documentElement.scrollTop = 0;
      api_id(card1_id.innerText)
    })

    card2_photo.addEventListener('click',()=>{
      document.documentElement.scrollTop = 0;
      api_id(card2_id.innerText)
    })

    card3_photo.addEventListener('click',()=>{
      document.documentElement.scrollTop = 0;
      api_id(card3_id.innerText)
    })

    card4_photo.addEventListener('click',()=>{
      document.documentElement.scrollTop = 0;
      api_id(card4_id.innerText)
    })


    


   