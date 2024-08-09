var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    // Get HTML elements
    const recipeCont = document.getElementsByTagName('header')[0];
    const recipeVisiting = document.querySelector('#h1_header');
    const getRecipeBtn = document.getElementById('getRecipeBtn');
    const recipeContainer = document.getElementById('recipeContainer');
    const recipeLink = 'https://www.themealdb.com/api/json/v1/1/random.php';
    // Add event listener to the button
    getRecipeBtn.addEventListener('click', () => {
        fetchRecipe();
    });
    // Fetch a random recipe from the API
    function fetchRecipe() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                recipeVisiting.innerHTML = 'Here is your Recipe';
                recipeVisiting.style.color = 'blue';
                recipeCont.style.backgroundColor = 'yellow';
                const response = yield fetch(recipeLink);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = yield response.json();
                if (data.meals.length === 0) {
                    throw new Error('No meals found');
                }
                const recipe = data.meals[0];
                displayRecipe(recipe);
            }
            catch (error) {
                console.error('Error:', error);
                recipeContainer.innerHTML = '<p>Failed to load recipe. Please try again.</p>';
            }
        });
    }
    // Display the fetched recipe
    function displayRecipe(recipe) {
        recipeContainer.innerHTML = '';
        const recipeTitle = document.createElement('h1');
        recipeTitle.className = 'recipe-title';
        recipeTitle.textContent = recipe.strMeal;
        recipeContainer.appendChild(recipeTitle); // Display title
        const recipeInstructions = document.createElement('p');
        recipeInstructions.className = 'recipe-instructions';
        recipeInstructions.textContent = recipe.strInstructions;
        recipeContainer.appendChild(recipeInstructions); // Display instructions
        const recipeImage = document.createElement('img');
        recipeImage.className = 'recipe-image';
        recipeImage.src = recipe.strMealThumb;
        recipeImage.alt = recipe.strMeal;
        recipeImage.style.width = '350px';
        recipeContainer.appendChild(recipeImage); // Display image
    }
});
