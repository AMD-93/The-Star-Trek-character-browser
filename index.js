let form = document.getElementById('form');
let searchQuery = document.getElementById('search-query');
let container = document.getElementById("container");
let button = document.getElementById('button')

//disable button until input field has text
button.disabled = true
searchQuery.addEventListener('input', disableButton)

function disableButton() {
    if(searchQuery.value.length == 0) {
        button.disabled = true
    } else {
        button.disabled = false
    }
}

//search on submit
form.addEventListener('submit', search);

function search(event){
  event.preventDefault();
  console.log("search query: " + searchQuery.value);

  fetch('http://stapi.co/api/v1/rest/character/search', {
  body: `name=${searchQuery.value}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'POST'
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
            <p>Gender: ${character.gender}</p>
            <p>Place and year of birth: ${character.placeOfBirth}, ${character.yearOfBirth}</p>
            <p>Has hologram? ${character.hologram}</p>
        `;
        container.appendChild(element);
    }
  })}
