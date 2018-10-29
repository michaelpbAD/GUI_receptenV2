export class Ingredient {
  name: string;
  unit: string;
  quantity: number;

  constructor(name: string, unit: string, quantity: number) {
    this.name = name;
    this.unit = unit;
    this.quantity = quantity;
  }
}
