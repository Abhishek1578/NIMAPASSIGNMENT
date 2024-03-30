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
// interface Country {
//   name: string;
//   states: string[];
// }
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit  {

  
  isEdit!:boolean;
  states!: any[];
  countries !:any[];
  // states:any=[];
  // selectedCountry!:string;

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






  onCountryChange(country:any){
  this.states=this.dataSharing.state().filter((e)=>e.id == country.target.value);
  console.log(this.states);
  }


   ngOnInit(): void {
        this.countries=this.dataSharing.country();
        console.log(this.countries);


        //this is validation of register form 
        this.registerForm=this.formBuilder.group({
        avatar:['',[Validators.required]],
        firstname: ['', [Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
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
    // const img=new Image();
    // img.onload=()=>{
      // if(img.width !==310 || img.height !==325){
      //   alert("Image size must be 310x325 pixels");
      //   return;
      // }
      // };
    //   img.src=URL.createObjectURL(file);
    // }
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
