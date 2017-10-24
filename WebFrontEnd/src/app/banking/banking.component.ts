import { Component } from '@angular/core';

@Component({
  selector: 'banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent {
  baseroute = '/banking';
  name = 'Bank';
  headerImage = '2015_header_banner_paenzhausen_BANK_123x1000_web.jpg';
}
