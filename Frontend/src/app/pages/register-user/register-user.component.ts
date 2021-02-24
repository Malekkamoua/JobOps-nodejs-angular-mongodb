import {Component,OnInit} from '@angular/core';
 import {ValidateService} from '../../services/validate.service'
import {ApiService} from './../../services/api.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private myService: ApiService,
    private router: Router) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }


    this.myService.registerUser(user).subscribe(res => {
      this.flashMessages.show('Success', {cssClass: 'alert-success', timeout: 3000});
      console.log(res);
      this.router.navigate(['/login']);
      },
      err => {
        console.log("error_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });
    }
}
