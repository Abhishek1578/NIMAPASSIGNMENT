import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'profile',component:UserProfileComponent},
  {path:'',redirectTo:'home', pathMatch:'full'}
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
