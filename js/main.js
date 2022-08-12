import { FavoritesView } from "./Favorites.js";

new FavoritesView("#app");

const input = document.querySelector(".search input"); // get the input element
input.addEventListener("resize", resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
  console.log(document.documentElement.clientWidth);
  console.dir(input);
  console.log(this.placeholder);

  if (document.documentElement.clientWidth <= 700) {
    this.style.width = "20rem";
    this.placeholder = "aaa";
  }
}
