import { Component } from '@angular/core';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  baseroute = '/registration';
  name = 'Meldeamt';
  headerImage = '2015_header_banner_paenzhausen_ANMELDUNG_123x1000_web.jpg';
}
