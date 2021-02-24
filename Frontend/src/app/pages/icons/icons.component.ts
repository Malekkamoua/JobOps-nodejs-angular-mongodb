import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  search_text: any;
  jobs: any;
  id: any;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router:Router) {
      this.route.queryParams.subscribe(params => {
        this.search_text = params['search_text'];
    });
  }

  ngOnInit() {

    this.myService.getJobsBySearchText(this.search_text).subscribe((data:any) => {
      console.log(data)
      this.jobs = data;
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });

  }

  onViewClick(id){

    this.id = id;
     let navigationExtras: NavigationExtras = {
        queryParams: {
          'job_id' : id
        }
      }

      this.router.navigate(['/tables'], navigationExtras);
  }

  onDeleteClick(id){

    this.myService.deleteJobById(id).subscribe((data:any) => {
      console.log(data)
      this.flashMessages.show("Job deleted with success", {cssClass: 'alert-success', timeout: 3000});
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });

  }
}
