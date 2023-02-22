import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailResponse, Etats, OrderControllerService, StateControllerService, UpdatePayload } from 'api';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private sub: any;
  form = new FormGroup({
    state: new FormControl({}),
    passcode: new FormControl('')
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
  constructor(private route: ActivatedRoute, private orderControllerService: OrderControllerService,private stateControllerService:StateControllerService) { }

  ngOnInit(): void {
    this.stateControllerService.getAll().subscribe((etats:Array<Etats>)=>{
      this.states=etats;
    });
    this.passcode=JSON.parse(localStorage.getItem('passcode') || '""')
    if(this.passcode!=""){
      this.needPasscode=false
    }
    this.isDone = false;
    this.isError = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.updatePayload.id=params['id'];
    });
  }

  onSubmit() {
    this.isDone = false;
    this.isError = false;
    this.updatePayload.etats=this.form.value.state;
    if(this.needPasscode){
      this.updatePayload.passcode=this.form.value.passcode;
    }else{
      this.updatePayload.passcode=this.passcode
    }  
    this.orderControllerService.getStatus(this.updatePayload)
      .subscribe((res: EmailResponse) => {
        if (res.email == null || res.state == null) {
          this.isError = true;
          this.isDone = false;
          this.error = "Wrong passcode";
          localStorage.setItem("passcode", '');
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
