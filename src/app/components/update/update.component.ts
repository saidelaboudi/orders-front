import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailResponse, Etats, OrderControllerService, Orders, StateControllerService } from 'api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private sub: any;
  form = new FormGroup({
    state: new FormControl({}),
    commentaire: new FormControl('')
  });
  id!: string;
  isDone: boolean = false;
  error: string = "";
  isError: boolean = false;
  result: EmailResponse = {
    "email": "",
    "state": "",
    "notify": false,
    "orderNumber": ""
  };
  needPasscode:boolean=true
  states: Array<Etats> = [];
  passcode: string='';
  order!: Orders;
  constructor(private route: ActivatedRoute, private orderControllerService: OrderControllerService,private stateControllerService:StateControllerService,private router: Router) { }

  ngOnInit(): void {
    this.passcode=JSON.parse(localStorage.getItem('passcode') || '""')
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      localStorage.setItem('id', JSON.stringify(this.id));
    });
    if(this.passcode==""){
      this.router.navigate(['/passcode']);
    }else{
      localStorage.setItem('id', '');
    }
    this.orderControllerService.findById(this.id).subscribe((res:Orders)=>{this.order=res;})
    this.stateControllerService.getAll().subscribe((etats:Array<Etats>)=>{
      this.states=etats;
    });
    this.isDone = false;
    this.isError = false;
  }

  onSubmit() {
    this.order.state=this.form.value.state;
    this.order.comment=this.form.value.commentaire;
    this.isDone = false;
    this.isError = false;
    this.orderControllerService.getStatus(this.order)
    .subscribe((res: EmailResponse) => {
        if (res.email == null || res.state == null) {
        } else {
          this.result.email = res.email;
          this.result.state = res.state;
          this.result.notify = res.notify;
          this.result.orderNumber = res.orderNumber;
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
