import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Account } from './account';

@Injectable()
export class AccountService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private accountsUrl = 'api/bank_accounts';  // URL to web api

  constructor(private http: Http) { }

  getAccount(id: number): Promise<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json()[0] as Account)
      .catch(this.handleError);
  }

  doTransaction(id: number, amount: number): Promise<Account> {
    const url = `${this.accountsUrl}/${id}`;
    var body = { Amount: amount };

    return this.http.patch(url, JSON.stringify(body), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Account)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}