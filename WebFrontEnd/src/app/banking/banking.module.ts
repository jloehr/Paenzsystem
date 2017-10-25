import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { BankingComponent } from './banking.component';
import { AccountComponent } from './account.component';

import { AppRoutingModule } from '../app-routing.module';
import { CitizenService } from '../citizen.service';
import { AccountService } from './account.service';

@NgModule({
  declarations: [
    BankingComponent,
    AccountComponent
  ],
  exports: [ BankingComponent, AccountComponent ],
  imports: [ AppRoutingModule, FormsModule, HttpModule, NgbModule, BrowserModule ],
  providers: [ CitizenService, AccountService ],
  bootstrap: [ BankingComponent ]
})

export class BankingModule { 
}
