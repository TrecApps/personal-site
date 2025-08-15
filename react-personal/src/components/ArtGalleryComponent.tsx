import { Button, Container, Form } from "react-bootstrap";

import styles from "./component.module.css";
import React from "react";

import images from '../assets/Images.json';

import lessThan from "../assets/Less_than.png";
import xImage from "../assets/icons/X-image.png";
import { StylesService } from "@tc/tc-rc-general";

type ImageEntry = {
    url: string;
    artist: string;
    title: string;
    desc: string;
    isSelf: boolean;
    tags: string[];
}


export default function ArtGalleryComponent() {

    const startImage: ImageEntry = {
        url: "",
        artist: "",
        title: "",
        desc: "",
        isSelf: true,
        tags: []
    };

    const [showCommissions, setShowCommissions] = React.useState(true);
    const [showSelfArt, setShowSelfArt] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    const [useGallery, setUseGallery] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);
    //const [xButtonHover, setXButtonHover] = React.useState(false);

    const [imageWidth, setImageWidth] = React.useState(500);
    const [viewHeight, setViewHeight] = React.useState(600);
    const [galleryImageHeight, setGalleryImageHeight] = React.useState('600px');
    const [cardHeight, setCardHeight] = React.useState('600px');
    const [cardWidth, setCardWidth] = React.useState('500px');
    const [treatAsMobile, setTreatAsMobile] = React.useState(window.innerWidth < 500);

    const [selectedImage, setSelectedImage] = React.useState(startImage);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [indexIsFinal, setIndexIsFinal] = React.useState(false);


    const panelRef = React.createRef<HTMLDivElement>();

    const ss: StylesService = StylesService.getInstance();


    function filterImages(imageList: ImageEntry[]) : ImageEntry[] {
        let ret: ImageEntry[] = [];
        if(showCommissions && showSelfArt) {
            ret = imageList;
        } else if(showCommissions) {
            ret = imageList.filter((ie: ImageEntry) => !ie.isSelf);
        } else if(showSelfArt) {
            ret = imageList.filter((ie: ImageEntry) => ie.isSelf);
        }
        let term = searchTerm.trim();
        if(term.length){
            ret = ret.filter((ie: ImageEntry) => hasTag(term, ie));
        }
        return ret;
    }


    function hasTag(tag: string | undefined, entry: ImageEntry): boolean {
        if(!tag){
            return true;
        }
        let lTag = tag.toLowerCase();
        
        for(let t of entry.tags){
            let lt = t.toLowerCase();
            if(lt.indexOf(lTag) >= 0){
                return true;
            }
        }
        return false;
    }

    function updateSize() {
        
        let width = window.innerWidth;

        setTreatAsMobile(window.innerWidth < 500);

        setViewHeight(window.innerHeight);

        let tempWidth = (width - 35) / 6;
        if(tempWidth > 200) tempWidth = 200;

        setGalleryImageHeight(`${tempWidth}px`);
        tempWidth = Math.floor(tempWidth / 2 * 3);
        setCardHeight(`${tempWidth}px`);
        setCardWidth(`${tempWidth + 30}px`);

        setImageWidth(tempWidth);
    }
    window.addEventListener('resize', updateSize);

    //updateSize();

    function toggleTagView(
        ref: React.RefObject<HTMLDivElement | null>, isViewing: boolean){
        if(!ref.current) return;
        let classes = ref.current.className.split(' ');
        if(isViewing) {
            if(!classes.includes(styles.overExt))
                classes.push(styles.overExt);
        } else {
            classes = classes.filter((c: string) => c != styles.overExt);
        }

        ref.current.className = classes.join(' ');
            //ref.current.
    }

    function togglePanelView(isViewing: boolean) {
        if(!panelRef.current) return;
        let classes = panelRef.current.className.split(' ');
        if(isViewing) {
            if(!classes.includes(styles.imgPanelExt))
                classes.push(styles.imgPanelExt);
        } else {
            classes = classes.filter((c: string) => c != styles.imgPanelExt);
        }

        panelRef.current.className = classes.join(' ');
    }

    function setImageEntryCaller(ie: ImageEntry, i: number) {
        setSelectedImage(ie);
        setCurrentIndex(i);
        togglePanelView(true);

        let filteredImages = filterImages(images);
        setIndexIsFinal(i == filteredImages.length - 1);
    }

    function switchImage(forward: boolean) {
        let filteredImages = filterImages(images);
        if(forward){
            if(currentIndex == filteredImages.length - 1)
            {
                setIndexIsFinal(true);
                return;
            }

            let nextIndex = currentIndex+1

            setCurrentIndex(nextIndex);
            setImageEntryCaller(filteredImages[nextIndex], nextIndex);
            if(nextIndex == filteredImages.length - 1)
            {
                setIndexIsFinal(true);
                return;
            }
        } else {
            if(currentIndex == filteredImages.length - 1){
                setIndexIsFinal(false);
            }

            if(!currentIndex) return;
            let prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setImageEntryCaller(filteredImages[prevIndex], prevIndex);
    }
    }

    function getGalleryElements() {
        return filterImages(images).map((entry: ImageEntry, index: number) => {

            const divRef = React.createRef<HTMLDivElement>();

            return (
                <li style={{height: galleryImageHeight}} className={ss.getElementItemClasses('')}>
            <div onMouseEnter={()=> toggleTagView(divRef, true)}   onMouseLeave={() => toggleTagView(divRef, false)}
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    position: "relative"}}
                onClick={() => setImageEntryCaller(entry, index)}>
                <img className={[styles.imageEntry, "mx-auto"].join(' ')} src={entry.url} alt={entry.title} />
                <div className={styles.overlay} ref={divRef}>
                    <span style={{color:"white"}}>{entry.title}</span>
                    <ul style={{listStyleType: "none"}}>
                        { entry.tags.map((tag: string) => ( <li style={{color:"white"}}>#{tag}</li> )) }
                    </ul>
                </div>
            </div>
        </li>
            );


        })
    }

    function getCardElements(){
        return filterImages(images).map((entry: ImageEntry, index: number) => { 

            const divRef = React.createRef<HTMLDivElement>();
            
            return (
                <li  className={ss.getElementItemClasses('')}>
                    <div className={styles.imageCard} style={{ width: cardWidth}}>
                        <div onMouseEnter={()=> toggleTagView(divRef, true)}   onMouseLeave={() => toggleTagView(divRef, false)}
                            className={styles.cardEntryWrapper} onClick={()=> setImageEntryCaller(entry, index)} style={{ height: cardHeight}}>
                            <img className={[styles.cardEntry, "mx-auto"].join(' ')} src={entry.url} alt={entry.title} />
                            <div className={styles.overlay} ref={divRef}>
                                <span style={{color:"white"}}>{entry.title}</span>
                                <ul style={{listStyleType: "none"}}>
                                    { entry.tags.map((tag: string) => ( <li style={{color:"white"}}>#{tag}</li> )) }
                                </ul>
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <p style={{ textAlign: "center", color:"white" }}><b>Title: </b>{ entry.title }</p>
                        </div>
                    </div>
                </li>
            )
        })
    }

    const imageList = (useGallery && !treatAsMobile) ? 
            getGalleryElements():
            getCardElements(); 



    return (
        <Container onLoad={() => updateSize()}
        //  style={{
        //     backgroundColor:"rgb(63, 227, 248)",
        //     backgroundSize: "cover",
        //     backgroundRepeat: "repeat-y",
        //     minHeight: "100%"}}
            className={ss.getElementContainerClasses('')}
        >

            <div className={styles.flexAndCenter} style={{gap: "5px"}}>
                <Button variant="info" onClick={() => {
                        setShowCommissions(false);
                        setShowSelfArt(true);
                    }}>Self Art</Button>
                <Button variant="info" onClick={() => {
                        setShowCommissions(true);
                        setShowSelfArt(true);
                    }}>All Art</Button>
                <Button variant="info" onClick={() => {
                        setShowCommissions(true);
                        setShowSelfArt(false);
                    }}>Commissioned Art</Button>
                
            </div>


            <div style={{
                gap:"15px",
                flexWrap: "wrap",
                marginBottom: "10px"}}
                className={styles.flexAndCenter}
                //  *ngIf="imageWidth >= 500"
                >
                <div className="form-check">
                    <Form.Check id="galleryT" type="radio" name="galleryType" checked={ useGallery } onClick={()=> setUseGallery(true)} />
                    <Form.Label for="gelleryT" class="form-check-label">Use Gallery</Form.Label>
                </div>
                <div className="form-check">
                    <Form.Check id="galleryT" type="radio" name="galleryType" checked={ !useGallery } onClick={()=> setUseGallery(false)} />
                    <Form.Label for="gelleryT" class="form-check-label">Use Cards</Form.Label>
                </div>
            </div>
            <br/>







    <ul className={styles.imageGal}>
        {imageList}
    </ul> 


    <div style={{height:"300px"}}></div>


    <div ref={panelRef} className={styles.imgPanel}
        style={{
            border: "3px solid lightgreen",
            position: "fixed",
            bottom: "0px",
            width: "100%",
            marginLeft: "-15px",
            maxWidth:"inherit",
            backgroundColor: "rgb(63, 227, 248)",
            zIndex: 10 }}>
    {
        selectedImage.url.length ?
    
(
    <div className={styles.imageViewer} style={{maxHeight : viewHeight * 0.75 + 'px'}}>
        <div className={styles.switchHolder}>

            {
                currentIndex ? 
                    (
                        <img src={lessThan} style={{position: "absolute", left:0}} className={styles.browseImg} onClick={() => switchImage(false)} />
                    ) : (<div></div>)
            }


            {
                !indexIsFinal ? 
                    (
                        <img src={lessThan} style={{position: "absolute", right:0}} className={[styles.browseImg,  styles.imgRev].join(' ')} onClick={() => switchImage(true)} />
                    ) : (<div></div>)
            }
            
            
        </div>
        
        <img src={selectedImage.url} />
        
    </div>) : <div></div>
    
    }
    
    <div style={{
        display: "flex", flexDirection: "column", margin: "10px", justifyContent: "center", alignItems: "center", gap:"5px"}}>
        <div style={{display: "flex", flexDirection: "row", margin: "5px", justifyContent: "center", alignItems: "center", gap:"10px", width:"100%"}}>
            <Form.Control type="text" placeholder="Search By Tag" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            <div className={styles.redButtonContainer}>
                    
                <button onClick={() => togglePanelView(false)}><img src={xImage} alt="exit button" /></button>
            </div>
        </div>
    </div>
    
    {
        selectedImage.url.length ?
            (
                <div>
            <p style={{textAlign: "center", margin:"5px"}}><b>Title: </b>{ selectedImage.title }</p>
            <p style={{textAlign: "center", margin:"5px"}}><b>Artist: </b>{ selectedImage.artist}</p>
            <p style={{textAlign: "center", margin:"5px"}}><b>Desc: </b>{ selectedImage.desc }</p>
            <div style={{display: "flex", justifyContent: "center", padding: "5px"}}>
                <Button variant="info" onClick={() => setImageEntryCaller(startImage, 0)}>Remove Stats</Button>
            </div>
            </div>
            ) : ( <div></div>)
    }

    
    
    </div>

    {
        showPanel ? 

        (<div></div>) :
        (<Button variant="primary" className={styles.actSearch} onClick={() => (setImageEntryCaller(selectedImage, currentIndex))}>Show Search</Button>)

    }



    


        </Container>
    );
}