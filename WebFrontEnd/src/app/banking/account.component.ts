import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Citizen } from '../citizen';
import { CitizenService } from '../citizen.service';

import { Account } from './account';
import { AccountService } from './account.service';


@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  id: number;
  citizen: Citizen;
  account: Account;
  amount: number = 0;
  showAlert: boolean = false;

  constructor(
    private accountService: AccountService,
    private citizenService: CitizenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = +params.get('id');
        return this.citizenService.getCitizen(+params.get('id'));
      })
      .subscribe(citizen => {
        this.citizen = citizen;
        return this.accountService.getAccount(this.id)
          .then(account => this.account = account);
      });
  }

  doTransaction(amount: number) {
    if(amount == 0)
      return;
    
    this.accountService.doTransaction(this.id, amount)
    .then(account => { console.log(account); this.account = account; });
  }

  deposit() {
    console.log(this.amount);
    this.doTransaction(this.amount);
    this.amount = 0;
  }

  withdraw() {
    if(this.amount > this.account.Balance)
    {
      this.showAlert = true;
      return;
    }

    console.log(this.amount);
    this.doTransaction(-this.amount);
    this.amount = 0;
  }

  closeAlert() {
    this.showAlert = false;
  }

}
