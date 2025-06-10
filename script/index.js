import "../css/style.css";
import { getRecipes } from "../script/components/api";
import { createCard } from "../script/components/createCards";
import { displaySearchCards } from "./components/recipeSearch";
import { filterRecipes, updateNumberRecipes } from "./components/utils";
import { setupDropdownMenus } from "./components/dropdownList";
import { expandedDropdown } from "./components/dropdownList";
import { sanitizeInput } from "./components/utils";

// Class

const subtitleClassCard = ["text-[#959595]", "pl-[30px]", "pt-[30px]"];

// Selectors
const bodyContainer = document.querySelector(".body-container");
const cardContainer = document.querySelector(".card-container");
const inputSearchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let recipesData = [];

// Search Bar

inputSearchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const inputText = inputSearchBar.value;
    const searchText = sanitizeInput(inputText).toLowerCase().trim();
    const selectedIngredients = sessionStorage.getItem("ingredients");
    const selectedAppliances = sessionStorage.getItem("appliances");
    const selectedUstensils = sessionStorage.getItem("ustensils");

    if (searchText.length >= 3) {
      const filteredRecipes = filterRecipes(
        searchText,
        recipesData,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      displaySearchCards(filteredRecipes, cardContainer, subtitleClassCard);
    } else {
      displayRecipes(recipesData);
    }
  }
});

searchBtn.addEventListener("click", () => {
  const inputText = inputSearchBar.value;
  const searchText = sanitizeInput(inputText).toLowerCase().trim();
  const selectedIngredients = sessionStorage.getItem("ingredients");
  const selectedAppliances = sessionStorage.getItem("appliances");
  const selectedUstensils = sessionStorage.getItem("ustensils");

  if (searchText.length >= 3) {
    const filteredRecipes = filterRecipes(
      searchText,
      recipesData,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    displaySearchCards(filteredRecipes, cardContainer, subtitleClassCard);
  } else {
    displayRecipes(recipesData);
  }
});

// Filters

const itemsDropdown = ["ingredients", "appliances", "ustensils"];

for (let i = 0; i < itemsDropdown.length; i++) {
  expandedDropdown(
    document.getElementById(`${itemsDropdown[i]}-btn`),
    document.getElementById(`${itemsDropdown[i]}-dropdown`)
  );
}

// Cards

/**
 * Display the recipe cards
 */
async function displayRecipes(recipes) {
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

    const overlay = document.createElement("div");
    overlay.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-black/20",
      "z-40"
    );

    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Une erreur est survenue !";
    errorMessage.classList.add(
      "fixed",
      "top-1/2",
      "left-1/2",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "flex",
      "items-center",
      "justify-center",
      "w-150",
      "text-center",
      "bg-white",
      "font-anton",
      "text-[3em]",
      "text-[#FFD15B]",
      "whitespace-nowrap",
      "p-6",
      "rounded-xl",
      "shadow-lg",
      "mx-auto",
      "z-50"
    );

    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeButton.classList.add(
      "absolute",
      "top-3",
      "right-4",
      "text-2xl",
      "text-[#ababab]",
      "hover:text-[#969696]",
      "cursor-pointer",
      "z-50"
    );
    closeButton.setAttribute("aria-label", "Fermer le message d'erreur");

    errorMessage.appendChild(closeButton);
    bodyContainer.appendChild(overlay);
    bodyContainer.appendChild(errorMessage);

    closeButton.addEventListener("click", () => {
      overlay.remove();
      errorMessage.remove();
    });
  }
}

init();
