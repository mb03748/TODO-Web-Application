import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {
  public items: {name: string, done: boolean}[] = [];

  constructor(private router: Router, private dataService: DataService, private httpClient: HttpClient) { 
    this.updateScreen();
  }

  ngOnInit(){}

  /*
  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }

  
     A two-way binding performed which 
       pushes text on division */
    public newTask; 
    

  
  
    /* When input is empty, it will 
       not create a new division */
    public addToList() { 
        if (this.newTask == '') { 
        } 
        else { 

          let postData: Todo = {name: this.newTask, done: false};
          this.dataService.postTask(postData).subscribe((response)=>{
            console.log('response:',response);
            this.updateScreen();
          }) 
          this.newTask = ''; 
        } 
    } 
  
    /* This function takes to input the 
       task, that has to be deleted*/
    public deleteTask(index) { 
      this.dataService.delTask(index).subscribe((response)=>{
        console.log('response:',response);
        this.updateScreen();
      }) 
      
    } 

    public complete(index)
    {
      this.dataService.complete(index).subscribe((response)=>{
        console.log('response:',response);
        this.updateScreen();
      }) 
    }

    public ItemDetail(index){
     /* this.data.name = this.items[index];
      this.data.id = this.ids[index];
      alert(this.ids[index]);
      */

      this.router.navigate(['/details', index, 1]);
    }


    public updateScreen()
    {
    this.dataService.getTasks().subscribe((response: any)=>{
      console.log('response: ',response);
      this.items = response;
    })
    }

  

}
