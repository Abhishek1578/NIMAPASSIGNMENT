import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';


  export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit  {

  
  countries = ['India', 'United States of America','Canada','Australia']; // Sample countries data
  states: { [key: string]: string[] } = {
    'India': ["Andhra Pradesh", "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur", "Meghalaya","Mizoram", "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura", "Uttar Pradesh","Uttarakhand","West Bengal"],
    'United States of America': ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia","Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland","Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire","New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania","Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington","West Virginia", "Wisconsin", "Wyoming"],
    'Canada': ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario","Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"],
    'Australia': ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia","Tasmania", "Australian Capital Territory", "Northern Territory"],
  };
  isEdit!:boolean;
  // states!: any[];
  // countries !:any[];

  selectedFile:File | null=null;
  selectedField!:string;
  countryCode!:any[];
  users!:any[]
  registerFrom!:FormGroup;
  
  registerForm!:FormGroup;
  showAddressDropdown=false;

  constructor(
    private formBuilder: FormBuilder,
    private dataSharing:DataSharingService,
    private http:HttpClient,
    private router:Router,
    private dialogRef:MatDialogRef<UserRegisterComponent>,
    private snackBar:MatSnackBar) {
   }

   addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }
    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }




   ngOnInit(): void {
        //this is validation of register form 
        this.registerForm=this.formBuilder.group({
        avatar:['',[Validators.required]],
        firstname: ['', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        lastname: ['', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        phonenumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?((\(\d{3}\))|\d{3})[- .]?\d{3}[- .]?\d{4}$/)]],
        age: ['', [Validators.required ]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        add1: ['', Validators.required],
        add2: ['', Validators.required], 
        tags: ['',[Validators.required]], 
        subscribeNewsletter: ['',Validators.required]
  })
   }

   get country() {
    return this.registerForm.get('country');
  }

  get state() {
    return this.registerForm.get('state');
  }

   onFieldChange(field:string):void{
    this.selectedField=field;
   }

   toggleAddressDropdown(){
    this.showAddressDropdown!=this.showAddressDropdown;
   }
   

 

  //this is event listener on register button

  onSubmit(formData:any){
    if(this.registerForm.valid)
    { 
      this.dataSharing.setRegisterData(formData).subscribe((res)=>{
        debugger
        console.log(res);
        this.users=res;
        this.snackBar.open("Registration Successfull...!",'ok',{
          duration:3000,
          verticalPosition:'top',
        })
        this.dialogRef.close();
      });
      this.router.navigate(['/profile'])
    }
  }

  onCountryChange() {
    // Reset state value when country changes
    this.state?.setValue(''); 
  }
  // it is used for cancel button
  cancel():void{
    this.dialogRef.close();
  }


  // it is use for age 
  formatLabel(value: number):string {
    return value.toString();
  }


  //this is image access in assets file in 
  urlink:string="assets/th.jpg/";
  base64Output!:String;
  onSelectFiles(event:any){
  if(event.target.files && event.target.files.length>0){
    const file=event.target.files[0];
    this.converToBase64(file);

  }
  }

  avatar!:string;
  converToBase64(file:File){
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event:any)=>{
      this.urlink=event?.target.result
      this.registerForm.patchValue({
        avatar:reader.result as string,
      });
    };

  }


  isUpdate(): boolean{
   return this.dataSharing.getIsEditingProfile();
  }

  onUpload(){

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString().split(',')[1];
        this.dataSharing.setRegisterData(base64Data!).subscribe(
          response => {
            console.log('Image uploaded successfully:', response);
          },
          error => {
            console.error('Error uploading image:', error);
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
