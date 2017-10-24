import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegistrationComponent } from './registration.component';

import { AppRoutingModule } from '../app-routing.module';
import { CitizenService } from '../citizen.service';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  exports: [ RegistrationComponent ],
  imports: [ AppRoutingModule, FormsModule, HttpModule, NgbModule ],
  providers: [ CitizenService ],
  bootstrap: [ RegistrationComponent ]
})

export class RegistrationModule { 
}
