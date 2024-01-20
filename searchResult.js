function setPlaceholder()
{
    let target=document.getElementById("search-result");
    target.placeholder=localStorage.search_Result;
    target=document.getElementById("searchTitle");
    target.innerText=localStorage.search_Result;
}



  function fetchByName(){
    const options = {
        method: 'GET',
        headers: {
          
        }
      };
    fetch('https://api.themoviedb.org/3/search/movie?query='+localStorage.search_Result+'&api_key=7395c390d30fc6598141be93e47ebd53', options)
        .then(response => response.json())
        .then(response => renderSearchResults(response.results))
        .catch(err => console.error(err));
    } 
function renderSearchResults(results)
{
    setPlaceholder();
    target=document.getElementById("hero");
    for(let i=0;i<results.length;i++)
    {
        if(results[i].vote_average>0)
        {
            let newElement=document.createElement("div");
            newElement.innerHTML='<div><span class="hidden" id="id-'+i+'">'+results[i].id+'</span><div class="flex items-center justify-start w-[1272px] h-[140px] p-[10px]"><div class="sicontainer h-[120px] w-[120px]"><img src="http://image.tmdb.org/t/p/w500/'+results[i].poster_path+'"class="search-image" id="image-'+i+'"></div><div class="relative  w-[1142px] ml-[20px] -mt-[20px]"><div class="text-white text-[15px] font-medium ">'+results[i].title+'</div><div class="mt-[9px] text-white text-[11px] flex"><span class="box-border w-[60px] h-[17px] bg-red-600 ">IMDb '+results[i].vote_average+'</span> <span class="ml-[10px] text-white">'+results[i].release_date+'</span></div><div class=" text-white text-[15px] mt-[5px]">'+results[i].overview.slice(0,500)+' ...'+'</div></div></div><div class="box-border w-[90%] h-[2px] bg-slate-500 mt-[20px]"></div></div>';
            newElement.setAttribute("class","mb-[30px]");
            target.appendChild(newElement);
            let yoyo=document.getElementById("image-"+i);
            yoyo.addEventListener("click",()=>{
              let target=document.getElementById("id-"+i);
              localStorage.movieId=target.textContent;
              location.href="movieDetails.html"
            })
        }
    }
}
fetchByName();
function search()
{
  let target=document.getElementById("search-result");
  localStorage.search_Result=target.value;
  target=document.getElementById("hero");
  target.innerHTML=" ";
  fetchByName();

}