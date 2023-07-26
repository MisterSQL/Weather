 'use strict';


 /**
  * @todo: Bad name, even in English (information city -> city information)
  * @todo: Any data is a information, why do you need extra information for variable?
  * @todo: (done) Which city? Do you mean current city which displayed for user? So will be better just currentCity
  * @todo: (done) why are you using let instead of const ?
  * @todo: this object represent information not only about city, also about forecast,
  *        so I think will be better use two properties in this object, one about city, another about forecase
  */

 let currentCity = {
     // @todo: why not just "name" why do you need prefix city?
    nameCity:"",
    temp: 0,
     // @todo: who are you using this code style? Why not just maxTemp, don't different code styles in one project it doesn't make sense
    max_temp: 0,
    min_temp: 0,
     // @todo: why do you put this data in another field(properties)
    properties:{
        wind_speed: 0,
        cloud_pct: 0,
        // @todo: (done) add one space between property and value, soemthing like:  humidity: 0
        humidity: 0,
    },
}

// @todo: (done )remove code which you are not using


 // @todo: (done) send where? Probably better name will be something like: getForecastForCity
 function getForecastForCity(){
     // @todo: every time you take time for searching this element in your DOM, just move somewhere else and use it
     const city = document.getElementById("text-input");
     currentCity.nameCity = city.value;
     sendRequst(currentCity.nameCity)
 }

function sendRequst(){
    fetch(`https://api.api-ninjas.com/v1/weather?city=${currentCity.nameCity}`,{
        // @todo: move changable data such as API key up in the level, and use it later
        headers: { 'X-Api-Key': '5guKQf0VRh/LtOlYjym3YQ==NYu3XsBAexr1buI9'},
    })
        .then(value =>value.json())
        // @todo: why do you need two then? Why you can't just use one
        .then(data => {
            saveWeather(data)
        })
}


// @todo: this function does two things: saving and rendering
function saveWeather(data){
    currentCity = {
        nameCity: currentCity.nameCity,
        temp:data.temp,
        max_temp: data.max_temp,
        min_temp: data.min_temp,
        properties: {
            wind_speed: data.wind_speed,
            cloud_pct: data.cloud_pct,
            humidity: data.humidity,
        },
    };
    addElementsHtml()
}

// @todo: bad name for function
function addElementsHtml(){
     // @todo: save this element somewhere and use it every time
    const container = document.getElementById("container");
    container.innerHTML = renderWeather();
}

// @todo: (done) very abstract name for function
function renderWeather(){
    return `
        <div id="content" >
            <button id="aboutCity" data-bs-toggle="offcanvas" data-bs-target="#left-menu">${currentCity.nameCity}</button>
            <div class="mainPictureWeather">
                  ${getPictureWeather()}
            </div>
            <div>
                <p id="currentTemp">${currentCity.temp}&deg</p>
            </div>
            <span class="text">Precipitations</span>
            <div class="box">
                <div>
                    <span class="text" style="margin-right: .5em">Max.: ${currentCity.max_temp}&deg</span>
                </div>
                 <div>
                   <span class="text">Min.: ${currentCity.min_temp}&deg</span>
                </div>
            </div>          
           <div class="box" style="margin-top: 1em">
                 <div class="box" style="margin-right: .9em">
                    <img style="width: 22px; height: 22px;" src="icons/cloud.svg" alt="">
                    <span class="text" >${currentCity.properties.cloud_pct} </span>
                </div>
                 <div class="box" style="margin-right: .9em">
                    <img src="icons/humidity.svg" alt="">
                    <span class="text" >${currentCity.properties.humidity} </span>
                </div> 
                 <div class="box" style="margin-right: .9em">
                    <img src="icons/wind.svg" alt="">
                    <span class="text" >${currentCity.properties.wind_speed} </span>
                </div>                 
           </div>
        </div>
     `
}

// @todo: getWeatherPicture, or getWeatherLogo
function getPictureWeather(){
    if(currentCity.properties.cloud_pct > 40){
        return `<img class="img-fluid"  src="Picture/Sun_cloud.png">`;
    }
    else{
        return `<img class="img-fluid" id="sunnyWeather"  src="Picture/clearSun.png">`;
    }
}


function documentLoaded(){
    currentCity.nameCity = "Kiev";
    sendRequst();
}

// @todo: many empty lines

document.addEventListener('DOMContentLoaded', documentLoaded);




 // @todo: many empty lines












