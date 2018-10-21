import {Action} from './action';

export class Recipe {
  id: number;
  name: string;
  comment: string;
  actions: Action[];
}
