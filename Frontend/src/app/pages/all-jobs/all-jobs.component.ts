import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {

  jobs: any;
  id: any;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private router:Router) { }

  ngOnInit() {

    this.myService.getAllJobs().subscribe((data:any) => {
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
    console.log(id)
    this.myService.deleteJobById(id).subscribe((data:any) => {
      console.log(data)
      this.flashMessages.show("Job deleted with success", {cssClass: 'alert-success', timeout: 3000});
      window.location.reload();
      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });
  }
}

