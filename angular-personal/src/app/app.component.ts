import { CommonModule, NgClass } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute , Router, RouterLink, RouterOutlet, UrlSegment } from '@angular/router';
import { PopupComponent, StylesService } from '@tc/tc-ngx-general';
import { ColorOption, ColorPanelComponent } from './components/color-panel/color-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, RouterLink, CommonModule, 
    PopupComponent, ColorPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'angular-personal';

  ss: StylesService;
  router: Router ;

  showStylePopup: boolean = false;

  constructor(ss: StylesService, router: Router ) {
    this.ss = ss;
    this.router = router;

    // this.route.url.subscribe({
    //   next: (segment: UrlSegment[]) => {
    //     console.log("Url Segment: ", segment);
    //   }
    // })
  }
  ngAfterViewChecked(): void {
    if(this.colorStyleCheck)
      this.colorStyleCheck.nativeElement.checked = this.ss.isDark;
  }

  @ViewChild('colorStyleCheck')
  colorStyleCheck?: ElementRef<HTMLInputElement>;


toggleNavLinks(){
  let navLinks: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-link');

  for(let c = 0; c < navLinks.length; c++){
    let navLink: Element | null = navLinks.item(c);

    if(!navLink) continue;

    if(this.ss.isDark)
      navLink.classList.add('dark-mode-link');
    else
      navLink.classList.remove('dark-mode-link');
  }
}

  ngOnInit(): void {
    let savedStyle = localStorage.getItem("tc_style_color")
    if(savedStyle)
      this.ss.setStyle(savedStyle);
    let savedDarkMode = localStorage.getItem("tc_style_dark");
    if(savedDarkMode !== null){
      this.ss.setDarkMode('true' == savedDarkMode);
    }

    if(this.ss.isDark){
      document.body.classList.add('body-dark');

      this.toggleNavLinks();
    }

    
  }

      colorList: ColorOption[] = [
    {
      colorStyle: '#d1d1d1',
      styleName: 'default'
    },{
      colorStyle: '#ff0000ff',
      styleName: 'red'
    },{
      colorStyle: 'rgb(0, 171, 255)',
      styleName: 'blue'
    },{
      colorStyle: 'rgb(8, 223, 41)',
      styleName: 'green'
    },{
      colorStyle: 'rgb(255, 239, 1)',
      styleName: 'yellow'
    },{
      colorStyle: 'rgb(255, 120, 1)',
      styleName: 'orange'
    },{
      colorStyle: 'rgb(221, 99, 255)',
      styleName: 'purple'
    },{
      colorStyle: 'rgb(255, 59, 243)',
      styleName: 'pink'
    }
  ]

  colorChanged: boolean = false;

  onColorSelect(styleColor: string){
    this.ss.setStyle(styleColor);
    this.colorChanged = true;
  }
  onUseDarkChecked(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.colorChanged = true;

    this.ss.setDarkMode(checkbox.checked);

    document.body.classList.toggle('body-dark');
    this.toggleNavLinks();
  }


  updateStyle(){
    let curStyle = this.ss.style;
    if(curStyle.startsWith("dark-"))
      curStyle = curStyle.substring(5);
    localStorage.setItem("tc_style_color", curStyle);
    localStorage.setItem("tc_style_dark", this.ss.isDark ? 'true' : 'false');
    this.colorChanged = false;
  }
}
