import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../../../backend.service';
import {AuthService} from '../../../auth/auth.service';
import {debounceTime, take} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-action-editer',
  templateUrl: './action-editer.component.html',
  styleUrls: ['./action-editer.component.css']
})
export class ActionEditerComponent implements OnInit, OnDestroy {

  @Input('index') index: number;
  editForm: FormGroup;
  show = false;
  formSubs: Subscription;
  changeSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.formSubs = this.backendService.editFormSubject.subscribe(
      (form: FormGroup) => {
        console.log('Subscriber got data >>>>> ', form);
        this.editForm = form;
        if (!this.show) {
          this.onFormChanges();
        }
        this.show = true;
      }
    );

  }
  ngOnDestroy(): void {
    this.formSubs.unsubscribe();
    this.changeSubs.unsubscribe();
  }
  onFormChanges(): void {
    this.changeSubs = this.editForm.valueChanges.subscribe(val => {
      this.backendService.setEditForm(this.editForm);
    });

  }
  // init
  initIngredients() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'unit': new FormControl('', ),
      'quantity': new FormControl(null, [Validators.required])
    });
  }
  // add
  addIngredients() {
    this.ingredients.push(this.initIngredients());
  }
  // insert
  insertIngredients(i) {
    this.ingredients.insert(i, this.initIngredients());

  }
  // del
  delAction() {
    this.actions.removeAt(this.index);
  }
  delIngredients( i) {
    this.ingredients.removeAt(i);
  }
  // get
  get Actions() {
    return this.actions.controls;
  }
  get actions() {
    return <FormArray>this.editForm.get('actions');
  }
  get Action() {
    return this.action.controls;
  }
  get action() {
    return <FormArray>this.editForm.get(['actions', this.index]);
  }
  get Ingredients() {
    return this.ingredients.controls;
  }
  get ingredients() {
    return <FormArray>this.editForm.get(['actions', this.index, 'ingredients']);
  }


}
