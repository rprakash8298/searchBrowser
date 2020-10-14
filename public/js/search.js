
 const elementStrings = {
    loader: 'loader'
};

 const renderLoader = () => {
    const loader = `
        <div class="${elementStrings.loader}">
         <img src="/img/loading1.png" alt="">
            
        </div>
    `;
    document.querySelector('#loading').insertAdjacentHTML('afterbegin', loader);
};

 const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

document.querySelector('#searchForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    const googlRes = document.querySelector('#resSea').value;
    document.querySelector('#movieRes').innerHTML = '';
    document.querySelector('#mapres').innerHTML = '';
    document.querySelector('#queryRes').innerHTML = '';
    renderLoader();

    fetch(`https://api.serpstack.com/search?access_key=38fc02b7b0552e60f50648f8c474bbca&query=${googlRes}`)
    .then(result =>{
        return result.json();
    })
    .then(data =>{
        clearLoader();
        data.organic_results.forEach(res => {
            const markup = `
            <div class="col-12  my-2" id="design">
            <p class="mb-n1">${res.displayed_url}</p>
            <a target="_blank" href="${res.url}"><h4 id="colors" >${res.title}</h4></a>
            <p>${res.snippet}</p>
            </div>
            `;
              document.querySelector('#movieRes').insertAdjacentHTML('beforeend',markup)
        });
        
        data.local_results.forEach(res0 => {
            const markup2 = `
                          <div class="col" >
                            <h5>${res0.title}</h5>
                            <address>${res0.address}</address>
                            <h6>Coordinates: Latitude - ${res0.coordinates.latitude}</h6>
                            <h6>Ratings : ${res0.rating}</h6>
                            <h6>Reviews : ${res0.reviews}</h6>
                           </div>
            `;
              document.querySelector('#mapres').insertAdjacentHTML('beforeend',markup2)
        });
        var url = data.local_map.url.replace("watch?v=", "v/");

        data.related_searches.forEach(res1 => {
            const markup1 = ` 
                  <li class="list-group-item col-5 mb-4 text-dark rounded-pill"><a href="${res1.url}">${res1.query}</a></li>     
            `;
              document.querySelector('#queryRes').insertAdjacentHTML('beforeend',markup1)
        });

    })
    .catch(error =>{
        console.log(error);
    })
});




