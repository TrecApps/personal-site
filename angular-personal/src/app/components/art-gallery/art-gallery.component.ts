
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { AfterContentInit, Component, ElementRef, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { ImageFilterPipe } from '../../pipes/image-filter.pipe';
import { HttpClient } from '@angular/common/http';
import { ImageEntry, JsonImageEntry } from '../../models/image-entry';
import { ElementContainerDirective, ElementItemDirective } from '@tc/tc-ngx-general';


@Component({
  selector: 'app-art-gallery',
  imports: [FormsModule, ImageFilterPipe, ElementContainerDirective, ElementItemDirective],
  templateUrl: './art-gallery.component.html',
  styleUrl: './art-gallery.component.css'
})
export class ArtGalleryComponent implements AfterContentInit{
  showCommissions = true;
  showSelfArt = true;

  searchTerm= "";

  useGallery:boolean = false;
  showPanel: WritableSignal<boolean> = signal(false);

  imageWidth: number = 500;
  viewHeight: number = 600;

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
    this.client.get<JsonImageEntry[]>('assets/Images.json').subscribe((entries: JsonImageEntry[]) => {
      this.images = entries.map((e: JsonImageEntry) => new ImageEntry(e));
    })
  }

  setImageEntry(sel: ImageEntry|undefined, index: number = 0){
    this.selectedImage = sel;
    this.showPanel.set(true);
    this.currentIndex = index;

    let filteredImages = this.imageFilter.transform(this.images, this.showSelfArt, this.showCommissions, this.searchTerm)

    this.indexIsFinal = this.currentIndex == filteredImages.length - 1;

    if(this.panelHideTimeout != -1){
      clearInterval(this.panelHideTimeout);
    }

    this.imagePanel.nativeElement.hidden = false;
  }

  hideGallery(){
    if(!this.showPanel()) return;
    this.showPanel.set(false);
    this.panelHideTimeout = setTimeout(() => {
      this.imagePanel.nativeElement.hidden = true;
    }, 333);
  }

  toggleTagView(entry: ImageEntry, show: boolean){
    entry.isHovering.set(show);
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
