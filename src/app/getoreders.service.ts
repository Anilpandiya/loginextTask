import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iorderdetails } from './orderdetails';


@Injectable({
  providedIn: 'root'
})

export class GetoredersService {

  private baseUrl = './../assets/orderdetails.json'; 

  constructor( public http :  HttpClient){}
 
  getorders() : Observable<Iorderdetails[]>{
    return this.http.get<Iorderdetails[]>(this.baseUrl)
  }

}
