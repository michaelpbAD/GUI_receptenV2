import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../../backend.service';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';
import {Action} from '../../recipeClasses/action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../recipeClasses/recipe';
import {Ingredient} from '../../recipeClasses/ingredient';
import {CanComponentDeactivate} from '../../can-deactivate.guard';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-editer',
  templateUrl: './recipe-editer.component.html',
  styleUrls: ['./recipe-editer.component.css']
})
export class RecipeEditerComponent implements OnInit, OnDestroy, CanComponentDeactivate {


  editForm: FormGroup;
  _ID: number;
  saveError = false;
  saved = true;
  show = false;
  idSubs: Subscription;
  formSubs: Subscription;
  changeSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.idSubs = this.route.paramMap.subscribe(
      (params: Params) => {
        this._ID = params.get('id');
        this.setEditData();

        this.setForm(this.backendService.editData);

        if (!this.show) {
          this.onFormChanges(this.editForm);
        }
        this.show = true;
        setTimeout(() => {
          this.backendService.setEditForm(this.editForm);
        }, 10);
      }
    );
    this.formSubs = this.backendService.editFormSubject.subscribe(
      (form: FormGroup) => {
        this.editForm = form;
      }
    );
  }
  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
    this.formSubs.unsubscribe();
    this.changeSubs.unsubscribe();
  }

  // init
  initForm() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'comment': new FormControl(null, [Validators.required]),
      'actions': new FormArray([this.initAction()])
    });
  }
  initAction() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'comment': new FormControl('', ),
      'ingredients': new FormArray([this.initIngredients()])
    });
  }
  initIngredients() {
    return new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'unit': new FormControl('', ),
      'quantity': new FormControl(null, [Validators.required])
    });
  }

  // add
  addAction() {
    const control = <FormArray>this.editForm.get('actions');
    control.push(this.initAction());
  }
  addIngredients(i) {
    const control = <FormArray>this.editForm.get(['actions', i, 'ingredients']);
    control.push(this.initIngredients());
  }

  // insert
  insertAction(i) {
    const control = <FormArray>this.editForm.get('actions');
    control.insert(i, this.initAction());
  }
  insertIngredients(i, j) {
    const control = <FormArray>this.editForm.get(['actions', i, 'ingredients']);
    control.insert(j, this.initIngredients());

  }

  // del
  delAction(a) {
    const control = <FormArray>this.editForm.get('actions');
    control.removeAt(a);
  }
  delIngredients(a, i) {
    const control = <FormArray>this.editForm.get(['actions', a, 'ingredients']);
    control.removeAt(i);
  }

  // get
  getActions(form) {
    return form.controls.actions.controls;
  }
  getIngredients(form) {
    return form.controls.ingredients.controls;
  }

  onFormChanges(form): void {
    this.changeSubs = form.valueChanges.subscribe(val => {
      this.backendService.setEditForm(form);
      this.saved = false;
    });

    // this.editForm.controls['name']
    //   .valueChanges
    //   .debounceTime(1000)
    //   .distinctUntilChanged()
    //   .subscribe(val => {
    //     this.backendService.setEditForm(this.editForm);
    //   });
  }
  setEditData() {
    if (this._ID >= 0 && this._ID < this.backendService.data.length) {
      this.backendService.editData = new Recipe(
        this.backendService.data[this._ID].name,
        this.backendService.data[this._ID].comment,
        this.backendService.data[this._ID].actions).deepCopy();
    } else {
      const I = new Ingredient('Ingredient base', 'g', 1);
      const A = new Action('Action base', 'Action comment', [I]);
      this.backendService.editData = new Recipe('Recipe base', 'Recipe comment', [A]);
    }
  }
  setForm(recipe: Recipe) {
    // init form
    this.editForm = this.initForm();

    // form op groote zeten
    this.delAction(0);
    recipe.actions.forEach((action, a) => {
      this.addAction();
      action.ingredients.forEach((ingredient, i) => {
        if (i !== 0) {
          this.addIngredients(a);
        }
      });
    });

    // set values
    this.editForm.setValue(recipe);
  }

  onSave(form) {
    console.log(form);

    this.backendService.editData = form.value;
    if (this._ID >= 0 && this._ID < this.backendService.data.length) {
      this.backendService.data[this._ID] = new Recipe(
        this.backendService.editData.name,
        this.backendService.editData.comment,
        this.backendService.editData.actions).deepCopy();
      console.log('SAVED as ', this._ID);
    } else {
      this._ID = this.backendService.data.push(this.backendService.editData);
      this._ID--;
      console.log('SAVED push');
    }
    this.saved = true;

    this.backendService.saved = false;
    this.backendService.editId = this._ID;

    this.backendService.storeRecipes(this.backendService.data).subscribe(
      (respons) => {
        console.log(respons);
        this.saveError = false;
        this.backendService.saved = true;
        this.router.navigate(['recipe', this._ID]);
      },
      (error) => {
        console.log(error);
        this.saveError = true;
        if (error.error['error'] === 'Auth token is expired') {
          this.authService.logout();
          this.router.navigate(['login' ]);
        }
      }
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.saved === false) {
      return confirm('do you want to leave this page without saving?');
    }
    if (this.backendService.saved === false) {
      return confirm('do you want to leave this page without saving to server?');
    }
    return true;
  }
}
