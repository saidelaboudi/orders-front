import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderControllerService, Orders, Results } from 'api';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  form = new FormGroup({
    orderNumber: new FormControl(''),
    email: new FormControl(''),
    passcode: new FormControl('')
  });
  order: Orders = {
    "orderNumber": "",
    "email": ""
  };
  result: Results={};
  image: string[] = [];
  constructor(private orderControllerService: OrderControllerService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.order.orderNumber = this.form.value.orderNumber;
    this.order.email = this.form.value.email;
    this.order.state="Reception";
    this.orderControllerService.getResultQRCode(this.order).subscribe((res:Results) => {
      this.result = res!
      this.image=res.image!
    }
    )
  }

  getImage(){
    let objectURL = 'data:image/png;base64,' + this.image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
