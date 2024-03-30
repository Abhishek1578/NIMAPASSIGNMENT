import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import { MatDialog,  } from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { RegiterserviceService } from '../regiterservice.service';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isRegistrationUpdated=false;
  result:any;
  data1:any;
  lastItem:any;
  ress:any;
  registerData:any;
  userData:any;
  updateRegisterData:any;
  
  constructor(
    private data:DataSharingService,
    private router:Router,
    private dialog:MatDialog,
    private registerService:RegiterserviceService,
    private snackBar:MatSnackBar,
    private location:Location,
    ){}
  ngOnInit(): void {
    this.getAllUsers();
  } 
  getAllUsers(){
    this.data.getRegisterData().subscribe((res)=>{
      if(Array.isArray(res) && res.length>0){
        this.result=res[res.length-1];
        console.log("Last Users is "+this.result);
      }else{
        console.log("NO User Found");
      }
      
    });
  }
  getUserById(id:any){
    this.data.getUserById(id).subscribe((data)=>{
      console.log(data);
      this.openDialogBox();
      this.registerService.registerForm.patchValue({
        avatar:[data.avatar],
        firstname:[data.firstname,[Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        lastname:[data.lastname,[Validators.required,Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
        email:[data.email],
        phonenumber:[data.phonenumber],
        age:[data.age],
        country:[data.country],
        state:[data.state],
        add1:[data.add1],
        add2:[data.add2],
        tags:[data.tags],
        subscribeNewsletter:[data.subscribeNewsletter],
      });
      this.data.deleteUserById(id).subscribe((data)=>{
        console.log(data)
      })
    })
    this.router.navigate(['/profile']);
  }

  openDialogBox():void{
    const dialogRef = this.dialog.open(UserRegisterComponent, {
      width:'700px',height:'700px',
      data: { isUpdate: this.isRegistrationUpdated }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'updated') {
        this.isRegistrationUpdated = true;
      }
    });
  }
}
