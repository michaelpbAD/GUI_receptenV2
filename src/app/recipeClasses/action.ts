import {Ingredient} from './ingredient';

export class Action {
  name: string;
  comment: string;
  ingredients: Ingredient[];

  constructor(name: string, comment: string, ingredients: Ingredient[]) {
    this.name = name;
    this.comment = comment;
    this.ingredients = ingredients;
  }
}
