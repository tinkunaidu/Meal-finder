const mealContainer = document.getElementById("mealContainer");
const searchInput = document.getElementById("searchInput");

// Fetch meal by search
async function searchMeal() {
  const query = searchInput.value.trim();
  if (!query) {
    mealContainer.innerHTML = "<p>Please enter a meal name 🍽️</p>";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.meals) {
    mealContainer.innerHTML = "<p>No meals found ❌</p>";
    return;
  }

  displayMeals(data.meals);
}

// Display meals in UI
function displayMeals(meals) {
  mealContainer.innerHTML = "";
  meals.forEach(meal => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");

    mealDiv.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><b>Category:</b> ${meal.strCategory}</p>
      <p><b>Area:</b> ${meal.strArea}</p>
      <button onclick="getMealDetails('${meal.idMeal}')">View Recipe</button>
    `;

    mealContainer.appendChild(mealDiv);
  });
}

// Fetch meal details
async function getMealDetails(mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const response = await fetch(url);
  const data = await response.json();

  const meal = data.meals[0];
  alert(`🍲 ${meal.strMeal}\n\nInstructions:\n${meal.strInstructions.substring(0, 300)}...`);
}