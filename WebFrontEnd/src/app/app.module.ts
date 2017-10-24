import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { BankingModule } from './banking/banking.module';
import { RegistrationModule } from './registration/registration.module';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BankingModule,
    RegistrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
