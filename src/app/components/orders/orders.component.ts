import { Component, OnInit } from '@angular/core';
import { OrderControllerService, Orders } from 'api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  list!: Array<Orders>;
  isReady: boolean=false;

  constructor(private orderControllerService: OrderControllerService) { }

  ngOnInit(): void {
    this.orderControllerService.getAllLists().subscribe((res: Array<Orders>) => { 
      this.list = res 
      this.isReady=true;
    });
  }
}
