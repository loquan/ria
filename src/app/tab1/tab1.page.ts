import { Component } from '@angular/core';

import { CurrencyService } from '../api/currency.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

interface currencyStruct {
    countryString:string;
    rateNum:number;
    total:number;
    eur:number;
    countryNum:number;
    
}
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
  amount:number=200;
  currencyData: any[]=[];
  
  dateRange:string[]; 
  router: Router;
  countries:string[]=[];
  total:number[]=[];
  rateNumber:number[]=[];
  eur:string[]=[];
  countryNum:string[]=[];
  


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
       
        this.http.get<any[]>('https://api.ratesapi.io/api/history?start_at=2021-02-24&end_at=2021-03-17').subscribe(
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
                     let rate=parseFloat(data['rates'][key][countryKey]);
                     this.countries[loop]=countryKey;
                     this.rateNumber[loop]=rate;
                     this.countryNum[loop]=rate.toFixed(5);       
                     this.total[loop]=this.amount*rate;                  
                     this.eur[loop]=(1/rate).toFixed(5);
                     
                      loop++;
                  }
               }
               count++;
                  
              }
              console.log("country:"+this.currencyData); 
    
          }) 
          
     
     




    
    


  }

selectCountry(country){
  
  this.service.country.next(country);  
  
 
 this.router.navigateByUrl('tabs/tab2');
}  

keyup(event){
  
  if(event.keyCode==13){
    alert("amount:"+this.amount);

    for(let i=0;i<this.rateNumber.length;i++)
    {
      this.total[i]=this.rateNumber[i]*this.amount;
    }
    

  }
  


}

}
