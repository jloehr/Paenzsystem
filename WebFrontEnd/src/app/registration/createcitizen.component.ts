import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Citizen } from '../citizen';
import { CitizenService } from '../citizen.service';

@Component({
  selector: 'create-citizen',
  templateUrl: './citizenform.component.html',
  styleUrls: ['./citizen.component.css']
})

export class CreateCitizenComponent {
  citizen = new Citizen();
  title = 'Neues Kind';
  showForm = true;
  showWait = false;
  showResult = false;

  constructor(
    private citizenService: CitizenService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    console.log(this.citizen);
    this.showForm = false;
    this.showWait = true;
    this.citizenService.create(this.citizen).then(citizen => this.citizen = citizen).then(() => this.showWait = false).then(() => this.showResult = true).then(() => console.log(this.citizen));
  }
}
