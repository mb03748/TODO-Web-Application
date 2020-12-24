import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private loggerService: LoggerService) { }

  
  /*

  private items = [
    {
      username: "abc@Abc.com",
      data: [{name: "Do homework",done: true},  {name: "Call Bank", done: false}]
    }, 
  ]; 

  

  private deleteItem = [];
 
  private temp = {name: "Helo", done: false};

  getItems() {
    return this.items;
  }

  getDelete(){
    return this.deleteItem;
  }

  getItem(id: number) {
    return this.items[id];
  }

  getDel(id: number) {
    return this.deleteItem[id];
  }

  updateServer(n: string) {
    let temp = {name: "Helo", done: false};
    temp.name = n;
    this.items.push(temp);
    //alert(this.items[i].name)
  }

  complete(index: number)
  {
    this.items[index].done = !this.items[index].done ;
  }

  delTask(index: number)
  {
    this.deleteItem.push(this.items[index]);
    this.items.splice(index, 1); 
  }

  delDelete(index: number)
  {
    this.deleteItem.splice(index, 1); 
  }

  */

  getTasks(){
    return this.httpClient.get<Todo>(`${environment.apiBase}/get-users/${this.loggerService.activeUser}`)
  }

  getHistory(){
    return this.httpClient.get<Todo>(`${environment.apiBase}/get-history/${this.loggerService.activeUser}`)
  }

  postTask(data: Todo){
    return this.httpClient.post<Todo>(`${environment.apiBase}/post-user/${this.loggerService.activeUser}`,data)
  }


  complete(index: Number)
  {
    return this.httpClient.put<any>(`${environment.apiBase}/put-complete`,{id: index, user: this.loggerService.activeUser})
  }

  delTask(index: Number)
  {
    return this.httpClient.delete<any>(`${environment.apiBase}/delete-task/${this.loggerService.activeUser}/${index}`)
  }

  delTask2(index: Number)
  {
    return this.httpClient.delete<any>(`${environment.apiBase}/delete-task2/${this.loggerService.activeUser}/${index}`)
  }
  
}
