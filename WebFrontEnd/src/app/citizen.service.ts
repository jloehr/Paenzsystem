import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Citizen } from './citizen';

@Injectable()
export class CitizenService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private citizensUrl = 'api/citizens';  // URL to web api

  constructor(private http: Http) { }

  getCitizens(): Promise<Citizen[]> {
    return this.http.get(this.citizensUrl)
               .toPromise()
               .then(response => response.json() as Citizen[])
               .catch(this.handleError);
  }


  getCitizen(id: number): Promise<Citizen> {
    const url = `${this.citizensUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json()[0] as Citizen)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.citizensUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(citizen: Citizen): Promise<Citizen> {
    return this.http
      .post(this.citizensUrl, JSON.stringify(citizen), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Citizen)
      .catch(this.handleError);
  }

  update(citizen: Citizen): Promise<Citizen> {
    const url = `${this.citizensUrl}/${citizen.CitizenID}`;
    return this.http
      .put(url, JSON.stringify(citizen), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Citizen)
      .catch(this.handleError);
  }

  checkIn(id: number): Promise<Citizen> {
    const url = `${this.citizensUrl}/${id}/check_in`;
    return this.http.put(url, '', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Citizen)
      .catch(this.handleError);
  }

  checkOut(id: number): Promise<Citizen> {
    const url = `${this.citizensUrl}/${id}/check_out`;
    return this.http.put(url, '', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Citizen)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
