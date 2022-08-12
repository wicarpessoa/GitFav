import { FavoritesView } from "./Favorites.js";

new FavoritesView("#app");

const input = document.querySelector(".search input");
const button = document.querySelector(".search button");
input.addEventListener("resize", resizeInput);
button.addEventListener("resize", resizeButton);
resizeInput.call(input);
resizeButton.call(button);
function resizeInput() {
  if (document.documentElement.clientWidth <= 700) {
    this.style.width = "15rem";
    this.style.height = "3rem";
    this.placeholder = "Favorite user";
  }
}
function resizeButton() {
  console.dir(button);
  if (document.documentElement.clientWidth <= 700) {
    this.style.height = "3rem";
    this.innerText = "";
  }
}
