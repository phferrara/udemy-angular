import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test recipe', 'this is a test',
    'https://upload.wikimedia.org/wikipedia/commons/6/6b/Mille-feuille_20100916.jpg'
  )
  ];
  constructor() { }

  ngOnInit() {
  }

}
