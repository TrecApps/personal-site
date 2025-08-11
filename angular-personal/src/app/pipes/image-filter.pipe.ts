import { Pipe, PipeTransform } from '@angular/core';
import { ImageEntry } from '../models/image-entry';

@Pipe({
  name: 'imageFilter',
  standalone: true
})
export class ImageFilterPipe implements PipeTransform {

  hasTag(tags: string[], tag: string | undefined): boolean {
    if(!tag){
        return true;
    }
    let lTag = tag.toLowerCase();
    
    for(let t of tags){
        let lt = t.toLowerCase();
        if(lt.indexOf(lTag) >= 0){
            return true;
        }
    }
    return false;

}

  transform(value: ImageEntry[], showSelf: boolean, showComm: boolean, tag?: string): ImageEntry[] {
    if(!value){
      return value;
    }

    return value.filter((entry: ImageEntry) => {
      return ((entry.isSelf && showSelf) || (!entry.isSelf && showComm)) && this.hasTag(entry.tags,tag); 
    })

  }
}
