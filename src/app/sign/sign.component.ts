import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  username: string;
  password: string;


  constructor(private router: Router, private loggerService: LoggerService) { }

  ngOnInit(): void {
  }

  public test()
  {
    
    this.loggerService.signIn(this.username, this.password);

  }

}
