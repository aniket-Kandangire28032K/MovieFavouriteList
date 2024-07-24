let moviesItems=[];
let favouriteItems=[];
getMovies = () =>{
    return fetch("http://localhost:3000/movies")
    .then((result)=>
    {
        if(result.status==200)
        {
            return Promise.resolve(result.json());
        }
        else{
            return Promise.reject("Error in Fatch");
        }
    }).then(response=>
            {
                moviesItems=response;
                createMoviesList();
    }
    ).catch(error=>
        {
        console.log("catched some error"+error);
    })
}

createMoviesList=()=>{
    let moivesList="";
       
    moviesItems.forEach(element => {
        moivesList+=
        `
        <div class="card" style="width: 18rem;margin:5%" id="poster">
        <img class="card-img-top" src="${element.pathurl}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">Director: ${element.director}</p>
        <p class="card-text">Rating:${element.rating}</p>
        <p class="card-text">${element.description}</p>
        <button class="btn btn-primary" onClick="addFavourite(${element.id})">Add to Fav</button>
        </div>
        </div>
        `       
    });
    document.getElementById("moviesList").innerHTML=moivesList;
}
getFavMovies = () =>{
    return fetch("http://localhost:3000/favourites")
    .then((result)=>
    {
        if(result.status==200)
        {
            return Promise.resolve(result.json());
        }
        else{
            return Promise.reject("Error in Fatch");
        }
    }).then(response=>
        {       
            favouriteItems=response
            createFavList();     
    }
    ).catch(error=>
        {
        console.log("catched some error" + error);
    })
}

createFavList=()=>{
    let favList="";
       favouriteItems.forEach(element => {
        favList+=
        `
        <div class="card" style="width: 18rem;margin:5%" >
        <img class="card-img-top" src="${element.pathurl}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">Director: ${element.director}</p>
          <p class="card-text">Rating:${element.rating}</p>
          <p class="card-text">${element.description}</p>
          <button class="btn btn-danger" onClick="delFav(${element.id})">Remove</button>
          </div>
          </div>
          `            
    });
    document.getElementById("FavoritesList").innerHTML=favList;
}

addFavourite=(id)=>{
    if(!isthere(id))   
        {
           
            let movieObject = getMovie(id)
            {   
                console.log(movieObject);
                favouriteItems.push(movieObject);
                return fetch("http://localhost:3000/favourites",
                {
                    method:'POST',
                    body : JSON.stringify(movieObject),
                    headers:{
                        'Content-Type':'application/json',
                         'Accept' :'application/json'
                }
            }).then((result)=>
            {
                if(result.status == 200 || result.status==201)
                {
                     return Promise.resolve(favourites);
    
                }
                else
                 { 
                    return Promise.reject("movie is already there in fav section")
                 }
                
                }).then((favMovieResult)=> 
                {
                    createFavouritesList();
                    return favMovieResult;
                }). catch(error=>
                {
                    throw new Error(error);
                })
            }
        }
            else 
            {
        alert("movie is already there in fav section");
            }
    
            
    
}

const isthere=(id)=>{
   for(let fav in favouriteItems){
    if(id==favouriteItems[fav].id){
        console.log("true");
        return true;
    }
     console.log("false");
   }
   return false;
}

const getMovie=(id)=>{
    for(let movie in moviesItems)
        { 
          if(id==moviesItems[movie].id)
          {
             alert(moviesItems[movie].title)
              return moviesItems[movie];
        }}
}

const delFav = (id)=>
    {
        return fetch("http://localhost:3000/favourites/"+id,
        
            {
                method:'delete'
            })
        .then((result)=>
       {
           if(result.status==200)
           {
               return Promise.resolve(result.json());
           }
           else 
           {
               return Promise.reject("error");
           }
       }).then(response=>
       {
         
           favouriteItems=response;
           createFavList();
       }
       ).catch(error=>
       {
     alert(error);
       })
       
    }


