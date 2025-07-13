import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AddMusicToPlaylistComponent } from "../../popups/add-music-to-playlist/add-music-to-playlist.component";

@Component({
  selector: 'app-add-music-playlist',
  standalone: true,
  imports: [NavBarComponent, AddMusicToPlaylistComponent],
  templateUrl: './add-music-playlist.component.html',
  styleUrl: './add-music-playlist.component.css'
})
export class AddMusicPlaylistComponent {

}
