import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

   public deleteItem: {name: string, done: boolean}[] = [];

   public newTask; 

   constructor(private router: Router, private dataService: DataService, private httpClient: HttpClient) { 
     this.updateScreen();
   }

  ngOnInit(): void {
    
  }


  public ItemDetail(index){

     this.router.navigate(['/details',index,2]);
   }

   
  public FinalDelete(index)
   {
    this.dataService.delTask2(index).subscribe((response)=>{
      console.log('response:',response);
      this.updateScreen();
    }) 
   }



  public updateScreen()
  {
  this.dataService.getHistory().subscribe((response: any)=>{
    console.log('response: ',response);
    this.deleteItem = response;
  })
  }

}
