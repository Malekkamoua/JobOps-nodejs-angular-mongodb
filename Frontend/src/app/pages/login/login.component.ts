import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  data: any;

  isLoaded =  false;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
  }

  onLoginSubmit(){

    const user = {
      email: this.email,
      password: this.password
    }
    this.ngxService.startLoader("loader-01"); // start foreground spinner of the master loader with 'default' taskId

    this.myService.loginUser(user).subscribe((data:any) => {

      this.flashMessages.show('Success', {cssClass: 'alert-success', timeout: 3000});
      this.myService.storeUserData(data.data.token, data.data.user)
      this.router.navigate(['/Alljobies']);
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});
      });

      if (this.isLoaded) {
        this.ngxService.stop();
      }
    }

}
