import {Action} from './action';
import {Ingredient} from './ingredient';

export class Recipe {
  name: string;
  comment: string;
  actions: Action[];

  constructor(name: string = null, comment: string = null, actions: Action[] = [new Action()]) {
    this.name = name;
    this.comment = comment;
    this.actions = actions;
  }
  deepCopy() {
    let R: Recipe;
    const A: Action[] = [];

    this.actions.forEach((a, aIndex) => {
      const I: Ingredient[] = [];
      this.actions[aIndex].ingredients.forEach((i, iIndex) => {
        I.push(i);
      });
      A.push(new Action(a.name, a.comment, I));
    });
    R = new Recipe(this.name, this.comment, A);
    return R;
  }
}
