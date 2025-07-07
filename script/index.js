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
function applyFilters() {
  const inputText = inputSearchBar.value;
  const searchText = sanitizeInput(inputText).toLowerCase().trim();

  const selectedIngredients = JSON.parse(
    sessionStorage.getItem("ingredients") || "[]"
  );
  const selectedAppliances = JSON.parse(
    sessionStorage.getItem("appliances") || "[]"
  );
  const selectedUstensils = JSON.parse(
    sessionStorage.getItem("ustensils") || "[]"
  );

  if (searchText.length === 0) {
    errorMessageInput.textContent = "";
    displayRecipes(recipesData);
  } else if (searchText.length >= 3) {
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
  itemSelectioned.classList.add(
    "bg-[#FFD15B]",
    "text-black",
    "px-[20px]",
    "py-[10px]",
    "rounded-lg",
    "flex",
    "items-center",
    "justify-between",
    "w-[180px]"
  );
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
