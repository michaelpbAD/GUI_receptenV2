import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from '../../recipeClasses/ingredient';

@Pipe({
  name: 'unit',
  pure: false
})
export class UnitPipe implements PipeTransform {

  transform(values: Ingredient[], to: string): any {
    if (values.length === 0 ) {
      return values;
    }
    for (const value of values) {
      if (to === 'eu') {
        switch (value.unit) {
          case 'tsp': {
            value.quantity *= 4.92892159;
            value.unit = 'ml';
            break;
          }
          case 'tbsp': {
            value.quantity *= 14.7867648;
            value.unit = 'ml';
            break;
          }
          case 'cup': {
            value.quantity *= 236.588237;
            value.unit = 'ml';
            break;
          }
          case 'grain': {
            value.quantity *= 0.06;
            value.unit = 'g';
            break;
          }
          case 'ounce': {
            value.quantity *= 28.349523125;
            value.unit = 'g';
            break;
          }
          case 'oz': {
            value.quantity *= 28.349523125;
            value.unit = 'g';
            break;
          }
          case 'pound': {
            value.quantity *= 453.59237;
            value.unit = 'g';
            break;
          }
          default: {
            break;
          }
        }
        if ((value.quantity / 1000) >= 1) {
          if (value.unit === 'ml') {
            value.quantity /= 1000;
            value.unit = 'l';
          }
          if (value.unit === 'g') {
            value.quantity /= 1000;
            value.unit = 'kg';
          }
        }
      }
    }
    return values;
  }

}
