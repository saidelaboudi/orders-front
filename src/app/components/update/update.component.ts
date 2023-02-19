import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderControllerService } from 'api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id!: number;
  private sub: any;
  form = new FormGroup({
    ref: new FormControl(this.id),
    passcode: new FormControl('')
  });
  result: string="";
  constructor(private route: ActivatedRoute,private orderControllerService: OrderControllerService) { }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.form.value.ref= +params['id'];
    });
  }

  onSubmit(){
    const passcode=this.form.value.passcode;

    this.orderControllerService.getUserQRCode1(
      this.form.value.passcode,
      this.form.value.ref)
      .subscribe((res:string)=>this.result=res.valueOf())
  }

}
