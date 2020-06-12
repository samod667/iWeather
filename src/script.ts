const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const formEl = document.querySelector(".form-control");
const js = document.getElementById("js");
const errorMsg = document.getElementById('error-msg');

//Api Key
const apiKey = "568850fc8ca011f081228dd677ed823f";

//On load animation
window.onload = () => {
  formEl.classList.add("animate__animated", "animate__bounceInDown");
};

//On submit listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get user input
  let location = userInput["value"];

  //Validate user input
  if (location === "") {
    userInput.classList.add('error');
    errorMsg.style.display = 'block';

  } else {

    //Remove error style
    userInput.classList.remove("error");
    errorMsg.style.display = "none";

    //If result container exists clear it
    if (document.getElementById("result-container")) {
      const resultContainer = document.getElementById("result-container");
      resultContainer.classList.remove(
        "animate__animated",
        "animate__bounceInUp"
      );

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
  resultContainer.style.display = "block";

  //Insert div inner html
  const markdown = `
         <h1>Weather for: </h1>
    `;

  div.innerHTML = markdown;
}
