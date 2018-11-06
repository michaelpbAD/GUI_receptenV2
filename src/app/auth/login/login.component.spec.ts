import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { By } from '@angular/platform-browser';
import {BackendService} from '../../backend.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;

  // als je de router nodig hebt, moet je eigenlijk enkel nagaan of de navigatie naar het juiste pad gebeurt => routerSpy maken
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  class MockBackendService {
    editId = 0;
    saved = true;
  }

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy},   // de routerSpy als Router service gebruiken ipv de mockRouter
        {provide: BackendService, useValue: MockBackendService},
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    authService = fixture.debugElement.injector.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login successfull ==> invalidLogin === false', async(() => {
    // omdat je met een reactive form werkt, wordt de form variabele aangemaakt in de ngOnInit van je component
    // => oproepen voor je iets anders doet
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    component.onLogin();
    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(false);
    });
  }));

  it('login unsuccessfull ==> invalidLogin === true', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    component.onLogin();
    fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBe(true);
    });
  }));

  it('login unsuccessfull ==> <div>Invalid email and/or password.</div>', fakeAsync(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    fixture.detectChanges();          // nodig om de databinding tussen typescript en HTML te doen (onInit)
    component.onLogin();
    tick();                           // beëindigd alle asynchrone taken (kan hier want delay in promise is 0)
    fixture.detectChanges();          // na beëindigen van asynchrone onLogin nog eens databinding doen
    const compiled = fixture.debugElement.nativeElement;    // template renderen
    expect(compiled.querySelector('div').textContent).toContain('Invalid email and/or password.');
  }));

  it('login successfull ==> NOT Contain <div>Invalid email and/or password.</div>', fakeAsync(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    component.onLogin();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).not.toContain('Invalid email and/or password.');
  }));

  it('login successfull (form submit) ==> NOT Contain(<div>Invalid email and/or password.</div>)', async(() => {
    component.ngOnInit();
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);            // submit form
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div').textContent).not.toContain('Invalid email and/or password.');
    });
  }));
});
