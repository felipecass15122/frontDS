import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { AddArtistaComponent } from './components/add-artista/add-artista.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AddMusicPlaylistComponent } from './components/add-music-playlist/add-music-playlist.component';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { HomeComponent } from './components/home/home.component';
import { MyPlaylistsComponent } from './components/my-playlists/my-playlists.component';

export const routes: Routes = [
    { path: 'cadastro', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'playlist/:id', component: PlaylistViewComponent },
    { 
      path: 'addMusic', 
      loadComponent: () => import('./components/add-music/add-music.component').then(c => c.AddMusicComponent) 
    },
    { path: 'addArtista', component: AddArtistaComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'addMusicPlaylist', component: AddMusicPlaylistComponent },
    { path: 'createPlaylist', component: CreatePlaylistComponent },
    { path: 'home', component: HomeComponent },
    { path: 'minhasPlaylists', component: MyPlaylistsComponent }
     
];
