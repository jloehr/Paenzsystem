import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankingComponent } from './banking/banking.component';
import { RegistrationComponent } from './registration/registration.component';
import { CitizenComponent } from './registration/citizen.component';
import { CreateCitizenComponent } from './registration/createcitizen.component';
import { EditCitizenComponent } from './registration/editcitizen.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration/new', pathMatch: 'full' },
  { 
    path: 'banking',
    component: BankingComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    children: [
  	{ 
  	    path: 'new',  
  	    component: CreateCitizenComponent
  	},
    { 
        path: ':id/edit',  
        component: EditCitizenComponent
    },
  	{ 
  	    path: ':id',  
  	    component: CitizenComponent
  	}
    ] 
  } 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
