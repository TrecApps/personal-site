import { useReducer } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { StylesService } from '@tc/tc-rc-general';

import { useDispatch } from "react-redux"
import type { AppDispatch } from './services/state-manager';
import AboutMeComponent from './components/AboutMeComponent';
import ArtGalleryComponent from './components/ArtGalleryComponent';
import SiteHistoryComponent from './components/SiteHistoryComponent';
import TrooperMatchComponent from './components/TrooperMatchComponent';

function App() {

    const [, forceUpdate] = useReducer(x => x + 1, 0);

  function doUpdate() {
    forceUpdate();
  }

  const stylesService: StylesService = StylesService.getInstance(doUpdate);
  const dispatch = useDispatch<AppDispatch>();


   stylesService.prepSelection();

  return (
    <div>
    <header>


  <div 
    className={stylesService.getElementContainerClasses('')}
  >
    <Navbar expand="lg" className="navbar-light">
        <Navbar.Toggle aria-controls="jljacko-navbar-nav" />
        <Navbar.Collapse id="jljacko-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link as={Link} to="/AboutMe">About Me</Nav.Link>
              <Nav.Link as={Link} to="/Match">Trooper Match</Nav.Link>
              <Nav.Link as={Link} to="/Gallery">Art Gallery</Nav.Link>
              <Nav.Link as={Link} to="/History">Site History</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>

    </Navbar>
        
  </div>
</header>

    <Routes>
      <Route path="/" element={<Navigate to="AboutMe" replace />} />

        <Route path="AboutMe" element={ <AboutMeComponent /> } />
        <Route path="Match" element={ <TrooperMatchComponent /> } />
      
        <Route path="Gallery" element={ <ArtGalleryComponent /> } />
        <Route path="History" element={ <SiteHistoryComponent /> } />
    </Routes>


  </div>
  )
}

export default App
