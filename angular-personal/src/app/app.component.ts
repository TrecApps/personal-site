import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StylesService } from '@tc/tc-ngx-general';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-personal';

  ss: StylesService;

  constructor(ss: StylesService) {
    this.ss = ss;
  }
}
