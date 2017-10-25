import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Citizen } from '../citizen';
import { CitizenService } from '../citizen.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  baseroute = '/registration';
  name = 'Meldeamt';
  headerImage = '2015_header_banner_paenzhausen_ANMELDUNG_123x1000_web.jpg';

  citizens: Citizen[] = [];

  public model: any;

  constructor(
    private router: Router,
    private citizenService: CitizenService
  ) { }

  ngOnInit(): void {
  	this.updateCitizens();
  }

  updateCitizens(): Promise<void> {
    return this.citizenService.getCitizens()
      .then(citizens => this.citizens = citizens)
      .then(citizens => console.log(this.citizens));
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.citizens.filter(v => ((v.CitizenID.toString().indexOf(term.toLowerCase()) > -1) || (v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) || (v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1))).slice(0, 10));


  formatter = (x: Citizen) => x.CitizenID;

  onSearchChange(component) {
    if(component.CitizenID) { 
      this.router.navigate([this.baseroute, component.CitizenID]);
    }
  }

  onSearchFocus() {
    this.updateCitizens();
  }

  onActivate(component) {
  }
}
