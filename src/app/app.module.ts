import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {MatSliderModule} from '@angular/material/slider'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import { DataSharingService } from './data-sharing.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserProfileComponent,
    HomeComponent,
    FooterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule
  
  
    
    
    
    

  ],
  providers: [DataSharingService,{
    provide: MatDialogRef,
    useValue: {}
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
