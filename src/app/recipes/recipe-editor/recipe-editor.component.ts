import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {BackendService} from '../../backend.service';
import {Recipe} from '../../recipeClasses/recipe';

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
    this.route.paramMap.subscribe(
      (params: Params) => {
        this._ID = params.get('id');
        this.setEditData();
      }
    );

    this.editForm = new FormGroup({
      'id': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'name': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'comment': new FormControl(null, [Validators.required, this.valid.bind(this)]),
      'actions': new FormArray([this.initAction()])
    });
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
  addIngredients(i) {
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
    try {
      this.backendService.editData = this.backendService.data[this._ID];
    } catch (e) {
      this.backendService.editData = new Recipe();
    }
  }

  onSave(form) {
    console.log(form);
    try {
      this.backendService.data[this._ID] = this.backendService.editData;
      console.log('SAVED as ', this._ID);
    } catch (e) {
      this.backendService.data.push(this.backendService.editData);
      console.log('SAVED push');
    }
    this.backendService.storeRecipes(this.backendService.data).subscribe(
      (respons) => console.log(respons),
      (error) => console.log(error)
    );
  }






}
