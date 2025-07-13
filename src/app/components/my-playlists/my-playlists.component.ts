import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-my-playlists',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './my-playlists.component.html',
  styleUrl: './my-playlists.component.css'
})
export class MyPlaylistsComponent {

}
