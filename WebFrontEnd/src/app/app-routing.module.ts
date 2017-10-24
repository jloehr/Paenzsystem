import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankingComponent } from './banking/banking.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'banking',  component: BankingComponent },
  { path: 'registration',  component: RegistrationComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
