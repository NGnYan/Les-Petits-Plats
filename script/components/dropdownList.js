import { handleDropdownItemClick } from "../index.js";

// Selectors

/**
 * Displays and manages a dynamic dropdown list (ingredients, appliances, or utensils).
 *
 * @param {string} id - The HTML element ID of the dropdown container.
 * @param {Array<string>} recipes - The array of items to display in the dropdown.
 * @param {string} category - The category of items (ingredients, appliances, or ustensils).
 */
export function displayDropdown(id, recipes, category) {
  const dropdownContainer = document.getElementById(id);
  dropdownContainer.innerHTML = "";

  const searchContainer = document.createElement("div");
  searchContainer.className = `
   "search-container"
  `;

  const inputDropdown = document.createElement("input");
  inputDropdown.type = "text";
  inputDropdown.placeholder = "Rechercher";
  inputDropdown.className = "input-dropdown";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteBtn.className = `delete-btn hidden`;

  const searchIcon = document.createElement("span");
  searchIcon.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  searchIcon.className = "search-icon";

  searchContainer.appendChild(inputDropdown);
  searchContainer.appendChild(deleteBtn);
  searchContainer.appendChild(searchIcon);
  dropdownContainer.appendChild(searchContainer);

  const list = document.createElement("ul");
  list.className = "ul-dropdown";

  const listItems = [];

  recipes
    .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }))
    .forEach((elmt) => {
      const li = document.createElement("li");
      li.textContent =
        elmt.charAt(0).toUpperCase() + elmt.slice(1).toLowerCase();
      li.className = "li-dropdown";

      li.addEventListener("click", () => {
        handleDropdownItemClick(category, li.textContent);
      });

      list.appendChild(li);
      listItems.push(li);
    });

  dropdownContainer.appendChild(list);

  deleteBtn.addEventListener("click", () => {
    inputDropdown.value = "";
    deleteBtn.classList.add("hidden");
    inputDropdown.focus();

    listItems.forEach((li) => {
      li.style.display = "block";
    });
  });

  inputDropdown.addEventListener("input", () => {
    const value = inputDropdown.value.toLowerCase();

    if (value.length > 0) {
      deleteBtn.classList.remove("hidden");
    } else {
      deleteBtn.classList.add("hidden");
    }

    listItems.forEach((li) => {
      const item = li.textContent.toLowerCase();
      li.style.display = item.includes(value) ? "block" : "none";
    });
  });
}

/**
 * Sets up the dropdown menus (ingredients, appliances, and utensils) by extracting unique values from the list of recipes and displaying them.
 *
 * @param {Array<Object>} recipes - Array of recipe objects.
 */
export function setupDropdownMenus(recipes) {
  const ingredients = new Set();
  const appliances = new Set();
  const ustensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((objet) => {
      ingredients.add(objet.ingredient.trim().toLowerCase());
    });
    appliances.add(recipe.appliance.trim().toLowerCase());
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil.trim().toLowerCase());
    });
  });

  const selectedData = JSON.parse(
    sessionStorage.getItem("itemsDropdownData")
  ) || {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  const filteredIngredients = [...ingredients].filter(
    (ing) => !selectedData.ingredients.map((i) => i.toLowerCase()).includes(ing)
  );
  const filteredAppliances = [...appliances].filter(
    (app) => !selectedData.appliances.map((a) => a.toLowerCase()).includes(app)
  );
  const filteredUstensils = [...ustensils].filter(
    (ust) => !selectedData.ustensils.map((u) => u.toLowerCase()).includes(ust)
  );

  displayDropdown("ingredients-dropdown", filteredIngredients, "ingredients");
  displayDropdown("appliances-dropdown", filteredAppliances, "appliances");
  displayDropdown("ustensils-dropdown", filteredUstensils, "ustensils");
}

export function expandedDropdown(btn, dropdown) {
  const chevronDown = btn.querySelector(".fa-chevron-down");
  const chevronUp = btn.querySelector(".fa-chevron-up");

  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      btn.setAttribute("aria-expanded", "false");
      untoggleDropdown();
    } else {
      btn.setAttribute("aria-expanded", "true");
      toggleDropdown();
    }
  });

  document.addEventListener("click", (event) => {
    const isClickInside =
      dropdown.contains(event.target) || btn.contains(event.target);

    if (!isClickInside) {
      btn.setAttribute("aria-expanded", "false");
      untoggleDropdown();
    }
  });

  function toggleDropdown() {
    chevronDown.classList.add("invisible");
    chevronUp.classList.remove("invisible");
    dropdown.classList.remove("hidden");
    dropdown.classList.add("block");
    dropdown.classList.add("max-h-[300px]", "overflow-y-auto");
  }

  function untoggleDropdown() {
    chevronDown.classList.remove("invisible");
    chevronUp.classList.add("invisible");
    dropdown.classList.remove("block");
    dropdown.classList.add("hidden");
    dropdown.classList.remove("max-h-[300px]", "overflow-y-auto");
  }
}
