import React, { useEffect, useReducer, type JSX } from 'react'
import { Link, Navigate, Route, Routes, useLocation  } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { StylesService, Popup } from '@tc/tc-rc-general';

import { useDispatch } from "react-redux"
import type { AppDispatch } from './services/state-manager';
import AboutMeComponent from './components/AboutMeComponent';
import ArtGalleryComponent from './components/ArtGalleryComponent';
import SiteHistoryComponent from './components/SiteHistoryComponent';
import GameComponent from './components/GameComponent';
import ColorPanel, { type ColorOption } from './components/ColorPanelComponent';

const colorList: ColorOption[] = [
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

function App() {



  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [showStylePopup, setShowStylePopup] = React.useState<boolean>(false);
  const [colorChanged, setColorChanged] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

const location = useLocation(); // Access the location object

  useEffect(() => {
 
    document.body.classList.add(stylesService.isDark ? 'body-dark' : 'body-light');

    toggleNavLinks(stylesService.isDark);

  }, []);

  const stylesService: StylesService = StylesService.getInstance(doUpdate);
    stylesService.prepSelection();

  function doUpdate() {
    forceUpdate();
  }

  function toggleNavLinks(isDark: boolean | undefined){
    let navLinks: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-link');

    for(let c = 0; c < navLinks.length; c++){
      let navLink: Element | null = navLinks.item(c);

      if(!navLink) continue;

      if(isDark)
        navLink.classList.add('dark-mode-link');
      else
        navLink.classList.remove('dark-mode-link');
    }
  }









  function updateStyle(){
    let curStyle = stylesService.style;
    if(curStyle.startsWith("dark-"))
      curStyle = curStyle.substring(5);
    localStorage.setItem("tc_style_color", curStyle);
    localStorage.setItem("tc_style_dark", stylesService.isDark ? 'true' : 'false');
    setColorChanged(false);
  }
  

  

  function onColorSelect(color: string) {
    dispatch(stylesService.getActions().setStyle(color));
    setColorChanged(true);
  }

  function onDarkChecked(event: React.ChangeEvent<HTMLInputElement>){
    dispatch(stylesService.getActions().setDarkMode(event.target.checked));
    toggleNavLinks(event.target.checked);
    document.body.classList.toggle('body-dark');
    setColorChanged(true);
  }

  
  function popupDisplay(): JSX.Element {
      return (
        <div hidden={!showStylePopup}>
          <Popup isActive={false} onClose={() => setShowStylePopup(false)}  showXBar={true}>
            <ColorPanel colors={colorList} onColorSelect={onColorSelect}/>

            <div className="form-group">
              <input 
                type="checkbox" 
                className="form-check-input"
                checked={stylesService.isDark}
                onChange={onDarkChecked}
              />
              <label className="form-check-label">Use Dark mode</label>

              <div className={stylesService.getElementItemClasses('')} style={{height: "10px"}}></div>
              <p><b>Note: </b> Persisting Style wil write to Local Storage</p>
              <button disabled={!colorChanged} className="btn btn-primary" onClick={updateStyle}> Persist Style</button>
            </div>

          </Popup>  
        </div>
      )
  }


  return (
    <div>
    <header>


    <div 
      className={stylesService.getElementContainerClasses('navShadow')}
      style={{padding: 0}}
    >
      <Navbar expand="lg" className="navbar-light " style={{padding: "8px 0 8px 5px"}}>
          <Navbar.Toggle aria-controls="jljacko-navbar-nav"/>
          <Navbar.Collapse id="jljacko-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/AboutMe">About Me</Nav.Link>
                <Nav.Link as={Link} to="/Games">Games</Nav.Link>
                <Nav.Link as={Link} to="/Gallery">Art Gallery</Nav.Link>
                <Nav.Link as={Link} to="/History">Site History</Nav.Link>
                <li className="nav-item" style={{paddingLeft:"5px"}}><a className="nav-link">|</a></li>
              
                <li className="nav-item" style={{paddingLeft:"5px"}}><a className="nav-link" onClick={() => setShowStylePopup(true)}>Set Style</a></li>

                <li className="nav-item" style={{paddingLeft:"5px"}}><a className="nav-link">|</a></li>

                <li className='nav-item' style={{paddingLeft:"5px"}}>
                  <a 
                    className='nav-link' 
                    href={"https://jljacko.trecapps.com/" + location.pathname.replace("/React", "").replace("/react", "")}
                    target='_blank'
                  >View Angular Version</a></li>
            </Nav>
          </Navbar.Collapse>

      </Navbar>

      {popupDisplay()}
        
    </div>
    </header>

    <Routes>
      <Route path="/" element={<Navigate to="AboutMe" replace />} />
      <Route path="" element={<Navigate to="AboutMe" replace />} />
      <Route path="/React" element={<Navigate to="AboutMe" replace />} />
      <Route path="React" element={<Navigate to="AboutMe" replace />} />
      <Route path="/React/" element={<Navigate to="AboutMe" replace />} />
      <Route path="React/" element={<Navigate to="AboutMe" replace />} />

        <Route path="AboutMe" element={ <AboutMeComponent /> } />
        <Route path="Games" element={ <GameComponent /> } />
      
        <Route path="Gallery" element={ <ArtGalleryComponent /> } />
        <Route path="History" element={ <SiteHistoryComponent /> } />
        {/* <Route path="*" element={<Navigate to="AboutMe" replace />} /> */}
    </Routes>


  </div>
  )
}

export default App
