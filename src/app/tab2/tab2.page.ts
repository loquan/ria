import { OnInit,Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { CurrencyService } from '../api/currency.service';

import {
  ChartErrorEvent,
  ChartMouseLeaveEvent,
  ChartMouseOverEvent,
  ChartSelectionChangedEvent,
  ChartType,
  Column
} from 'angular-google-charts';


declare var google: any;



interface chartStruct {
  title: string;
  type:string;
  data: any[];
  columns:string[] ;
  

}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page  implements OnInit{
 
  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  };

  data : any;

 


  bars: any;
  colorArray: any;
  
  
  chart:chartStruct;
  myType:string;
  myData:any[];
  selectCountry:string;
  
  
  constructor(private service: CurrencyService,private ref:ChangeDetectorRef,) {
 
    //https://github.com/FERNman/angular-google-charts/blob/master/apps/playground/src/app/main/main.component.ts
  // this.service.countryMessage.subscribe( result =>{
  //     this.selectCountry=result;
  //     alert("received country 1"+result);
  // });
  this.charts={
    title: 'Currency',
    type: ChartType.AreaChart,
    columns: ['Date', this.selectCountry],
    data: [["",0]]
  };
  


  
  }
  
  countryUpdate(currentCountry){

    let dataInfo = [] ;
    alert("update country"+currentCountry) ;
    console.log("update country"+currentCountry);
    console.log("data updated"+this.data);
    if(this.data!=null) 
    {  
      
       
       if(currentCountry==null) 
           currentCountry='USD';
       
       for( let key in this.data.rates)  
       {
         dataInfo.push([key,this.data.rates[key][currentCountry]]);
       }
   
       this.charts={
         title: 'Currency',
         type: ChartType.AreaChart,
         columns: ['Date', this.selectCountry],
         data: dataInfo
       };

       setTimeout(()=>{
       

       },2000);
       
       
 
    }

  }

  ngOnInit(){


    this.service.countryMessage.subscribe( result =>{
      this.selectCountry=result;
      this.countryUpdate(this.selectCountry);
      
    });

    this.service.currencyMessage.subscribe( result =>{
    
      this.data=result;    
      this.countryUpdate('USD'); 
         
   
       
     })
      
   

  }

  public onReady() {
    console.log('Chart ready');
  }

  public onError(error: ChartErrorEvent) {
    console.error('Error: ' + error.message.toString());
  }

  public onSelect(event: ChartSelectionChangedEvent) {
    console.log('Selected: ' + event.toString());
  }

  public onMouseEnter(event: ChartMouseOverEvent) {
    console.log('Hovering ' + event.toString());
  }

  public onMouseLeave(event: ChartMouseLeaveEvent) {
    console.log('No longer hovering ' + event.toString());
  }



  public changeChart() {
  
  }

  public navigateToTest() {
 
  }

}
