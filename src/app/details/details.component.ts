import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo';
import { Single } from 'src/app/models/single';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  constructor(private dataService: DataService, private activateRoute: ActivatedRoute, private httpClient: HttpClient) { }

  public item: {name: 'Ali', done: false};
  public dId;


  ngOnInit(): void {
    let ids = this.activateRoute.snapshot.params['id'];
    let num = this.activateRoute.snapshot.params['num'];
    
    if (num == 1)
    {
      this.dataService.getTasks().subscribe((response: any)=>{
        console.log('response: ',response);
        this.item = response[Number(ids)];
      })
    }
    else if (num == 2)
    {
      this.dataService.getHistory().subscribe((response: any)=>{
        console.log('response: ',response);
        this.item = response[Number(ids)];
      })
    }
    
    this.dId = ids;

  }

}
