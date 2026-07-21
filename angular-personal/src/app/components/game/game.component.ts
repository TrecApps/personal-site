import { Component } from '@angular/core';
import { MarkdownEditorComponent, TabComponent, TabOption } from '@tc/tc-ngx-general';
import { TrooperMatchComponent } from '../games/trooper-match/trooper-match.component';


@Component({
  selector: 'app-game',
  imports: [TabComponent, TrooperMatchComponent, MarkdownEditorComponent],

  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  tabs: TabOption[] = [
    {
      showTitle: "Trooper Match",
      actTitle: "tm"
    },
    {
      showTitle: "Markdown Editor",
      actTitle: "markdown"
    }
  ]

  activeTab: string = "tm";

  onSelectTab(actTitle: string){
    this.activeTab = actTitle;
  }
}
