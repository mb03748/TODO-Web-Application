import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  password2: string;

  constructor(private router: Router, private loggerService: LoggerService) { }

  ngOnInit(): void {
  }

  public signup()
  {
    if (this.password != this.password2)
    {
      alert("Password does not match");
    }
    else
    {
      this.loggerService.signUp(this.username, this.password);
      this.router.navigate(['/login']);
      alert("You have successfully registered, please login");
    }
  }
}
