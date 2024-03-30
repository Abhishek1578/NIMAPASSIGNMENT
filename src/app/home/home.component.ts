import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { Router } from '@angular/router';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog:MatDialog,private router:Router){}


openDialog():void{
  let dislogRef=this.dialog.open(UserRegisterComponent,{
    width:'700px',height:'700px'});
    dislogRef.afterClosed().subscribe(sub=>{
      console.log(sub);
    });
  
}

}
 