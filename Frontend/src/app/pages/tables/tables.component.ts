import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  job_id: any;
  job: any;
  isLoaded = false;

  constructor(private myService: ApiService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router:Router) {
      this.route.queryParams.subscribe(params => {
        this.job_id = params['job_id'];
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      // MDB Lightbox Init
      $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
      });
    });

    this.myService.getJobById(this.job_id).subscribe((data:any) => {
      console.log(data)
      this.job = data;
      console.log(this.job);
      this.isLoaded = true;

      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});

      });
  }

  onApplyClick(id){
    console.log(id);
    this.myService.submitJobById(id).subscribe((data:any) => {
      console.log(data)
      this.isLoaded = true;
      this.flashMessages.show(data.message, {cssClass: 'alert-success', timeout: 3000});

      },
      err => {
        console.log("errors_____"+err.error.error)
        this.flashMessages.show(err.error.error, {cssClass: 'alert-danger', timeout: 3000});
      });
  }

}
