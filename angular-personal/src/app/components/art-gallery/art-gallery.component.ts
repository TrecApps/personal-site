import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { AfterContentInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ImageFilterPipe } from '../../pipes/image-filter.pipe';
import { HttpClient } from '@angular/common/http';
import { ImageEntry } from '../../models/image-entry';
import { ElementContainerDirective, ElementItemDirective } from '@tc/tc-ngx-general';


@Component({
  selector: 'app-art-gallery',
  imports: [CommonModule, FormsModule, ImageFilterPipe, 
    ElementContainerDirective, ElementItemDirective],
  templateUrl: './art-gallery.component.html',
  styleUrl: './art-gallery.component.css',
  animations: [
    trigger('imageTranslate', [
      state('collapse', style({ height: '0px', overflow: 'hidden'})),
      state('expanded', style({ height: '*', overflow: 'hidden'})),
      transition('collapse => expanded', [ animate('0.33s')]),
      transition('expanded => collapse', [animate('0.33s')])
    ]),
    trigger('xHover',[
      state('hover', style({background: 'rgba(255,0,0,1.0)'})),
      state('leave', style({background: 'rgba(0,0,0, 0.0'})),
      transition('hover => leave', [ animate('0.33s')]),
      transition('leave => hover', [ animate('0.33s')])
    ]),
    trigger('onShowGallery', [
      state('doShow', style({ height: '*'})),
      state('doHide', style({ height: '0px'})),
      transition('doShow => doHide', [ animate('0.33s')]),
      transition('doHide => doShow', [ animate('0.33s')])
    ])
  ]
})
export class ArtGalleryComponent implements AfterContentInit{
  showCommissions = true;
  showSelfArt = true;

  searchTerm= "";

  useGallery:boolean = false;
  showPanel: boolean = false;
  xButtonHover: boolean = false;

  imageWidth: number = 500;
  viewHeight: number = 600;
  setHover(setBHover: boolean){
    this.xButtonHover = setBHover;
  }

  setUseGallery(ug: boolean){
    this.useGallery = ug;
  }


  doShowCommissions(){
    this.showCommissions = true;
    this.showSelfArt = false;
  }

  doShowSelfArt(){
    this.showCommissions = false;
    this.showSelfArt = true;
  }

  doShowBoth(){
    
    this.showCommissions = true;
    this.showSelfArt = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustImages(event.target.innerWidth, event.target.innerHeight);
  }

  @ViewChild("imagePanel")
  imagePanel!: ElementRef<HTMLDivElement>;

  adjustImages(width: any, height: any){

    this.viewHeight = height;

    this.imageWidth = (width - 35) / 6;
    console.log(`Image Width = ${this.imageWidth} from ${width}`);
    if(this.imageWidth > 200) this.imageWidth = 200;

    this.galleryImageHeight = `height: ${this.imageWidth}px`;
    this.imageWidth = Math.floor(this.imageWidth / 2 * 3);
    this.cardHeight = `height: ${this.imageWidth}px`;
    this.cardWidth = `width: ${this.imageWidth + 30}px`;
  }

  images: ImageEntry[];

  selectedImage: ImageEntry | undefined;

  galleryImageHeight: string = "height: 200px";
  cardWidth: string = "width: 330px";
  cardHeight: string = "height: 300px";

  imageFilter: ImageFilterPipe = new ImageFilterPipe();

  currentIndex: number = 0;
  indexIsFinal: boolean = false;

  constructor(private client: HttpClient){
    this.images = [];
    this.prepImages();
  }
  ngAfterContentInit(): void {
    this.adjustImages(window.innerWidth, window.innerHeight);
  }
  ngOnInit(): void {
    this.adjustImages(window.innerWidth, window.innerHeight);
  }

  panelHideTimeout: any = -1;

  prepImages(){
    this.client.get<ImageEntry[]>('assets/Images.json').subscribe((entries: ImageEntry[]) => {
      this.images = entries;
    })
  }

  setImageEntry(sel: ImageEntry|undefined, index: number = 0){
    this.selectedImage = sel;
    this.showPanel = true;
    this.currentIndex = index;

    let filteredImages = this.imageFilter.transform(this.images, this.showSelfArt, this.showCommissions, this.searchTerm)

    this.indexIsFinal = this.currentIndex == filteredImages.length - 1;

    if(this.panelHideTimeout != -1){
      clearInterval(this.panelHideTimeout);
    }

    this.imagePanel.nativeElement.hidden = false;
  }

  hideGallery(){
    if(!this.showPanel) return;
    this.showPanel = false;
    this.panelHideTimeout = setTimeout(() => {
      this.imagePanel.nativeElement.hidden = true;
    }, 333);
  }

  toggleTagView(entry: ImageEntry, show: boolean){
    entry.isHovering = show;
  }

  switchImage(forward: boolean){
    let filteredImages = this.imageFilter.transform(this.images, this.showSelfArt, this.showCommissions, this.searchTerm)
    if(forward){
      if(this.currentIndex == filteredImages.length - 1)
      {
        this.indexIsFinal = true;
        return;
      }

      this.currentIndex++;
      this.setImageEntry(filteredImages[this.currentIndex], this.currentIndex);
      if(this.currentIndex == filteredImages.length - 1)
      {
        this.indexIsFinal = true;
        return;
      }
    } else {
      if(this.currentIndex == filteredImages.length - 1){
        this.indexIsFinal = false;
      }

      if(!this.currentIndex) return;
      this.currentIndex--;
      this.setImageEntry(filteredImages[this.currentIndex], this.currentIndex);
    }
  }
}
