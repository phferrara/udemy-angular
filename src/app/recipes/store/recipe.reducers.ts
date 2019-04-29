import { Recipe } from '../recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from 'app/store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}
export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {

    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
          return {
            ...state,
            recipes: [...action.payload]
          };
        case (RecipeActions.ADD_RECIPE):
          return {
            ...state,
            recipes: [...state.recipes, action.payload]
          };
        case (RecipeActions.UPDATE_RECIPE):
          const recipe = state.recipes[action.payload.index];
          const updatedRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
          };
          const recipes = [...state.recipes];
          recipes[action.payload.index] = updatedRecipe;
          return {
            ...state,
            recipes: recipes
          };
        case (RecipeActions.DELETE_RECIPE):
          const oldRecipes = [...state.recipes];
          oldRecipes.splice(action.payload, 1);
          return {
            ...state,
            recipes: oldRecipes
          };
        default:
          return state;
    }
}