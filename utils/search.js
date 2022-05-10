let form = document.getElementById("form");
let searchQuery = document.getElementById("search-query");
let container = document.getElementById("container");
let button = document.getElementById("button");


//disable button until input field has text
button.disabled = true;
searchQuery.addEventListener("input", disableButton);

function disableButton() {
  if (searchQuery.value.length == 0) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}


//handle birthdate & location
const handleBirthCharacter = (placeOfBirth, yearOfBirth) => {
  const element = document.createElement("div");
  if (Boolean(placeOfBirth && yearOfBirth))
    return (element.innerText = `<p>${placeOfBirth}; ${yearOfBirth}</p>`);
  else return "";
};


//handle gender
const handleGenderCharacter = (genderCharacter) => {
  const element = document.createElement("div");
  if (genderCharacter === "M")
    return (element.innerText = `<p>Gender: male</p>`);
  if (genderCharacter === "F")
    return (element.innerText = `<p>Gender: female</p>`);
  else return "<p>No gender information available</p>";
};


//search function
const search = (event) => {
  event.preventDefault();

  console.log("search query: " + searchQuery.value);

  fetch("http://stapi.co/api/v1/rest/character/search", {
    body: `name=${searchQuery.value}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      //display results
      for (let character of response.characters) {
        var element = document.createElement("div");
        element.classList.add("character");
        element.innerHTML = `
            <h3>${character.name}</h3>
            ${handleGenderCharacter(character.gender)}
            ${handleBirthCharacter(
              character.placeOfBirth,
              character.yearOfBirth
            )}
            <p>Has hologram? ${Boolean(character.hologram) ? "Yes" : "No"}</p>
        `;
        container.appendChild(element);
      }
    });
};


//call search function
form.addEventListener("submit", search);


//clear existing search on new submit
form.addEventListener("submit", clearSearch);

function clearSearch() {
  if (container.innerHTML !== "") {
    container.innerHTML = ""
  }
}


//scroll button function
const scrollButton = document.getElementById("scroll-button");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

function scrollUp() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
