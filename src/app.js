document.addEventListener('DOMContentLoaded', () => {
  var getRecipeBtn = document.getElementById('getRecipeBtn')
  var recipeContainer = document.getElementById('recipeContainer')
  var recipeVisiting = document.querySelector('#header')

  getRecipeBtn.addEventListener('click', () => {
    fetchRecipe()
  })

  function fetchRecipe() {
    try {
      recipeVisiting.innerHTML = 'Here is your Recipe'
      recipeVisiting.style.color = 'blue'

      const recipe = {
        title: 'Spaghetti Carbonara',
        instructions:
          '1. Cook spaghetti according to package instructions. 2. In a separate pan, cook pancetta until crispy. 3. In a bowl, whisk eggs and grated cheese. 4. Combine spaghetti, pancetta, and egg mixture, stirring quickly. 5. Serve immediately with additional cheese and black pepper.',
        image: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg'
      }
      displayRecipe(recipe)
    } catch (error) {
      console.log('Where is the error?:', error)
      recipeContainer.innerHTML = '<p>Are you failed to load receipt. Please try again amateur.</p>'
    }
  }

  function displayRecipe(recipe) {
    recipeContainer.innerHTML = ''

    var recipeTitle = document.createElement('h1')
    recipeTitle.className = 'recipe-title'
    recipeTitle.textContent = recipe.title
    recipeContainer.appendChild(recipeTitle) //display title

    var recipeInstructions = document.createElement('p')
    recipeInstructions.className = 'recipe-instructions'
    recipeInstructions.textContent = recipe.instructions
    recipeContainer.appendChild(recipeInstructions) //display instructions

    var recipeImage = document.createElement('img')
    recipeImage.className = 'recipe-image'
    recipeImage.src = recipe.image
    recipeImage.alt = recipe.title
    recipeImage.style.width = '150px'
    recipeContainer.appendChild(recipeImage) //display image
  }
})
