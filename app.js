// app.js

// Function to display nutritional information
function displayNutritionalInfo(nutrition) {
    console.log(`Calories: ${nutrition.calories}`);
    console.log(`Protein: ${nutrition.protein}g`);
    console.log(`Fat: ${nutrition.fat}g`);
    console.log(`Carbohydrates: ${nutrition.carbohydrates}g`);
}

// Function to display dietary badges
function displayDietaryBadges(diet) {
    diet.forEach(badge => {
        console.log(`Badge: ${badge}`);
    });
}

// Function to display cooking steps with timings
function displayCookingSteps(steps) {
    steps.forEach(step => {
        console.log(`Step: ${step.instruction} (Time: ${step.time} mins)`);
    });
}

// Function to display recipe details
function displayRecipeDetails(recipe) {
    console.log(`Recipe: ${recipe.name}`);
    console.log(`Description: ${recipe.description}`);
    displayNutritionalInfo(recipe.nutrition);
    displayDietaryBadges(recipe.dietaryBadges);
    displayCookingSteps(recipe.cookingSteps);
}

// Example usage
const exampleRecipe = {
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish.',
    nutrition: {
        calories: 600,
        protein: 25,
        fat: 15,
        carbohydrates: 80
    },
    dietaryBadges: ['High Protein', 'Vegetarian'],
    cookingSteps: [
        { instruction: 'Boil water and cook spaghetti.', time: 10 },
        { instruction: 'Fry pancetta until crispy.', time: 5 },
        { instruction: 'Mix eggs and cheese in a bowl.', time: 5},
        { instruction: 'Combine everything and serve.', time: 2}
    ]
};

displayRecipeDetails(exampleRecipe);