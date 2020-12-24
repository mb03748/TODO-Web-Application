import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username: string;
  password: string;
  password2: string;

  constructor(private router: Router, private loggerService: LoggerService) { }

  ngOnInit(): void {
  }


  public changePassword()
  {
    this.loggerService.changePassword(this.username, this.password, this.password2);
  }

  lout()
  {
    this.loggerService.signOut();
    this.router.navigate(['\login']);
  }
}
