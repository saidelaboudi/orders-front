import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasscodeControllerService } from 'api';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.css']
})
export class PasscodeComponent implements OnInit {
  form = new FormGroup({
    passcode: new FormControl('')
  });
  isError: boolean=false;
  error: string="";
  constructor(private router: Router,private passcodeControllerService: PasscodeControllerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.passcodeControllerService.getPasscode(this.form.value.passcode).subscribe((res: boolean) => {
      if (res == true) {
        localStorage.setItem('passcode', JSON.stringify(this.form.value.passcode));
        const id=JSON.parse(localStorage.getItem('id') || '""')
        if(id==""){
          this.router.navigate(['/order']);
        }else{
          this.router.navigate(['/update/'+id]);
        }
      }else{
        this.isError = true;
        this.error = "Wrong passcode";

      }
    }
    )
  }
}
