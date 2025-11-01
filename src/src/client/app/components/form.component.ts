import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// ajm: reactive
// ajm: template
// ajm:   - NGModel 
// ajm:   - NGControlGroup 

export class Model {
  public name!: string;
}

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: "ajm-form",
  template: `
<div style="user-select: none;">
  <div style="margin: 10px;" [hidden]="submitted1">
    <h1>Form 1: template driven</h1>
    <form style="width: 200px;" (ngSubmit)="onSubmit1()" #form="ngForm">
      <div style="margin: 10px;">
        <label for="name1">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter name ..." required [(ngModel)]="model.name" #name="ngModel">
        <div style="background-color: var(--red); padding: 5px; margin: 5px;" [hidden]="name.valid || name.pristine">Name is required</div>
      </div>
      <div style="display: flex; justify-content: right;">
        <button type="submit" [disabled]="!form.form.valid">Submit 1</button>
      </div>
    </form>
  </div> 
  <div style="margin: 10px;" [hidden]="!submitted1">
    <h1>Form 1 Submitted:</h1>
    {{JSON.stringify(this.model)}}
  </div>
  
  <div style="margin: 10px;" [hidden]="submitted2">
    <h1>Form 2: reactive</h1>
    <form style="width: 200px;" [formGroup]="this.formReactive" (ngSubmit)="onSubmit2(formReactive)">
      <div style="margin: 10px;">
        <label>Name</label>
        <input formControlName="name" placeholder="Enter name ..." required>
        <div style="background-color: var(--red); padding: 5px; margin: 5px;" [hidden]="name.valid || name.pristine">Name is required</div>
      </div>
      <div style="display: flex; justify-content: right;">
        <button type="submit">Submit 2</button>
      </div>
    </form>
  </div>
  <div style="margin: 10px;" [hidden]="!submitted2">
    <h1>Form 2 Submitted:</h1>
    {{JSON.stringify(this.formReactive.value)}}
  </div>`,
styles:   []
})
 
export class FormComponent {
  public JSON = JSON;
  
  // ajm: form 1
  public model = new Model();
  public submitted1 = false;

  public onSubmit1() { this.submitted1 = true; }

  // form 2
  public formReactive: FormGroup = new FormGroup({
    name: new FormControl("")
  });
  public submitted2 = false;

  public onSubmit2(form: FormGroup) { 
    if (form.valid) {
      this.submitted2 = true;
    }
  }
}
