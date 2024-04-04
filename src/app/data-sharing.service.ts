import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private isEditingProfile: boolean = false;
  // private APIurl='https://gist.github.com/Keeguon/2310008';


private registerData:any;
  constructor(private http:HttpClient) { }


  setRegisterData(body: any):Observable<any>{
    return this.http.post('http://localhost:3000/users',body);
  }

  getRegisterData():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  updateRegisterData(id:any,formData:any):Observable<any[]>{
    return this.http.put<any>('http://localhost:3000/users/'+id,formData);
  }
  getUserById(id:any):Observable<any>{
    return this.http.get<any>('http://localhost:3000/users/'+id);
  }

  deleteUserById(id:any):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/users'+id);
  }

  setIsEditingProfile(isEditing: boolean) {
    this.isEditingProfile = isEditing;
  }

  getIsEditingProfile(): boolean {
    return this.isEditingProfile;
  }

 
}
