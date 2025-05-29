export function displaySearchCards(inputSearchBar, cardContainer) {
  const inputText = inputSearchBar.value.toLowerCase();
  const cards = cardContainer.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardText = card.textContent.toLowerCase();

    if (cardText.indexOf(inputText) !== -1) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}
