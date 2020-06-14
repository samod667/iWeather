var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var userInput = document.getElementById("user-input");
var searchBtn = document.getElementById("search-btn");
var formEl = document.getElementById("form-control");
var js = document.getElementById("js");
var resultsEl = document.getElementById("result-container");
var errorMsg = document.getElementById("error-msg");
var darkModeBtn = document.getElementById("dark-mode-btn");
//On load animation
window.onload = function () {
    formEl.classList.add("animate__animated", "animate__bounceInDown");
    formEl.style.display = "flex";
};
//Dark mode
darkModeBtn.addEventListener("click", changeToDarkMode);
//On title clicked
document.getElementById("head").addEventListener("click", function (e) {
    window.location.reload();
});
//On submit listener
formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    //Get user input
    var location = userInput["value"];
    //Validate user input
    if (location === "") {
        userInput.classList.add("error");
        errorMsg.style.display = "block";
    }
    else {
        //Remove error style
        userInput.classList.remove("error");
        errorMsg.style.display = "none";
        userInput.blur();
        //If result container exists clear it
        if (document.getElementById("result-container")) {
            var resultContainer = document.getElementById("result-container");
            resultContainer.classList.remove("animate__animated", "animate__bounceInUp");
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
    var div = document.createElement("div");
    //Add class name and ID to the div
    div.classList.add("result-container");
    div.setAttribute("id", "result-container");
    div.id = "result-container";
    //Insert element to HTML
    document.body.insertAdjacentElement("beforeend", div);
    var resultContainer = document.getElementById("result-container");
    //add animation
    resultContainer.classList.add("animate__animated", "animate__bounceInUp");
    resultContainer.style.display = "flex";
    //Insert div inner html
    var markdown = "\n        <div id=\"daily-results\">\n         <h4 id=\"main-heading\">Weather in " + dataDaily.name + ", " + dataDaily.sys.country + " </h4>\n        <h2 id=\"main-date\">Now</h2>\n         <img id=\"main-img\" src=http://openweathermap.org/img/wn/" + dataDaily.weather[0].icon + "@2x.png alt=\"weather img\"></img>\n         <h4 id=\"main-main\">" + dataDaily.weather[0].main + "</h4>\n         <h1 id=\"main-temp\">" + formatNumber(dataDaily.main.temp) + " \u00B0C</h1>\n         <table id=\"result-table\">\n         <tr id=\"table-row\"><td>Description:</td><td>" + toTitleCase(dataDaily.weather[0].description) + "</td></tr>\n         <tr id=\"table-row\"><td>Feels like:</td><td>" + formatNumber(dataDaily.main.feels_like) + " \u00B0C</td></tr>\n         <tr id=\"table-row\"><td>Min temp:</td><td>" + formatNumber(dataDaily.main.temp_min) + " \u00B0C</td>\n         </tr>\n         <tr id=\"table-row\"><td>Max temp:</td><td>" + formatNumber(dataDaily.main.temp_max) + " \u00B0C</td>\n         </tr>\n         <tr id=\"table-row\"><td>Humidity:</td><td>" + dataDaily.main.humidity + "%</td>\n         </tr>\n         </table>\n        </div>\n\n        <div class=\"weekly-result-container\" id=\"weekly-result-container\"></div>\n            \n    ";
    div.innerHTML = markdown;
    dataWeakly.daily.forEach(function (day, index) {
        var uvIndex = Math.floor(+day.uvi).toString();
        var markup = "\n        <div class=\"weather-daily\">\n        <span id=\"daily-date\">" + new Date(day.dt * 1000).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" }) + "</span></span>\n        <span id=\"daily-date\"></span>\n\n        <img id=\"daily-img\" src=http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png alt=\"weather img\"></img>\n\n        <span>" + toTitleCase(day.weather[0].description) + "</span>\n\n          <span id=\"max-weather\">" + formatNumber(day.temp.max) + "\u00B0c\u00A0\u00A0</span><span id=\"min-weather\">\u00A0" + formatNumber(day.temp.min) + "\u00B0c</span>\n\n      <span>UV:\u00A0</span> <span id=\"uv-index\">" + uvIndex + "</span>   \n            </div>\n      ";
        document
            .getElementById("weekly-result-container")
            .insertAdjacentHTML("afterbegin", markup);
        displayUVIndex(uvIndex);
        if (index < 1) {
            document.getElementById('daily-date').innerText = "Today";
        }
    });
}
//Get daily data from API
function getWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var location, city, apiKey, baseUrl, weeklyUrl, result, dataDaily, _a, lon, lat, resultWeakly, dataWeakly, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    location = userInput["value"];
                    console.log(location);
                    city = "q=" + location;
                    apiKey = "appid=568850fc8ca011f081228dd677ed823f";
                    baseUrl = "https://api.openweathermap.org/data/2.5/weather?" + city + "&units=metric&" + apiKey;
                    weeklyUrl = "https://api.openweathermap.org/data/2.5/onecall";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("" + baseUrl)];
                case 2:
                    result = _b.sent();
                    return [4 /*yield*/, result.json()];
                case 3:
                    dataDaily = _b.sent();
                    //Show success msg
                    console.log(dataDaily);
                    _a = [dataDaily.coord.lon, dataDaily.coord.lat], lon = _a[0], lat = _a[1];
                    return [4 /*yield*/, fetch(weeklyUrl + "?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&" + apiKey)];
                case 4:
                    resultWeakly = _b.sent();
                    return [4 /*yield*/, resultWeakly.json()];
                case 5:
                    dataWeakly = _b.sent();
                    console.log(dataWeakly);
                    showSuccess();
                    //Display result on UI function
                    createResultContainer(dataDaily, dataWeakly);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    //Clear text field
                    userInput["value"] = "";
                    userInput.classList.add("error");
                    errorMsg.style.display = "block";
                    errorMsg.innerText = "Can't find the city you look for :( Try another";
                    resultsEl.innerHTML = '';
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
//Format number function
function formatNumber(str) {
    return Math.round(parseInt(str));
}
//Capital first letter
var toTitleCase = function (phrase) {
    return phrase
        .toLowerCase()
        .split(" ")
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join(" ");
};
//get Date function
function getDate() {
    var date = new Date();
    var d = date.getDay();
    var m = date.getMonth();
    var dm = date.getDate();
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";
    var months = new Array(11);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "Jul";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Sep";
    for (var i = 0; i < 6; i++) {
        d = d + 1;
        document.getElementById('daily-date').innerText = weekdays[d];
    }
}
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
function displayUVIndex(uv) {
    var uvInt = +uv;
    var uvEl = document.getElementById("uv-index");
    if (uvInt >= 0 && uvInt <= 6) {
        uvEl.style.color = "#53d926";
    }
    else if (uvInt > 6 && uvInt < 10) {
        uvEl.style.color = "#ebd71e";
    }
    else if (uvInt >= 10) {
        uvEl.style.color = "#eb1e1e";
    }
    else {
        uvEl.style.color = "black";
    }
}
//Dark mode function
function changeToDarkMode() {
    var body = document.querySelector("body");
    body.classList.toggle("dark-mode-enabled");
    darkModeBtn.classList.toggle("dark-mode-enabled");
    document.querySelectorAll(".table-row").forEach(function (e) { return e.classList.toggle('dark-mode-enabled'); });
}
