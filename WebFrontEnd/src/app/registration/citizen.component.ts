import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Citizen } from '../citizen';
import { CitizenService } from '../citizen.service';

@Component({
  selector: 'citizen-detail',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})

export class CitizenComponent implements OnInit {
  citizen: Citizen;

  constructor(
    private citizenService: CitizenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.citizenService.getCitizen(+params.get('id')))
      .subscribe(citizen => this.citizen = citizen);
  }
}
