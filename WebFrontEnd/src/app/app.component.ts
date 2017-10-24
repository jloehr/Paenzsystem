import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  headerImage: String;

  onActivate(component) {
    this.headerImage = component.headerImage;
    console.log(component);
  }
}
