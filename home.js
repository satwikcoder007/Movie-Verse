//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider('next');
}

prevDom.onclick = function () {
  showSlider('prev');
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext)
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
  let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

  if (type === 'next') {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add('next');
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add('prev');
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext)
}
// For Comedy section
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);



function fetchtrendingMovies() {
  const options1 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };
  let i = 1;
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options1)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let itemactive = document.getElementById("itemactive");
      let thumbnailactive = document.getElementById("thumbnailactive");
      let Len = movies.results.length;
      showActive();
      function showActive() {
        for (let j = 0; j < Len; j++) {
          let movie = movies.results[j];
          itemactive.innerHTML += `  <div class="item">
                       <img src="http://image.tmdb.org/t/p/w500/${movie.backdrop_path}">
                       <div class="content">
                           <div class="author">Trending Movies</div>
                           <div class="title">${(movie.original_title).length > 25 ? (movie.original_title).slice(0, 25) + '...' : (movie.original_title)}</div>
                           <div class="date"> <span class="dat">${new Date(movie.release_date).toUTCString()}.</span> <span class="time"></span> <span class="dat">${(movie.original_language).toUpperCase() + 'GLISH'}</span></div>
                           <div class="des">
                               <!-- lorem 50 -->
                              ${(movie.overview).slice(0, 118)}...
                           </div>
                           <div class="genre"></div>
                       </div>
                   </div>
                        `

          let desc = document.getElementsByClassName("description");
          desc.innerHTML = `${movie.overview}`.slice(0, 10) + "...";
          thumbnailactive.innerHTML += ` <div class="item">
                        <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"">
                        <div class="content">
                            <div class="toper">
                            ${movie.original_title}
                            </div>
                        </div>
                    </div>`
        }
      }
    })
}
fetchtrendingMovies();
// For Top Rated Movies
function fetchTopRatedMovies() {
  const options3 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', options3)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then(response => { mufunction(response) });
  // .catch(err => console.error(err));
}

function mufunction(movies) {
  let toplist = document.getElementById("topRatdList");
  console.log(movies);
  let Len = movies.results.length;
  render();
  function render() {

    for (let j = 0; j < 20; j++) {
      let movie = movies.results[j];
      toplist.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
               <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
               <span id="id-${j}" class="hidden">${movie.id}</span>
               <div class="cards__overlay">
               <div class="card__title" id="text-name2">${movie.original_title}</div>
               <div class="card__runtime" >
                 <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
                 <span class="card__rating" id="rating-2">${movie.vote_average}</span>
               </div>
                 <div class="card__description" id="description${j}">${movie.overview.slice(0, 118)}</div>
               </div>
             </div>`;
    }
    for (let i = 0; i < 20; i++) {
      document.getElementById("description" + i).addEventListener('click', () => {
        const hiddenid = document.getElementById("id-" + i);
        console.log(hiddenid);
        localStorage.movieId = hiddenid.textContent;
        location.href = "movieDetails.html";
      })
    }
  }
}


fetchTopRatedMovies();

//    const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
//     }
//   };

//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=hi', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// const language=["en","hi","bn"];
// function disable(x){
//     x.disabled=true;
//  }
function fetchAnimatedMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };
  let i = 1;
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let kids = document.getElementById("kids");
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          kids.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
           <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
           <span id="iden-${j}" class="hidden">${movie.id}</span>
           <div class="cards__overlay">
           <div class="card__title" id="text-name2">${movie.original_title}</div>
           <div class="card__runtime" >
             <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
             <span class="card__rating" id="rating-2">${movie.vote_average}</span>
           </div>
             <div class="card__description" id="d${j}">${movie.overview.slice(0, 118)}</div>
           </div>
         </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("d" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("iden-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchAnimatedMovies();



function fetchComedyMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((response) => { myfuction(response) });
  //  .catch(err => console.error(err));
}
function myfuction(movies) {
  let comedyimglist = document.getElementById("image-list");
  let Len = movies.results.length;
  render();
  function render() {
    for (let j = 0; j < 20; j++) {
      let movie = movies.results[j]
      comedyimglist.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" class="image-item" alt="img" id="image-${j}" />
      <span id="id-${j}" class="hidden">${movie.id}</span>
      <div class="cards__overlay">
      <div class="card__title" id="text-name2">${movie.original_title}</div>
      <div class="card__runtime" >
        <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
        <span class="card__rating" id="rating-2">${movie.vote_average}</span>
      </div>
        <div class="card__description" id="description${j}">${movie.overview.slice(0, 118)}</div>
      </div>
    </div>`
      console.log(comedyimglist);
    }
    for (let i = 0; i < 20; i++) {
      document.getElementById("description" + i).addEventListener('click', () => {
        const hiddenid = document.getElementById("id-" + i);
        console.log(hiddenid);
        localStorage.movieId = hiddenid.textContent;
        location.href = "movieDetails.html";
      })
    }

  }
}

fetchComedyMovies();


//     const english=document.getElementById("ram");
// const hindi=document.getElementById("ram1");
// const bengali=document.getElementById("ram2");
//     const imglist=document.getElementById("ancient");
// english.addEventListener("click", ()=>{
//     imglist.innerHTML="";
//      return  fetchAncientMovies(language[0]);
// })
// hindi.addEventListener("click",()=>{
//       imglist.innerHTML="";
//     return  fetchAncientMovies(language[1]);
// })
// bengali.addEventListener("click",()=>{
//     imglist.innerHTML="";
//     return  fetchAncientMovies(language[2]);
// })
function fetchAncientMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.lte=2018-01-01&sort_by=popularity.desc`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let ancient = document.getElementById("ancient");
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          ancient.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
               <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
               <span id="idea-${j}" class="hidden">${movie.id}</span>
               <div class="cards__overlay">
               <div class="card__title" id="text-name2">${movie.original_title}</div>
               <div class="card__runtime" >
                 <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
                 <span class="card__rating" id="rating-2">${movie.vote_average}</span>
               </div>
                 <div class="card__description" id="de${j}">${movie.overview.slice(0, 118)}</div>
               </div>
             </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("de" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("idea-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchAncientMovies();


function fetchHorrorMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let horror = document.getElementById("horror");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          horror.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="i-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="des${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("des" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("i-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchHorrorMovies();

function fetchThrillerMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let thriller = document.getElementById("thriller");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          thriller.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="ida-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="desc${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("desc" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("ida-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchThrillerMovies();

function fetchRomanticMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10749`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let romantic = document.getElementById("Romantic");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          romantic.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="ide-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="descr${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descr" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("ide-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchRomanticMovies();


function fetchfamilydMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751&18`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let family = document.getElementById("family");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          family.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="ident-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="descri${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descri" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("ident-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchfamilydMovies();


function fetchScanFanMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&14`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let science = document.getElementById("science");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          science.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="identi-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="descrip${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descrip" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("identi-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchScanFanMovies();


function fetchCrimeMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let crimelist = document.getElementById("crime");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          crimelist.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="identit-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="descript${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descript" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("identit-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchCrimeMovies();


function fetchAcanAdventureMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&12`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let action = document.getElementById("action");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          action.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
             <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
             <span id="identity-${j}" class="hidden">${movie.id}</span>
             <div class="cards__overlay">
             <div class="card__title" id="text-name2">${movie.original_title}</div>
             <div class="card__runtime" >
               <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
               <span class="card__rating" id="rating-2">${movie.vote_average}</span>
             </div>
               <div class="card__description" id="descripti${j}">${movie.overview.slice(0, 118)}</div>
             </div>
           </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descripti" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("identity-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}

fetchAcanAdventureMovies();

function fetchUpcomingMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  };
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-01-13&sort_by=popularity.desc`, options)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let upcoming = document.getElementById("upcomingmovies");
      console.log(movies);
      let Len = movies.results.length;
      render();
      function render() {
        for (let j = 0; j < 20; j++) {
          let movie = movies.results[j];
          upcoming.innerHTML += `<div class="cards h-[300px] w-[200px]"id="card_demo">
               <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}"  class="image-item" alt="img" id="image-${j}" />
               <span id="identif-${j}" class="hidden">${movie.id}</span>
               <div class="cards__overlay">
               <div class="card__title" id="text-name2">${movie.original_title}</div>
               <div class="card__runtime" >
                 <span id="date-2"> ${movie ? new Date(movie.release_date).toUTCString() : ""}</span>
                 <span class="card__rating" id="rating-2">${movie.vote_average}</span>
               </div>
                 <div class="card__description" id="descriptio${j}">${movie.overview.slice(0, 118)}</div>
               </div>
             </div>`;
        }
        for (let i = 0; i < 20; i++) {
          document.getElementById("descriptio" + i).addEventListener('click', () => {
            const hiddenid = document.getElementById("identif-" + i);
            console.log(hiddenid);
            localStorage.movieId = hiddenid.textContent;
            location.href = "movieDetails.html";
          })
        }

      }
    })
    .catch(err => console.error(err));
}
fetchUpcomingMovies();


// if(response.genres.length>=1)
//         m_genre_1.textContent=response.genres[0].name
//       if(response.genres.length>=2)
//         m_genre_2.textContent="| "+response.genres[1].name
//       if(response.genres.length>=3)
//         m_genre_3.textContent="| "+response.genres[2].name

//       const options = {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
//             }
//           };


//   fetch('https://api.themoviedb.org/3/movie/'+id+'?language=en-US', options)
//     .then(response => response.json())
//     .then(response => {

function search() {
  let target = document.getElementById("search-results");
  localStorage.search_Result = target.value;
  location.href = "index.html";
}
const searching = document.getElementById("search-results");
searching.addEventListener('click', search);