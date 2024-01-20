const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk1YzM5MGQzMGZjNjU5ODE0MWJlOTNlNDdlYmQ1MyIsInN1YiI6IjY1OWNkN2JmYjZjZmYxMDE0Y2Y3MzUwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jGD_gexoIw3lYoAgrJTtIuCKrrNSUa4phxB1IQYL-wY'
    }
  }; 
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response =>get_Name(response.results))
    .catch(err => console.error(err));


function get_Name(results)
{
  for(let i=0;i<18;i++)
  {
    let target=document.getElementById("text-name"+i);
    target.textContent=results[i].title;

    target=document.getElementById("id-"+i)
    target.textContent=results[i].id;
  
    target=document.getElementById("image-"+i);
    target.src="http://image.tmdb.org/t/p/w500/"+results[i].poster_path;

    target=document.getElementById("date-"+i);
    target.textContent=results[i].release_date;

    target=document.getElementById("rating-"+i);
    target.textContent=results[i].vote_average;
    
    target=document.getElementById("description-"+i);

    let string=results[i].overview;
    let trimmedString = string.substring(0,118);
    target.textContent=trimmedString+" ..."
    target.addEventListener("click",()=>{
      let  target=document.getElementById("id-"+i);
      localStorage.movieId=target.textContent;
    });
  }
} 

var button_press=0; 
function left_slide()
{
  if(button_press>0)
  {
    button_press--;
    for(let i=0;i<3;i++)
    {
      let target=document.getElementById("slide-"+i);
      if(i==button_press)
      {
        target.setAttribute("class","flex gap-[22px]");
      }
      else{
        target.setAttribute("class","hidden");
      }
    }
  }
}
function right_slide()
{
  if(button_press<2)
  {
    button_press++;
    for(let i=0;i<3;i++)
    {
      let target=document.getElementById("slide-"+i);
      if(i==button_press)
      {
        target.setAttribute("class","flex gap-[22px]");
      }
      else{
        target.setAttribute("class","hidden");
      }
    }
  }
}
function search()
{
  let target=document.getElementById("search-result");
  localStorage.search_Result=target.value;
  location.href = "sp.html";
}

