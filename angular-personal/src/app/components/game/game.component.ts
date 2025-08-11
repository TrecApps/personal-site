import { Component } from '@angular/core';
import { TabComponent, TabOption } from '@tc/tc-ngx-general';
import { TrooperMatchComponent } from '../games/trooper-match/trooper-match.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [TabComponent, TrooperMatchComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  tabs: TabOption[] = [
    {
      showTitle: "Trooper Match",
      actTitle: "tm"
    }
  ]

  activeTab: string = "tm";


}
