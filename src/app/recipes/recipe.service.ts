import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel', 'A super tasty Schnitzel',
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Potato Salad', 1)
            ]
        ),
        new Recipe('Big Fat Burger', 'What else do you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/0/07/2016-08-03_Greek_Hummus_Burger_in_Beijing_anagoria.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
      )
    ];

    constructor() {}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}