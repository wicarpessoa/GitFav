export function ResizeStyles() {
  const input = document.querySelector(".search input");
  const button = document.querySelector(".search button");
  const remove = document.querySelector(".remove");

  function resizeInput() {
    if (document.documentElement.clientWidth <= 700) {
      this.style.width = "15rem";
      this.style.height = "3rem";
      this.placeholder = "Favorite user";
    }
  }
  function resizeButton() {
    if (document.documentElement.clientWidth <= 700) {
      this.style.height = "3rem";
      this.innerText = "❤️";
      this.style.padding = "0.4rem 1rem";
    }
  }
  function resizeRemove() {
    if (document.documentElement.clientWidth <= 700) {
      this.innerText = "x";
    }
  }
  return { resizeInput, resizeButton, resizeRemove, input, button, remove };
}
