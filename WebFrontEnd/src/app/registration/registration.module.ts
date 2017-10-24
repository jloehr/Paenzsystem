import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { RegistrationComponent } from './registration.component';
import { CitizenComponent } from './citizen.component';

import { AppRoutingModule } from '../app-routing.module';
import { CitizenService } from '../citizen.service';

@NgModule({
  declarations: [
    RegistrationComponent,
    CitizenComponent
  ],
  exports: [ RegistrationComponent, CitizenComponent ],
  imports: [ AppRoutingModule, FormsModule, HttpModule, NgbModule, BrowserModule ],
  providers: [ CitizenService ],
  bootstrap: [ RegistrationComponent ]
})

export class RegistrationModule { 
}
