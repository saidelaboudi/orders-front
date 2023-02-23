import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailResponse, Etats, OrderControllerService, StateControllerService, UpdatePayload } from 'api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private sub: any;
  form = new FormGroup({
    state: new FormControl({})
  });
  id!: string;
  isDone: boolean = false;
  error: string = "";
  isError: boolean = false;
  result: EmailResponse = {
    "email": "",
    "state": ""
  };
  needPasscode:boolean=true
  states: Array<Etats> = [];
  updatePayload:UpdatePayload={}
  passcode: string='';
  constructor(private route: ActivatedRoute, private orderControllerService: OrderControllerService,private stateControllerService:StateControllerService,private router: Router) { }

  ngOnInit(): void {
    this.passcode=JSON.parse(localStorage.getItem('passcode') || '""')
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.updatePayload.id=params['id'];
      localStorage.setItem('id', JSON.stringify(this.id));
    });
    if(this.passcode==""){
      this.router.navigate(['/passcode']);
    }else{
      localStorage.setItem('id', '');
    }
    this.stateControllerService.getAll().subscribe((etats:Array<Etats>)=>{
      this.states=etats;
    });
    this.isDone = false;
    this.isError = false;
  }

  onSubmit() {
    this.isDone = false;
    this.isError = false;
    this.updatePayload.etats=this.form.value.state;
    this.orderControllerService.getStatus(this.updatePayload)
    .subscribe((res: EmailResponse) => {
        if (res.email == null || res.state == null) {
        } else {
          this.result.email = res.email;
          this.result.state = res.state;
          this.isDone = true;
          this.isError = false;
          localStorage.setItem('passcode', JSON.stringify(this.form.value.passcode));
        }
      }, () => {
        this.error = "Technical error has occured";
        this.isDone = false;
        this.isError = true;
      })
  }

}
