import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderControllerService, Orders } from 'api';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  list!: Array<Orders>;
  isReady: boolean=false;
  private updateSubscription!: Subscription;
  passcode: string="";

  constructor(private router: Router,private orderControllerService: OrderControllerService) { }

  ngOnInit(): void {
    this.passcode=JSON.parse(localStorage.getItem('passcode') || '""')
    if(this.passcode==""){
      this.router.navigate(['/passcode']);
    }
    this.orderControllerService.getAllLists().subscribe((res: Array<Orders>) => { 
      this.list = res 
      this.isReady=true;
    });
    this.updateSubscription = interval(60000).subscribe(
      (val) => { 
        this.orderControllerService.getAllLists().subscribe((res: Array<Orders>) => { 
          this.list = res 
          this.isReady=true;
        });
      })
  }
  delete(id:string){
    this.orderControllerService._delete(id).subscribe(()=> {
      this.isReady=false;
      this.orderControllerService.getAllLists().subscribe((res: Array<Orders>) => { 
        this.list = res 
        this.isReady=true;
      });
    });
  }
  getColor(item:Orders){
    if(item.state!.etat! == 'En cours de production'){
      return "rgb(30,144,255)";
    }else if(item.state!.etat! == 'Finition'){
      return "rgb(255,165,0)";
    }else if(item.state!.etat! == 'Préparation'){
      return "rgb(192,192,192)";
    }else if(item.state!.etat! == 'Terminée'){
      return "rgb(154,205,50)";
    }else{
      return "rgb(255,255,255)";
    }
  }
  qrCode(id:string){
    this.router.navigate(['/qrcode/'+id]);
  }
}
