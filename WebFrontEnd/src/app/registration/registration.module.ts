import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  exports: [RegistrationComponent],
  imports: [],
  providers: [],
  bootstrap: [RegistrationComponent]
})

export class RegistrationModule { 
}