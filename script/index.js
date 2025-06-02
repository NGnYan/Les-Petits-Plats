import "../css/style.css";
import { createCard } from "../script/components/createCards";
import { displaySearchCards } from "./components/recipeSearch";
import { updateNumberRecipes } from "./components/utils";
import { setupDropdownMenus } from "./components/dropdownList";
import { expandedDropdown } from "./components/dropdownList";

// Class

const subtitleClassCard = ["text-[#959595]", "pl-[30px]", "pt-[30px]"];

// Selectors
const cardContainer = document.querySelector(".card-container");
const inputSearchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const ingredientsBtn = document.getElementById("ingredients-btn");
const appliancesBtn = document.getElementById("appliances-btn");
const ustensilsBtn = document.getElementById("ustensils-btn");
const dropdownIngredients = document.getElementById("ingredients-dropdown");
const dropdownAppliances = document.getElementById("appliances-dropdown");
const dropdownUstensils = document.getElementById("ustensils-dropdown");

let recipesData = [];

/**
 * API call to fetch
 * @returns {Promise<Object>} JSON data of the recipes.
 */
async function getRecipes() {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data = await response.json();
  return data.recipes;
}

// Search Bar

inputSearchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    displaySearchCards(
      inputSearchBar,
      recipesData,
      cardContainer,
      subtitleClassCard
    );
  }
});

searchBtn.addEventListener("click", () => {
  displaySearchCards(
    inputSearchBar,
    recipesData,
    cardContainer,
    subtitleClassCard
  );
});

// Filters

expandedDropdown(ingredientsBtn, dropdownIngredients);
expandedDropdown(appliancesBtn, dropdownAppliances);
expandedDropdown(ustensilsBtn, dropdownUstensils);

// Cards

/**
 * Display the recipe cards
 */
async function displayRecipes() {
  const recipes = await getRecipes();
  cardContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = createCard(recipe, subtitleClassCard);
    cardContainer.appendChild(card);
  });
}

/**
 * Initializes the index page
 */
async function init() {
  try {
    recipesData = await getRecipes();
    updateNumberRecipes(recipesData);
    displayRecipes(recipesData);
    setupDropdownMenus(recipesData);
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();
