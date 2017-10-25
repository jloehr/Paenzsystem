import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Citizen } from '../citizen';
import { CitizenService } from '../citizen.service';

@Component({
  selector: 'edit-citizen',
  templateUrl: './citizenform.component.html',
  styleUrls: ['./citizen.component.css']
})

export class EditCitizenComponent implements OnInit  {
  citizen = new Citizen();
  title = 'Bearbeiten';
  showForm = false;

  constructor(
    private citizenService: CitizenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.citizenService.getCitizen(+params.get('id')))
      .subscribe(citizen => { this.citizen = citizen; this.showForm = true});
  }

  onSubmit() {
    console.log(this.citizen);
    this.citizenService.update(this.citizen)
    .then(citizen => {
      console.log(citizen);
      this.router.navigate(['/registration', citizen.CitizenID]);
    });
  }
}

