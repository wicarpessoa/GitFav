import { FavoritesView } from "./Favorites.js";
import { ResizeStyles } from "./Style.js";
new FavoritesView("#app");

const { resizeButton, resizeInput, resizeRemove, input, button, remove } =
  ResizeStyles();

input.addEventListener("resize", resizeInput);
button.addEventListener("resize", resizeButton);
remove.addEventListener("resize", resizeRemove);
resizeInput.call(input);
resizeButton.call(button);
resizeRemove.call(remove);
