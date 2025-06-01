import "../css/style.css";
import { createCard } from "../script/components/createCards";
import { displaySearchCards } from "./components/recipeSearch";
import { updateNumberRecipes } from "./components/utils";

// Class

const subtitleClassCard = ["text-[#959595]", "pl-[30px]", "pt-[30px]"];

// Selectors
const cardContainer = document.querySelector(".card-container");
const dropdownButtons = document.querySelectorAll(".dropdown-btn");
const inputSearchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

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

dropdownButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const chevronDown = btn.querySelector(".fa-chevron-down");
    const chevronUp = btn.querySelector(".fa-chevron-up");

    chevronDown.classList.toggle("invisible");
    chevronUp.classList.toggle("visible");
  });
});

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
