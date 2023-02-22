import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Etats, OrderControllerService, Orders, Results, StateControllerService } from 'api';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  form = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    orderNumber: new FormControl(''),
    arrivalDate: new FormControl(''),
    shippingDate: new FormControl(''),
    state: new FormControl({}),
    passcode: new FormControl('')
  });
  order: Orders = {
    "fullname":"",
    "email": "",
    "orderNumber": "",
    "arrivalDate": new Date,
    "shippingDate": new Date,
    "state": {}
  };
  result: Results={};
  image: string[] = [];
  states: Array<Etats> = [];
  needPasscode:boolean=true;
  passcode: string='';
  constructor(private orderControllerService: OrderControllerService, private sanitizer: DomSanitizer,private stateControllerService:StateControllerService) { }

  ngOnInit(): void {
    this.stateControllerService.getAll().subscribe((etats:Array<Etats>)=>{
      this.states=etats;
    });
    this.passcode=JSON.parse(localStorage.getItem('passcode') || '""')
    if(this.passcode!=""){
      this.needPasscode=false
    }
  }
  onSubmit() {
    this.order.fullname = this.form.value.fullname;
    this.order.email = this.form.value.email;
    this.order.orderNumber =this.form.value.orderNumber;
    this.order.arrivalDate =this.form.value.arrivalDate;
    this.order.shippingDate =this.form.value.shippingDate;
    this.order.state =this.form.value.state;
    this.orderControllerService.getResultQRCode(this.order).subscribe((res:Results) => {
      this.result = res!
      this.image=res.image!
      localStorage.setItem('passcode', JSON.stringify(this.form.value.passcode));
    }
    )
  }

  getImage(){
    let objectURL = 'data:image/png;base64,' + this.image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
