import {Action} from './action';
import {Ingredient} from './ingredient';

export class Recipe {
  name: string;
  comment: string;
  actions: Action[];

  constructor(name: string, comment: string, actions: Action[]) {
    this.name = name;
    this.comment = comment;
    this.actions = actions;
  }
  deepCopy() {
    let R: Recipe;
    let A: Action[];

    this.actions.forEach((a, aIndex) => {
      let I: Ingredient[];
      this.actions[aIndex].ingredients.forEach((i, iIndex) => {
        I.push(i);
      });
      A.push(new Action(a.name, a.comment, I));
    });
    R = new Recipe(this.name, this.comment, A);
    return R;
  }
}
