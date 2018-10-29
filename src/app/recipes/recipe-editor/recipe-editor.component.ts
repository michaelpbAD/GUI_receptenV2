import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Recipe} from '../../recipeClasses/recipe';
import {Ingredient} from '../../recipeClasses/ingredient';
import {Action} from '../../recipeClasses/action';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit {

  editForm: FormGroup;
  _ID: number;

  Rule = /\./;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'comment': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'actions': new FormArray([this.initAction()])
    });

    this.route.paramMap.subscribe(
      (params: Params) => {
        this._ID = params.get('id');
        this.setEditData();
      }
    );
  }
  initAction() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'comment': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'ingredients': new FormArray([this.initIngredients()])
    });
  }
  initIngredients() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'unit': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'quantity': new FormControl(null, [Validators.required, this.valid.bind(this)])
    });
  }
  addAction() {
    const control = <FormArray>this.editForm.get('actions');
    control.push(this.initAction());
  }
  addIngredients(i, j) {
    const control = <FormArray>this.editForm.get(['actions', i, 'ingredients']);
    control.insert(j, this.initIngredients());
  }
  insertAction(i) {
    const control = <FormArray>this.editForm.get('actions');
    control.insert(i, this.initAction());
  }
  insertIngredients(i) {
    const control = <FormArray>this.editForm.get(['actions', i, 'ingredients']);
    control.push(this.initIngredients());
  }
  delAction(a) {
    const control = <FormArray>this.editForm.get('actions');
    control.removeAt(a);
  }
  delIngredients(a, i) {
    const control = <FormArray>this.editForm.get(['actions', a, 'ingredients']);
    control.removeAt(i);
  }
  getAction(form) {
    return form.controls.actions.controls;
  }
  getIngredients(form) {
    return form.controls.ingredients.controls;
  }
  valid(control: FormControl): {[s: string]: boolean} {
    if (!this.Rule.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }

  setEditData() {
    console.log('_ID', this._ID);
    if (this._ID >= 0 && this._ID < this.backendService.data.length) {
      this.backendService.editData = this.backendService.data[this._ID].deepCopy();
    } else {
      const I = new Ingredient('Ingredient base', 'g', 1);
      const A = new Action('Action base', 'Action comment', [I]);
      this.backendService.editData = new Recipe('Recipe base', 'Recipe comment', [A]);
    }
    this.editForm.setValue(this.backendService.editData);
  }

  onSave(form) {
    console.log(form);
    this.backendService.editData = form.value;
    if (this._ID >= 0 && this._ID < this.backendService.data.length) {
      this.backendService.data[this._ID] = this.backendService.editData.deepCopy();
      console.log('SAVED as ', this._ID);
    } else {
      this.backendService.data.push(this.backendService.editData);
      console.log('SAVED push');
    }
    this.backendService.storeRecipes(this.backendService.data).subscribe(
      (respons) => console.log(respons),
      (error) => console.log(error)
    );
  }
}
