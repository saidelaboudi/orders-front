import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailResponse, OrderControllerService } from 'api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private sub: any;
  form = new FormGroup({passcode: new FormControl('')});
  id!: string;
  isDone: boolean = false;
  error: string = "";
  isError: boolean = false;
  result: EmailResponse = {
    "email": "",
    "state": ""
  };
  constructor(private route: ActivatedRoute, private orderControllerService: OrderControllerService) { }

  ngOnInit() {
    this.isDone = false;
    this.isError = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onSubmit() {
    this.isDone = false;
    this.isError = false;
    this.orderControllerService.getStatus(
      this.form.value.passcode,
      this.id)
      .subscribe((res: EmailResponse) => {
        if (res.email == null || res.state == null) {
          this.isError = true;
          this.isDone = false;
          this.error = "Wrong passcode";
        } else {
          this.result.email = res.email;
          this.result.state = res.state;
          this.isDone = true;
          this.isError = false;
        }
      }, () => {
        this.error = "Technical error has occured";
        this.isDone = false;
        this.isError = true;
      })
  }

}
