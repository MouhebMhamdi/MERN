import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpEvent,HttpHeaders,HttpParams,HttpRequest   } from '@angular/common/http';
import { Market } from '../Model/ImagesMarket';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url=environment.hostUrl;
  market:Market=new Market();
  tab:any=[];
  public curAdmin= new BehaviorSubject([this.market]);
  sharedAdmin = this.curAdmin.asObservable();
  constructor(private http:HttpClient) { }


  data(): Observable<Market[]>{
    let accessTOken=localStorage.getItem("AccessToken");
      return this.http.get<Market[]>(this.url+"market/all",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})
  }


  update(id:Number,data:any){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.put(this.url+"market/update/"+id,data,{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }

  nbrUsers(){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.get<number>(this.url+"user/nbrUser",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }
  nbrAdmins(){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.get<number>(this.url+"user/nbrAdmin",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }
  nbrProducts(){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.get<number>(this.url+"user/nbrProduct",{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }

  age(age:number){
    let accessTOken=localStorage.getItem("AccessToken");
    return this.http.get<number>(this.url+"user/Age/"+age,{ headers: new HttpHeaders().set('Authorization', `Bearer ${accessTOken}`)})

  }
}
