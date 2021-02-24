import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { transition, style, animate, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class DashboardComponent implements OnInit {

  jobs: any;
  searches: any;
  show = true;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private router: Router) {}

    ngOnInit() {
      this.myService.getAllJobs().subscribe((data:any) => {
        console.log(data)

        var result = data.reduce(function(r, e) {
          r[e.search_text] = (r[e.search_text] || 0) + 1
          return r;
        }, {});

        this.jobs = result;
        console.log(this.jobs)
        },
        err => {
          console.log("errors_____"+err.error.error)
          this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

        });

        this.myService.getUserSearches().subscribe((data:any) => {
          console.log(data)
          this.searches = data.reverse();
          });
    }

    OnRefreshClick(){
      window.location.reload();
    }

    searchByText(text){

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'search_text' : text
        }
      }

      this.router.navigate(['/icons'], navigationExtras);
    }

    onDeleteClick(id,search_text){
      this.show = true;
      console.log(id)

      this.myService.deleteSearchById(id,search_text).subscribe((data:any) => {
        console.log(data)
        this.flashMessages.show("Job deleted with success", {cssClass: 'alert-success', timeout: 3000})
        window.location.reload();
        },
        err => {
          console.log("errors_____"+err.error.error)
          this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

        });
    }

}
