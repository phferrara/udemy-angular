import { Injectable } from "@angular/core";
import { Response } from '@angular/http';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        return this.httpClient.put(
            'https://ng-recipe-book-9885f.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {reportProgress: true});
    }

    getRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-9885f.firebaseio.com/recipes.json')
          .map(
            (recipes) => {
              for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                  recipe['ingredients'] = [];
                }
              }
              return recipes;
            }
          )
          .subscribe(
            (recipes: Recipe[]) => {
              this.recipeService.setRecipes(recipes);
            }
          );
      }
}
