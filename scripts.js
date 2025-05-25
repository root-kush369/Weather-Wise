
// note i added comment on top to track values !!!

const usertab=document.querySelector("[data-userWeather]")
const searchtab=document.querySelector("[data-searchWeather]")


const mainContainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grantlocationContainer")

const searchForm=document.querySelector("[data-searchForm]")

const loadingScreen=document.querySelector(".loading-container");

const userInfoContainer=document.querySelector(".user-info-container");


let currentTab=usertab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");







searchForm.classList.remove("active");
searchForm.classList.add("inactive");

loadingScreen.classList.remove("active");
loadingScreen.classList.add("inactive");



grantAccessContainer.classList.remove("active");
grantAccessContainer.classList.add("inactive");

userInfoContainer.classList.remove("active");
userInfoContainer.classList.add("inactive");

  if(sessionStorage.getItem("User-Coordinates"))
    {
        
                grantAccessContainer.classList.remove("active");
                grantAccessContainer.classList.add("inactive");
        
                loadingScreen.classList.remove("inactive");
                loadingScreen.classList.add("active");

                console.log("aaaaaaaaaaaaaaaaaaa");
        getfromSessionStorage();
    }
    else
    {
        console.log("bbbbbbbbbbbbbb");
        grantAccessContainer.classList.remove("inactive");
        grantAccessContainer.classList.add("active");
    }


usertab.addEventListener("click", function(e){
    switchtab(usertab);
});

searchtab.addEventListener("click", ()=>
    {
    switchtab(searchtab)    ;
    }
)


let retrievedformContainer=document.querySelector(".form-container");


function switchtab(formal_paramter)
{
    if(! (currentTab === formal_paramter))
    {
        console.log("hiii");
        currentTab.classList.remove("current-tab");
        currentTab=formal_paramter;
        currentTab.classList.add("current-tab");
        


        if (!( searchForm.classList.contains("inactive") )  ) 
        {
            console.log("ok1");

            searchForm.classList.remove("active");
            searchForm.classList.add("inactive");
            

            
            

            getfromSessionStorage();
         

        }
        
             
            else
            {
                console.log("ok2");
                
                userInfoContainer.classList.remove("active");
                userInfoContainer.classList.add("inactive");
                


                grantAccessContainer.classList.remove("active");
                grantAccessContainer.classList.add("inactive");
                

                loadingScreen.classList.remove("active");
                loadingScreen.classList.add("inactive");


                searchForm.classList.remove("inactive");
                searchForm.classList.add("active");
                
              
                
                
            }
        
    }
  
}
function getfromSessionStorage()
{
    const my_long_latitude_coOrd= sessionStorage.getItem("User-Coordinates");
    
    
    if (!my_long_latitude_coOrd)
    {
        userInfoContainer.classList.remove("active");
        userInfoContainer.classList.add("inactive");

        grantAccessContainer.classList.remove("inactive");
        grantAccessContainer.classList.add("active");
        console.log("bbbbbbbbbbbbbb222222222222222");
                
    }
    else
    {
        
        grantAccessContainer.classList.remove("active")
        grantAccessContainer.classList.add("inactive")
        

        const coordinates = JSON.parse(my_long_latitude_coOrd);
        fetchUserWeatherinfo(coordinates);
    }
}


function getlocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showpositionkrdo);

       
    }
    else
    {
        alert("no geolocation support available");
    }
}


function showpositionkrdo(formal_paramter_position)
{
    const usercoordinates ={
        lat : formal_paramter_position.coords.latitude,
        lon :formal_paramter_position.coords.longitude,
    }
    sessionStorage.setItem("User-Coordinates",JSON.stringify(usercoordinates));


   
    fetchUserWeatherinfo(usercoordinates);
}




async function fetchUserWeatherinfo(formal_paramter_having_coordinates)
{
    const {lat ,lon}= formal_paramter_having_coordinates;
    
    
    grantAccessContainer.classList.remove("active");
    grantAccessContainer.classList.add("inactive");
    
                
    loadingScreen.classList.remove("inactive");
    loadingScreen.classList.add("active");


    try{
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
        const data = await response.json();


        if (!data.sys) {

            throw data;
            
            }








            
        
        loadingScreen.classList.remove("active");
        loadingScreen.classList.add("inactive");

        userInfoContainer.classList.remove("inactive");
        userInfoContainer.classList.add("active");
        renderWeatherinfo(data);
    }
    catch(err){

        
         if (err.message === "Failed to fetch" || err.message == "ERR_INTERNET_DISCONNECTED")
            {
                if (navigator.onLine === false)
                {
                    alert("No internet dude , get a connection or hotspot/router");
                    console.log("No internet dude");
                    getfromSessionStorage();
                }
                else {
                    console.log("Failed to fetch weather data. Please try again later. or hold a minute!!");
                    alert("Failed to fetch weather data. Please try again later, or hold a minute!!");
                    alert("DATA IS FLYING ,WAIT DONT REFRESH UNLIMTED TIMES...")

                    getfromSessionStorage();
                }

                

            }   
            else
            {
                console.error(`ERROR :-> ${err.message}`);
                alert(`ERROR :-> ${err.message}`);
            }
      
    }


    
}



function renderWeatherinfo(formal_paramter_data_after_Response)
{

    console.log("1");
    const cityname= document.querySelector("[data-cityName]");
    const countryIcon= document.querySelector("[data-countryIcon]");
    const dataWeatherDesc=document.querySelector("[data-weatherDescription]");
    const dataWeatherIcon=document.querySelector("[data-weatherIcon]");
    const datatemp=document.querySelector("[data-temp]");
    const dataWindSpeed=  document.querySelector("[data-windSpeed]");
    const dataHumidity=  document.querySelector("[data-humidity]");
    const dataCloudiness=  document.querySelector("[data-cloudiness]");

    console.log("2");
    cityname.textContent = formal_paramter_data_after_Response?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${formal_paramter_data_after_Response?.sys?.country.toLowerCase()}.png`;
    dataWeatherDesc.textContent=formal_paramter_data_after_Response?.weather?.[0]?.description;
    dataWeatherIcon.src=`http://openweathermap.org/img/w/${formal_paramter_data_after_Response?.weather?.[0]?.icon}.png`;
    datatemp.textContent=formal_paramter_data_after_Response?.main?.temp + "°C";
    
    


    
    
    
    

    dataWindSpeed.textContent=formal_paramter_data_after_Response?.wind?.speed;
    dataHumidity.textContent=formal_paramter_data_after_Response?.main?.humidity;
    dataCloudiness.textContent=formal_paramter_data_after_Response?.clouds?.all;

    console.log("3");
}



grantaccessButton=document.querySelector("[data-grantAccess]");
grantaccessButton.addEventListener("click",getlocation);


let fetchsearchboxarea= document.querySelector("[data-searchInput]");



let fetchSearchWeaterbutton= document.querySelector(".btnsearch");

fetchSearchWeaterbutton.addEventListener("click",function(e){
    
    e.preventDefault();
    let storecityName=fetchsearchboxarea.value;
    console.log("here is entered city" ,storecityName);
    searchCityWeather(storecityName)


})







async function searchCityWeather(city){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    

    loadingScreen.classList.remove("inactive");
    loadingScreen.classList.add("active");


    let data = await response.json() ;

    loadingScreen.classList.remove("active");
    loadingScreen.classList.add("inactive");


    userInfoContainer.classList.remove("inactive");
    userInfoContainer.classList.add("active");

    renderWeatherinfo(data);


}

 