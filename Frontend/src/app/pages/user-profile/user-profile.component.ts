import { Component, OnInit } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;

  name: String;
  email: String;
  first_name: String;
  last_name: String;
  motivation_letter: String;

  fileToUpload: File = null;

  isLoaded= false;
  cv: string;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.myService.getProfile().subscribe((data:any) => {
      console.log(data)
      this.user = data[0];
      this.cv = 'http://localhost:3000/'+ data[0].cv;
      console.log(this.user)
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });
  }

  onUpdateSubmit(){

    const updatedUser = {
      name: this.name,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      motivation_letter: this.motivation_letter
    }
    console.log(updatedUser)

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the master loader with 'default' taskId

    this.myService.updatePorfile(updatedUser).subscribe((data:any) => {
      this.flashMessages.show('Profile updated with success', {cssClass: 'alert-success', timeout: 3000});
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });

      if (this.isLoaded) {
        this.ngxService.stop();
      }
    }

    fileChange(event) {

      let fileList: FileList = event.target.files;

      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('cv', file, file.name);

          this.myService.uploadCv(formData).subscribe((data:any) => {
            console.log(data)
            window.location.reload();
            },
            err => {
              console.log("errors_____"+err.error.error)
              this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

            });
      }
  }
}
