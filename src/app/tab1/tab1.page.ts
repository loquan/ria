import { Component } from '@angular/core';

import { CurrencyService } from '../api/currency.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

@Injectable({
  providedIn: 'root'
})

export class Tab1Page {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  countries:string[]=[];
  dateRange:string[]; 
  router: Router;
  constructor(private service: CurrencyService,private http: HttpClient,private route:Router) {

    this.router=this.route;
    // this.service.currencyMessage.subscribe(result => {
    // });

    //let data=this.httpClient.get<any[]>(this.url );
    //console.log(data);
    this.search();
     
  }



  search(){


  
        let data; 
       
        this.http.get<any[]>('https://api.ratesapi.io/api/history?start_at=2021-03-01&end_at=2021-03-14').subscribe(
          (data)=>{
              console.log("found");
              console.log(data);
              this.service.currency.next(data);
              let count=0;
              for( let key in data['rates'])  
              {
               if(count==0) 
               {
                  let loop=0;
                  for( let countryKey in data['rates'][key])  
                  {
                     
                      this.countries[loop++]=countryKey;
                  }
               }
               count++;
                    //console.log("country:"+country);
              }
              
    
          }) 

     
     




    
    


  }

selectCountry(country){
  
  this.service.country.next(country);  
  
 
  this.router.navigateByUrl('tabs/tab2');
}  

}
