document.addEventListener('DOMContentLoaded', () => {
  // Define types for recipe data
  interface Recipe {
    strMeal: string
    strInstructions: string
    strMealThumb: string
  }

  // Get HTML elements
  const recipeCont = document.getElementsByTagName('header')[0] as HTMLElement
  const recipeVisiting = document.querySelector('#h1_header') as HTMLElement
  const getRecipeBtn = document.getElementById('getRecipeBtn') as HTMLElement
  const recipeContainer = document.getElementById('recipeContainer') as HTMLElement
  const recipeLink: string = 'https://www.themealdb.com/api/json/v1/1/random.php'

  // Add event listener to the button
  getRecipeBtn.addEventListener('click', () => {
    fetchRecipe()
  })

  // Fetch a random recipe from the API
  async function fetchRecipe(): Promise<void> {
    try {
      recipeVisiting.innerHTML = 'Here is your Recipe'
      recipeVisiting.style.color = 'blue'
      recipeCont.style.backgroundColor = 'yellow'

      const response: Response = await fetch(recipeLink)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: { meals: Recipe[] } = await response.json()
      if (data.meals.length === 0) {
        throw new Error('No meals found')
      }
      const recipe: Recipe = data.meals[0]
      displayRecipe(recipe)
    } catch (error) {
      console.error('Error:', error)
      recipeContainer.innerHTML = '<p>Failed to load recipe. Please try again.</p>'
    }
  }

  // Display the fetched recipe
  function displayRecipe(recipe: Recipe): void {
    recipeContainer.innerHTML = ''

    const recipeTitle = document.createElement('h1')
    recipeTitle.className = 'recipe-title'
    recipeTitle.textContent = recipe.strMeal
    recipeContainer.appendChild(recipeTitle) // Display title

    const recipeInstructions = document.createElement('p')
    recipeInstructions.className = 'recipe-instructions'
    recipeInstructions.textContent = recipe.strInstructions
    recipeContainer.appendChild(recipeInstructions) // Display instructions

    const recipeImage = document.createElement('img')
    recipeImage.className = 'recipe-image'
    recipeImage.src = recipe.strMealThumb
    recipeImage.alt = recipe.strMeal
    recipeImage.style.width = '350px'
    recipeContainer.appendChild(recipeImage) // Display image
  }
})
