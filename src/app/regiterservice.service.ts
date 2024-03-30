import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function imageDimensionValidator(control: AbstractControl): { [key: string]: any } | null {
  const file = control.value as File;
  const maxDimension = { width: 310, height: 325 };

  return new Promise(resolve => {
    if (file) {
      const avatar = new Image();
      avatar.onload = () => {
        if (avatar.width !== maxDimension.width || avatar.height !== maxDimension.height) {
          resolve({ 'invalidImageDimension': { value: control.value } });
        } else {
          resolve(null);
        }
      };
      avatar.src = URL.createObjectURL(file);
    } else {
      resolve(null);
    }
  });
}

@Injectable({
  providedIn: 'root'
})

export class RegiterserviceService {
registerForm:any;
  constructor(private form:FormBuilder) {
    this.registerForm=this.form.group({
      avatar:[''],
      firstname: ['abhishek', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastname: ['', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/)]],
      age: ['', [Validators.required ]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      add1: ['', Validators.required],
      add2: ['', Validators.required], 
      tags: ['',[Validators.required]], 
      subscribeNewsletter: ['',Validators.required]
    })
   }

  
}
