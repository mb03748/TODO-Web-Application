import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  IsLogged;
  activeUser;
  

  constructor(private httpClient: HttpClient, private router: Router) { 
      this.IsLogged = false;
      this.activeUser = "abc@abc.com"
      //this.updateAccounts();
      this.getIsLogged(this.activeUser);
  }

  private out;
  

  isAuthenticated()
  {
    const promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{resolve(this.IsLogged)}, 200)
    });

    return promise;
  }


  signIn(username: string, password: string)
  {

    this.getAccounts(username, password).subscribe((response: any)=>{
      console.log('response: ',response);
      this.out = response.out;
    if (this.out)
    {
      this.activeUser = username;
      this.postTask(this.activeUser).subscribe((response: any)=>{
      console.log('response: ',response);
      });
    }

    this.getIsLogged(this.activeUser);
    if (this.out)
    {
      this.router.navigate(['/home']);
    }
    else
    {
      alert("Invalid username or password.")
    }

  });
  }

  public signUp(user: string, pass: string)
  {
    var temp = {username: user, password: pass, online: false};
    //this.users.push(temp);
    //console.log(this.users);
    this.postUser(temp).subscribe((response: any)=>{
      console.log('response: ',response);
    });
  }

  public changePassword(user: string, pass: string, pass2: string)
  {
    let out;
    var temp = {username: user, password: pass, password2: pass2};
    this.postChange(temp).subscribe((response: any)=>{
      console.log('response: ',response);
      out = response.out;
      
   

    if (out == 1)
    {
      alert("Invalid Username")
    }

    else if (out == 2)
    {
      alert("Invalid Old Password")
    }

    else if (out == 3)
    {
      alert("Password Changed!");
    }
  
  });
  }

  public signOut()
  {
    this.postOff(this.activeUser).subscribe((response: any)=>{
      console.log('response: ',response);
    })
    this.getIsLogged(this.activeUser);
  }

  getIsLogged(activeUser)
  {
    this.getOnline(activeUser).subscribe((response: any)=>{
      this.IsLogged = response;
    })
  }


  postTask(temp: string){
    return this.httpClient.put<any>(`${environment.apiBase}/put-online`, {user: temp});
  }

  postOff(temp: string){
    return this.httpClient.put<any>(`${environment.apiBase}/put-offline`, {user: temp});
  }

  postUser(temp: any){
    return this.httpClient.post<any>(`${environment.apiBase}/post-new`, temp);
  }

  postChange(temp: any){
    return this.httpClient.put<any>(`${environment.apiBase}/put-change`, temp);
  }

  getAccounts(username: string, password: string)
  {
    return this.httpClient.get<any>(`${environment.apiBase}/get-accounts/${username}/${password}`);
  }
  
  getOnline(temp: string)
  {
    return this.httpClient.get<any>(`${environment.apiBase}/get-online/${temp}`);
  }


}
