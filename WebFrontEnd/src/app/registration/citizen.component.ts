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
  checkInColor = 'bg-success';
  checkOutColor = 'bg-danger';

  constructor(
    private citizenService: CitizenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.citizenService.getCitizen(+params.get('id')))
      .subscribe(citizen => this.citizen = citizen);
  }

  checkedIn(): boolean {
    return (this.citizen.CheckIns.length > this.citizen.CheckOuts.length);
  }

  nameColor(): string {
    return this.checkedIn() ? this.checkInColor : this.checkOutColor;
  }

  onCheckIn() {
    this.citizenService.checkIn(this.citizen.CitizenID)
    .then(citizen => {
      console.log(citizen);
      this.citizen = citizen;
    });

  }

  onCheckOut() {
    this.citizenService.checkOut(this.citizen.CitizenID)
    .then(citizen => {
      console.log(citizen);
      this.citizen = citizen;
    });

  }
}
