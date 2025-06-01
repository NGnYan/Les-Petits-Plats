import { createCard } from "./createCards";
import { updateNumberRecipes } from "./utils";
import { filterRecipes } from "./utils";

/**
 * Displays recipe cards based on the search input.
 * Filters the recipes using the search text, then dynamically generates and displays matching cards.
 *
 * @param {HTMLInputElement} inputSearchBar - The input field where the user types the search text.
 * @param {Array} allRecipes - The array of all available recipe objects.
 * @param {HTMLElement} cardContainer - The DOM element where recipe cards will be rendered.
 * @param {Array} subtitleClassCard - Array of CSS classes to style the card subtitles.
 */
export function displaySearchCards(
  inputSearchBar,
  allRecipes,
  cardContainer,
  subtitleClassCard
) {
  const filteredRecipes = filterRecipes(inputSearchBar, allRecipes);
  updateNumberRecipes(filteredRecipes);

  if (filteredRecipes.length === 0) {
    cardContainer.innerHTML = `
    <p class="absolute flex items-center justify-center w-full text-center text-lg whitespace-nowrap">
      Aucune recette trouvée !
    </p>
  `;
    return;
  }

  cardContainer.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    const card = createCard(recipe, subtitleClassCard);
    cardContainer.appendChild(card);
  });
}
