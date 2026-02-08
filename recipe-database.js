class RecipeDatabase {
  constructor() {
    this.recipes = [];
    this.loadRecipes();
  }

  async loadRecipes() {
    try {
      const stored = localStorage.getItem('recipes');
      if (stored) {
        this.recipes = JSON.parse(stored);
      } else {
        const response = await fetch('recipes.json');
        const data = await response.json();
        this.recipes = data.recipes;
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  }

  addRecipe(recipe) {
    recipe.id = Date.now();
    this.recipes.push(recipe);
    this.saveToStorage();
    return recipe;
  }

  getAllRecipes() {
    return this.recipes;
  }

  searchByName(name) {
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByCuisine(cuisine) {
    return this.recipes.filter(recipe => recipe.cuisine === cuisine);
  }

  filterByDifficulty(difficulty) {
    return this.recipes.filter(recipe => recipe.difficulty === difficulty);
  }

  filterByDietaryCategory(category) {
    return this.recipes.filter(recipe =>
      recipe.dietaryCategories.includes(category.toLowerCase())
    );
  }

  filterByMultipleDietaryCategories(categories) {
    return this.recipes.filter(recipe =>
      categories.every(category =>
        recipe.dietaryCategories.includes(category.toLowerCase())
      )
    );
  }

  filterByCalories(minCalories, maxCalories) {
    return this.recipes.filter(recipe =>
      recipe.nutrition.calories >= minCalories &&
      recipe.nutrition.calories <= maxCalories
    );
  }

  filterByCookingTime(maxMinutes) {
    return this.recipes.filter(recipe => recipe.totalTime <= maxMinutes);
  }

  filterLowSodium(maxSodium = 500) {
    return this.recipes.filter(recipe =>
      recipe.nutrition.sodium <= maxSodium
    );
  }

  filterHighProtein(minProtein = 25) {
    return this.recipes.filter(recipe =>
      recipe.nutrition.protein >= minProtein
    );
  }

  filterHighFiber(minFiber = 10) {
    return this.recipes.filter(recipe =>
      recipe.nutrition.fiber >= minFiber
    );
  }

  getRecipeById(id) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  updateRecipe(id, updates) {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      Object.assign(recipe, updates);
      this.saveToStorage();
    }
    return recipe;
  }

  deleteRecipe(id) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.saveToStorage();
  }

  getAllDietaryCategories() {
    const categories = new Set();
    this.recipes.forEach(recipe => {
      recipe.dietaryCategories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }

  getAllCuisines() {
    return [...new Set(this.recipes.map(r => r.cuisine))].sort();
  }

  saveToStorage() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }
}

const recipeDB = new RecipeDatabase();