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
export const inputSearchBar = document.querySelector(".search-bar");
const errorMessageInput = document.getElementById("errorMessageInput");
const searchBtn = document.querySelector(".search-btn");
const tagContainer = document.getElementById("selected-tags");

let recipesData = [];

const itemsDropdownData = { ingredients: [], appliances: [], ustensils: [] };

// Search Bar

/**
 * Applies filters based on the search bar input and the selected filter items (ingredients, appliances, utensils).
 */
function applyFilters() {
  const inputText = inputSearchBar.value;
  const searchText = sanitizeInput(inputText).toLowerCase().trim();

  const itemsDropdownData = JSON.parse(
    sessionStorage.getItem("itemsDropdownData")
  );
  const selectedIngredients = itemsDropdownData?.ingredients;
  const selectedAppliances = itemsDropdownData?.appliances;
  const selectedUstensils = itemsDropdownData?.ustensils;

  if (
    searchText.length === 0 &&
    selectedIngredients?.length === 0 &&
    selectedAppliances?.length === 0 &&
    selectedUstensils?.length === 0
  ) {
    errorMessageInput.textContent = "";
    displayRecipes(recipesData);
  } else if (
    searchText.length >= 3 ||
    (searchText.length === 0 &&
      (selectedIngredients?.length > 0 ||
        selectedAppliances?.length > 0 ||
        selectedUstensils?.length > 0))
  ) {
    errorMessageInput.textContent = "";

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
    errorMessageInput.textContent = "Veuillez entrer au moins 3 caractères.";
  }
}

inputSearchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyFilters();
  }
});

inputSearchBar.addEventListener("input", () => {
  sessionStorage.setItem("searchInputValue", inputSearchBar.value);
});

searchBtn.addEventListener("click", () => {
  applyFilters();
});

// Filters

const itemsDropdown = ["ingredients", "appliances", "ustensils"];

for (let i = 0; i < itemsDropdown.length; i++) {
  expandedDropdown(
    document.getElementById(`${itemsDropdown[i]}-btn`),
    document.getElementById(`${itemsDropdown[i]}-dropdown`)
  );
}

/**
 * Handles the click event when a user selects an item from a dropdown (ingredient, appliance, or utensil).
 *
 * @param {string} category - The category of the item (ingredients, appliances, ustensils).
 * @param {string} selectedItem - The item selected by the user in the dropdown.
 */
export function handleDropdownItemClick(category, selectedItem) {
  if (itemsDropdownData[category].includes(selectedItem)) {
    return;
  }
  itemsDropdownData[category].push(selectedItem);

  sessionStorage.setItem(
    "itemsDropdownData",
    JSON.stringify(itemsDropdownData)
  );

  const itemSelectioned = document.createElement("div");
  itemSelectioned.classList.add("item-selectioned");
  itemSelectioned.textContent = selectedItem;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  closeBtn.classList.add("cursor-pointer");
  itemSelectioned.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    itemSelectioned.remove();

    itemsDropdownData[category] = itemsDropdownData[category].filter(
      (item) => item !== selectedItem
    );

    sessionStorage.setItem(
      "itemsDropdownData",
      JSON.stringify(itemsDropdownData)
    );

    const inputText = inputSearchBar.value;
    const searchText = sanitizeInput(inputText).toLowerCase().trim();

    const selectedIngredients = itemsDropdownData.ingredients;
    const selectedAppliances = itemsDropdownData.appliances;
    const selectedUstensils = itemsDropdownData.ustensils;

    const filteredRecipes = filterRecipes(
      searchText,
      recipesData,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    displaySearchCards(filteredRecipes, cardContainer, subtitleClassCard);
    updateNumberRecipes(filteredRecipes);
  });

  tagContainer.appendChild(itemSelectioned);

  const inputText = inputSearchBar.value;
  const searchText = sanitizeInput(inputText).toLowerCase().trim();

  const dataFromStorage = JSON.parse(
    sessionStorage.getItem("itemsDropdownData")
  );
  const selectedIngredients = dataFromStorage.ingredients;
  const selectedAppliances = dataFromStorage.appliances;
  const selectedUstensils = dataFromStorage.ustensils;

  const filteredRecipes = filterRecipes(
    searchText,
    recipesData,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );

  displaySearchCards(filteredRecipes, cardContainer, subtitleClassCard);
  updateNumberRecipes(filteredRecipes);
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
    recipesData = recipesData;
    updateNumberRecipes(recipesData);
    displayRecipes(recipesData);
    setupDropdownMenus(recipesData, handleDropdownItemClick);
    const savedSearch = sessionStorage.getItem("searchInputValue");
    if (savedSearch) {
      inputSearchBar.value = savedSearch;
    }
    const savedData = JSON.parse(
      sessionStorage.getItem("itemsDropdownData")
    ) || {
      ingredients: [],
      appliances: [],
      ustensils: [],
    };
    ["ingredients", "appliances", "ustensils"].forEach((category) => {
      savedData[category].forEach((selectedItem) => {
        handleDropdownItemClick(category, selectedItem);
      });
    });

    if (inputSearchBar.value.trim().length >= 3) {
      applyFilters();
    } else {
      displayRecipes(recipesData);
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Une erreur est survenue !";
    errorMessage.classList.add("error-message");

    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    closeButton.classList.add("close-error-message");
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
