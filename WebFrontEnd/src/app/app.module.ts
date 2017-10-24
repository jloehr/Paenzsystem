import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

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
    RegistrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
