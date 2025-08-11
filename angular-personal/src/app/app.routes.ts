import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ArtGalleryComponent } from './components/art-gallery/art-gallery.component';
import { SiteHistoryComponent } from './components/site-history/site-history.component';

export const routes: Routes = [	
{ path: 'AboutMe', component: AboutMeComponent},
{ path: 'Games', component: GameComponent },
{ path: 'Gallery', component: ArtGalleryComponent},
{ path: 'History', component: SiteHistoryComponent},
{ path: '',   redirectTo: '/AboutMe', pathMatch: 'full'}];
