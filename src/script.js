var userInput = document.getElementById("user-input");
var searchBtn = document.getElementById("search-btn");
var formEl = document.querySelector(".form-control");
var js = document.getElementById("js");
var errorMsg = document.getElementById('error-msg');
//Api Key
var apiKey = "568850fc8ca011f081228dd677ed823f";
//On load animation
window.onload = function () {
    formEl.classList.add("animate__animated", "animate__bounceInDown");
};
//On submit listener
formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    //Get user input
    var location = userInput["value"];
    //Validate user input
    if (location === "") {
        userInput.classList.add('error');
        errorMsg.style.display = 'block';
    }
    else {
        //Remove error style
        userInput.classList.remove("error");
        errorMsg.style.display = "none";
        //If result container exists clear it
        if (document.getElementById("result-container")) {
            var resultContainer = document.getElementById("result-container");
            resultContainer.classList.remove("animate__animated", "animate__bounceInUp");
            resultContainer.remove();
        }
        //Display result on UI function
        displayResults(location);
        //Clear text field
        userInput["value"] = "";
    }
});
function displayResults(location) {
    console.log(location);
    //Display result container on UI with animation
    createResultContainer();
}
function createResultContainer() {
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
    resultContainer.style.display = "block";
    //Insert div inner html
    var markdown = "\n         <h1>Weather for: </h1>\n    ";
    div.innerHTML = markdown;
}
