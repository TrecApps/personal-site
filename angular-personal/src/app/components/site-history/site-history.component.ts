import { Component } from '@angular/core';
import { ElementContainerDirective, ElementItemDirective } from '@tc/tc-ngx-general';

@Component({
  selector: 'app-site-history',
  imports: [ElementContainerDirective, ElementItemDirective],
  templateUrl: './site-history.component.html',
  styleUrl: './site-history.component.css'
})
export class SiteHistoryComponent {

}
