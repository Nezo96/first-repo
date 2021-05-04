/**
 * Made by Nezo96
 * Learning javascript
 */

// Declare constants
const header = document.querySelector('.header');
const setup = document.getElementById('setup');
const punchline = document.getElementById('punchline');
const btn = document.getElementById('btn');

// Declare jokeApi url
const jokeApi = "https://official-joke-api.appspot.com/random_joke";

// Load joke on window load
window.addEventListener('load', loadJoke);

// Click to load next joke
btn.addEventListener('click', loadJoke);

// Fetch joke from joke api
function loadJoke() {
    fetch(jokeApi)
        .then(result => {
            return result.json();
        })
        .then (data => {
            displayData(data);
        });
}

// Display joke into HTML
function displayData(data) {
    setup.innerText = data.setup;
    punchline.innerText = data.punchline;
}