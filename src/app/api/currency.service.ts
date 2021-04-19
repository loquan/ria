import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currency = new BehaviorSubject<any> (null);
  currencyMessage = this.currency.asObservable();
 

  country = new BehaviorSubject<any> (null);
  countryMessage = this.country.asObservable();


  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*'     })
  };


  constructor(private http: HttpClient) { 
    

  }
  
  
  getDate(start_date:string,end_date:string){
    //order by name

    
    console.log("service get start");
     this.http.get<any[]>('http://api.ratesapi.io/api/history?start_at=' + start_date+'&end_at='+end_date ).subscribe( result =>{

        console.log("service get");
        console.log(result);

     }


     ) ;
  
   }
}
