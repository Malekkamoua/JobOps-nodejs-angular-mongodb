import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  user: any;
  cv: string;

  constructor(private myService: ApiService,
    location: Location,
     private router: Router) {
    this.location = location;
  }

  ngOnInit() {

    this.listTitles = ROUTES.filter(listTitle => listTitle);

    this.myService.getProfile().subscribe((data:any) => {
      console.log(data)
      this.user = data[0];
      this.cv = 'http://localhost:3000/'+ data[0].cv;
      console.log(this.user)
      },
      err => {
        console.log("errors_____"+err.error.error)
      });
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  onLogoutClick(){
    this.myService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
