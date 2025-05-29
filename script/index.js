import "../css/style.css";
import { createCard } from "../script/components/createCards";

// Class

const subtitleClassCard = ["text-[#959595]", "pl-[30px]", "pt-[30px]"];

// Selectors
const cardContainer = document.querySelector(".card-container");
const numberRecipes = document.querySelector(".number-recipes");
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

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

// Filters

dropdownButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const chevronDown = btn.querySelector(".fa-chevron-down");
    const chevronUp = btn.querySelector(".fa-chevron-up");

    chevronDown.classList.toggle("invisible");
    chevronUp.classList.toggle("visible");
  });
});

/**
 * Updates the text content
 * @param {Array} recipes - An array of recipes objects.
 */
function updateNumberRecipes(recipes) {
  numberRecipes.textContent = `${recipes.length} recettes`;
}

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
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();
