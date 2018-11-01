import {Ingredient} from './ingredient';

export class Action {
  name: string;
  comment: string;
  ingredients: Ingredient[];

  constructor(name: string = null, comment: string = null, ingredients: Ingredient[] = [new Ingredient()]) {
    this.name = name;
    this.comment = comment;
    this.ingredients = ingredients;
  }
}
