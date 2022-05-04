import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpEvent,HttpHeaders,HttpParams,HttpRequest   } from '@angular/common/http';
import { Admin } from '../Model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  url=environment.hostUrl;
  Admin:Admin=new Admin();
  tab:any=[];
  public curAdmin= new BehaviorSubject([this.Admin]);
  sharedAdmin = this.curAdmin.asObservable();
  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post(this.url+"user/login",data);
  }

  connect(): Observable<Admin[]>{
    let accessTOken=localStorage.getItem("AccessToken");
  
      return this.http.get<Admin[]>(this.url+"user/connect",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})
   

  }

  data(): Observable<Admin[]>{
    let accessTOken=localStorage.getItem("AccessToken");
      return this.http.get<Admin[]>(this.url+"user/all",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})
  }

  delete(id:Number){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.delete(this.url+"user/delete/"+id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)});
  }

  update(id:Number,data:any){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.put(this.url+"user/edit/"+id,data,{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)});
  }

  getById(id:number): Observable<Admin>{
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.get<Admin>(this.url+'user/'+id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }
}
