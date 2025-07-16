import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AddMusicToPlaylistComponent } from "../../popups/add-music-to-playlist/add-music-to-playlist.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-music-playlist',
  standalone: true,
  imports: [NavBarComponent, AddMusicToPlaylistComponent, CommonModule, FormsModule],
  templateUrl: './add-music-playlist.component.html',
  styleUrl: './add-music-playlist.component.css'
})
export class AddMusicPlaylistComponent {
  
  isModalVisible: boolean = false;
  abrirModal(): void{
    this.isModalVisible = true;
  }

  fecharModal(): void {
    this.isModalVisible = false;
  
  }
}
