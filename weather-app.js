(()=>{
    if(!localStorage.getItem("city")){
        localStorage.setItem("city", "Manila");
    }

    if(!localStorage.getItem("theme")){
      localStorage.setItem("theme", "light");
    }

    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
      document.body.classList.add("darkmode");
    }
    const change_city_show_box = document.querySelector(".change-city-box");
    const overlay = document.querySelector("#overlay");

    const input = document.getElementById("input");
    const list = document.getElementById("list");
    const cities = ["Manila", "Cebu", "Davao", "Baguio", "Muntinlupa"];

    const error_message = document.querySelector(".error-message");
    const time = document.querySelector(".time-text");
    const city_pic = document.querySelector("#city");
    const weather_pic = document.querySelector("#weather-main");
    const infos = document.querySelector("#infos");
    const description_box = document.querySelector("#description");
    const humidity_box = document.querySelector("#humidity");
    const temp_box = document.querySelector("#temp");
    const wind_speed_box = document.querySelector("#wind-speed");
    const city_text = document.querySelector(".city-text");
    const city_image = document.querySelector("#city");

    const weather_pic_text = document.querySelector(".weather-main-text");
    const description_text = document.querySelector(".description-text");
    const humidity_text = document.querySelector(".humidity-text");
    const temp_text = document.querySelector(".temp-text");
    const wind_text = document.querySelector(".wind-speed-text");
   

    const API_KEY = "216e6272ee754da5d983db858bbac57a";

    function showList(items) {
      list.innerHTML = "";
      list.style.display = "block";

      items.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
 
      li.addEventListener("click", () => {
      input.value = city;
      list.style.display = "none";
    });

    list.appendChild(li);
  });
}

function updateClock() {
  const now = new Date();

  time.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

getWeather();


    document.addEventListener("click", (e)=>{
      let hasError = false;
      if(e.target.closest("#change-city")){
      change_city_show_box.classList.add("box-show");
      overlay.style.display = "flex"
      }

      if(e.target.closest("#change")){
        const city = input.value.trim();
        if(input.value.trim()=== ""){
          error_message.textContent = "You must pick a city!";
          hasError = true;
        }
        
       if(hasError)return;
       localStorage.setItem("city", city);
       getWeather();
        input.blur();
        input.value= "";
        overlay.style.display = "none"
        list.innerHTML ="";
        error_message.textContent = "";
        change_city_show_box.classList.remove("box-show");

        
      }

      if(e.target.closest("#cancel")){
        change_city_show_box.classList.remove("box-show");
        overlay.style.display = "none"
        list.innerHTML ="";
        error_message.textContent = "";
        input.value = "";
      }


      if(e.target.closest("#darkmode")){
        document.body.classList.toggle("darkmode");
        if(document.body.classList.contains("darkmode")){
          localStorage.setItem("theme", "dark");
        }else{
          localStorage.setItem("theme", "light");
        }
      }


      
    }
);



  

  input.addEventListener("focus", () => {
  showList(cities);
  });

  async function getWeather(){
     
     const city = localStorage.getItem("city");
    

     try{
       const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if(!response.ok){
      
    city_pic.innerHTML= "";
        weather_pic.innerHTML = "";
        infos.innerHTML = "";
        const error_text = document.createElement("p");
         const error_text2 = document.createElement("p");
          const error_text3 = document.createElement("p");
        error_text.textContent = "API RESPONSE 404";
        error_text2.textContent = "API RESPONSE 404";
        error_text3.textContent = "API RESPONSE 404";
        city_pic.appendChild(error_text);
        weather_pic.appendChild(error_text2);
        infos.appendChild(error_text3);
        return;
    }else{

    const data = await response.json();
    console.log(data);

   const cityClasses = ["manila", "baguio", "cebu", "davao", "muntinlupa"];

cityClasses.forEach((city)=> {
  city_image.classList.remove(city);
});

const formattedCity = city.toLowerCase();
city_image.classList.add(formattedCity);
city_text.textContent= city;

const main_weather = ["Thunderstorm",
"Drizzle",
"Rain",
"Snow",
"Atmosphere",
"Clear",
"Clouds"];

const main = data.weather[0].main;
console.log(main);

main_weather.forEach((weatherr)=>{
  weather_pic.classList.remove(weatherr);
});

weather_pic.classList.add(main);
weather_pic_text.textContent= main + " Sky";

const description = data.weather[0].description;
console.log(description);
const humidity = data.main.humidity;

description_text.textContent= `Description: ${description}`;
humidity_text.textContent = `Humidity: ${humidity}`;

const temp = data.main.temp;

temp_text.textContent = `Temperature: ${temp}`;

const wind = data.wind.speed;
wind_text.textContent = `Wind Speed: ${wind}`;
    }
     }catch(error){
        city_pic.innerHTML= "";
        weather_pic.innerHTML = "";
        infos.innerHTML = "";
        const error_text = document.createElement("p");
         const error_text2 = document.createElement("p");
          const error_text3 = document.createElement("p");
        error_text.textContent = "API RESPONSE 404";
        error_text2.textContent = "API RESPONSE 404";
        error_text3.textContent = "API RESPONSE 404";
        city_pic.appendChild(error_text);
        weather_pic.appendChild(error_text2);
        infos.appendChild(error_text3);
        return;
     }




  }
  


})();