import { Component, OnInit } from '@angular/core';
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

  constructor(private orderControllerService: OrderControllerService) { }

  ngOnInit(): void {
    this.orderControllerService.getAllLists().subscribe((res: Array<Orders>) => { 
      this.list = res 
      this.isReady=true;
    });
    this.updateSubscription = interval(120000).subscribe(
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
}
