export class Ingredient {
  name: string;
  unit: string;
  quantity: number;

  constructor(name: string = null, unit: string = null , quantity: number = null) {
    this.name = name;
    this.unit = unit;
    this.quantity = quantity;
  }
}
