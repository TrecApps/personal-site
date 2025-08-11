export class ImageEntry{
    url: string;
    artist: string;
    title: string;
    desc: string;
    isSelf: boolean;
    tags: string[];
    isHovering: boolean;

    constructor(url: string,
        artist: string,
        title: string,
        desc: string,
        isSelf: boolean,
        tags: string[]){

            this.artist = artist;
            this.isSelf = isSelf;
            this.url = url;
            this.tags = tags;
            this.title = title;
            this.desc = desc;
            this.isHovering = false;
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