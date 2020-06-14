const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const formEl = document.getElementById("form-control");
const js = document.getElementById("js");
const resultsEl = document.getElementById("result-container");
const errorMsg = document.getElementById("error-msg");
const darkModeBtn = document.getElementById("dark-mode-btn");

/// EVENT LISTENERS ///

//On load animation
window.onload = () => {
  formEl.classList.add("animate__animated", "animate__bounceInDown");
  formEl.style.display = "flex";
};

//Dark mode
darkModeBtn.addEventListener("click", changeToDarkMode);

//On title clicked
document.getElementById("head").addEventListener("click", (e) => {
  window.location.reload();
});

//On submit listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get user input
  let location = userInput["value"];

  //Validate user input
  if (location === "") {
    userInput.classList.add("error");
    errorMsg.style.display = "block";
  } else {
    //Remove error style
    userInput.classList.remove("error");
    errorMsg.style.display = "none";

    userInput.blur();

    //If result container exists clear it
    if (document.getElementById("result-container")) {
      const resultContainer = document.getElementById("result-container");
      resultContainer.classList.remove(
        "animate__animated",
        "animate__bounceInUp"
      );

      resultContainer.remove();
    }

    //Get data from api
    getWeather();

    //Clear text field
    userInput["value"] = "";
  }
});

function createResultContainer(dataDaily, dataWeakly) {
  //Create the div element
  const div = document.createElement("div");

  //Add class name and ID to the div
  div.classList.add("result-container");
  div.setAttribute("id", "result-container");
  div.id = "result-container";

  //Insert element to HTML
  document.body.insertAdjacentElement("beforeend", div);

  const resultContainer = document.getElementById("result-container");
  //add animation
  resultContainer.classList.add("animate__animated", "animate__bounceInUp");
  resultContainer.style.display = "flex";

  //Insert div inner html
  const markdown = `
        <div id="daily-results">
         <h4 id="main-heading">Weather in ${dataDaily.name}, ${
    dataDaily.sys.country
  } </h4>
        <h2 id="main-date">Now</h2>
         <img id="main-img" src=http://openweathermap.org/img/wn/${
           dataDaily.weather[0].icon
         }@2x.png alt="weather img"></img>
         <h4 id="main-main">${dataDaily.weather[0].main}</h4>
         <h1 id="main-temp">${formatNumber(dataDaily.main.temp)} °C</h1>
         <table id="result-table">
         <tr id="table-row"><td>Description:</td><td>${toTitleCase(
           dataDaily.weather[0].description
         )}</td></tr>
         <tr id="table-row"><td>Feels like:</td><td>${formatNumber(
           dataDaily.main.feels_like
         )} °C</td></tr>
         <tr id="table-row"><td>Min temp:</td><td>${formatNumber(
           dataDaily.main.temp_min
         )} °C</td>
         </tr>
         <tr id="table-row"><td>Max temp:</td><td>${formatNumber(
           dataDaily.main.temp_max
         )} °C</td>
         </tr>
         <tr id="table-row"><td>Humidity:</td><td>${
           dataDaily.main.humidity
         }%</td>
         </tr>
         </table>
        </div>

        <div class="weekly-result-container" id="weekly-result-container"></div>
            
    `;

  div.innerHTML = markdown;

  dataWeakly.daily.forEach((day, index) => {
    const uvIndex: string = Math.floor(+day.uvi).toString();

    const markup = `
        <div class="weather-daily">
        <span id="daily-date">${new Date(day.dt * 1000).toLocaleString(
          "en-US",
          { weekday: "short", month: "short", day: "numeric" }
        )}</span></span>
        <span id="daily-date"></span>

        <img id="daily-img" src=http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png alt="weather img"></img>

        <span>${toTitleCase(day.weather[0].description)}</span>

          <span id="max-weather">${formatNumber(
            day.temp.max
          )}°c\u00A0\u00A0</span><span id="min-weather">\u00A0${formatNumber(
      day.temp.min
    )}°c</span>

      <span>UV:\u00A0</span> <span id="uv-index">${uvIndex}</span>   
            </div>
      `;
    document
      .getElementById("weekly-result-container")
      .insertAdjacentHTML("afterbegin", markup);

    displayUVIndex(uvIndex);

    if (index < 1) {
      document.getElementById("daily-date").innerText = "Today";
    }
  });
}


/// FUNCTIONS ///

//Get daily data from API
async function getWeather() {
  let location = userInput["value"];
  console.log(location);
  const city = `q=${location}`;
  const apiKey = "appid=568850fc8ca011f081228dd677ed823f";
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&units=metric&${apiKey}`;
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall`;

  try {
    const result = await fetch(`${baseUrl}`);
    const dataDaily = await result.json();
    //Show success msg

    console.log(dataDaily);

    let [lon, lat] = [dataDaily.coord.lon, dataDaily.coord.lat];
    //Get weekly data from api
    const resultWeakly = await fetch(
      `${weeklyUrl}?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&${apiKey}`
    );
    const dataWeakly = await resultWeakly.json();
    console.log(dataWeakly);
    showSuccess();
    //Display result on UI function
    createResultContainer(dataDaily, dataWeakly);
  } catch (error) {
    //Clear text field
    userInput["value"] = "";
    userInput.classList.add("error");
    errorMsg.style.display = "block";
    errorMsg.innerText = "Can't find the city you look for :( Try another";
    resultsEl.innerHTML = "";
  }
}

//Format number function
function formatNumber(str) {
  return Math.round(parseInt(str));
}

//Capital first letter
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//Function show success
function showSuccess() {
  //Add success style
  userInput.classList.add("success");
  //Remove success class after 2 seconds
  setTimeout(function () {
    userInput.classList.remove("success");
  }, 1500);
}

//UVI change color
function displayUVIndex(uv: string) {
  const uvInt = +uv;
  const uvEl = document.getElementById("uv-index");
  if (uvInt >= 0 && uvInt <= 6) {
    uvEl.style.color = "#53d926";
  } else if (uvInt > 6 && uvInt < 10) {
    uvEl.style.color = "#ebd71e";
  } else if (uvInt >= 10) {
    uvEl.style.color = "#eb1e1e";
  } else {
    uvEl.style.color = "black";
  }
}

//Dark mode function
function changeToDarkMode() {
  const body = document.querySelector("body");

  body.classList.toggle("dark-mode-enabled");
  darkModeBtn.classList.toggle("dark-mode-enabled");
  document
    .querySelectorAll(".table-row")
    .forEach((e) => e.classList.toggle("dark-mode-enabled"));
}
