import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderControllerService, Orders } from 'api';

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
  image!: Array<string>;
  constructor(private orderControllerService: OrderControllerService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.order.orderNumber = this.form.value.orderNumber.value;
    this.order.email = this.form.value.email.value;
    this.order.state="Reception";
    this.orderControllerService.getUserQRCode(this.order).subscribe((res:Array<string>) => this.image = res)
    console.log(this.image)
  }
}
