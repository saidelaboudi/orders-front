import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { ResultComponent } from './components/result/result.component';
import { UpdateComponent } from './components/update/update.component';
import { PasscodeComponent } from './passcode/passcode.component';

const routes: Routes = [
  
  { path: '', redirectTo :'order',pathMatch:'full'  },
  { path: 'orders', component: OrdersComponent  },
  { path: 'order', component: OrderComponent  },
  { path: 'update/:id', component: UpdateComponent  },
  { path: 'result', component: ResultComponent  },
  { path: 'qrcode', component: QrcodeComponent  },
  { path: 'passcode', component: PasscodeComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
