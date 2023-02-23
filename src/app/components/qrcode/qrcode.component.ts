import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderControllerService, StateControllerService, Etats, Results } from 'api';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  private sub: any;
  id!: string;
  passcode: string='';
  result: Results={};
  image: string[] = [];
  constructor(private route: ActivatedRoute, private orderControllerService: OrderControllerService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.orderControllerService.getResultQRCode1(this.id).subscribe((res:Results) => {
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
