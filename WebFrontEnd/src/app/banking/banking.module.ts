import { NgModule } from '@angular/core';

import { BankingComponent } from './banking.component';

@NgModule({
  declarations: [
    BankingComponent
  ],
  exports: [BankingComponent],
  imports: [],
  providers: [],
  bootstrap: [BankingComponent]
})

export class BankingModule { 
}
