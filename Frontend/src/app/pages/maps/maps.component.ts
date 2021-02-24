import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  search_text: String;
  keywords: String;
  pages: Number;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private ngxService: NgxUiLoaderService) {}


  ngOnInit() {


  }

  onSearchSubmit(){

    const search = {
      link: this.search_text,
      keywords: this.keywords,
      pages: this.pages.toString()
    }

    console.log(search);

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the master loader with 'default' taskId

    this.myService.jobSearch(search).subscribe((data:any) => {

      this.flashMessages.show('Success', {cssClass: 'alert-success', timeout: 3000});
      this.myService.storeUserData(data.data.token, data.data.user)
      this.router.navigate(['/dashboard']);
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.router.navigate(['/dashboard']);
      });

    }
}
