import { signal, WritableSignal } from "@angular/core";


export interface JsonImageEntry {
    url: string;
    artist: string;
    title: string;
    desc: string;
    isSelf: boolean;
    tags: string[];
    isHovering: boolean;
}

export class ImageEntry{
    url: string;
    artist: string;
    title: string;
    desc: string;
    isSelf: boolean;
    tags: string[];
    isHovering: WritableSignal<boolean>;

    constructor(entry: JsonImageEntry){

            this.artist = entry.artist;
            this.isSelf = entry.isSelf;
            this.url = entry.url;
            this.tags = entry.tags;
            this.title = entry.title;
            this.desc = entry.desc;
            this.isHovering = signal(entry.isHovering);
    }
    hasTag(tag: string | undefined): boolean {
        if(!tag){
            return true;
        }
        let lTag = tag.toLowerCase();
        
        for(let t of this.tags){
            let lt = t.toLowerCase();
            if(lt.indexOf(lTag) >= 0){
                return true;
            }
        }
        return false;

    }
}