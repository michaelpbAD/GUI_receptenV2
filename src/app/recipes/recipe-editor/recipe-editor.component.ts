import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit {

  editForm: FormGroup;

  Rule = /\./;

  constructor() { }

  ngOnInit() {
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

  valid(control: FormControl): {[s: string]: boolean} {
    if (!this.Rule.test(control.value)) {
      return{'invalidFormat' : true};
    }
    return null;
  }

  onSave(form) {
    console.log(form);
  }

  getAction(form) {
    return form.controls.actions.controls;
  }
  getIngredients(form) {
    return form.controls.ingredients.controls;
  }




}
