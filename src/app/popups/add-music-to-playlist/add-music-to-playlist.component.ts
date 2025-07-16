import { Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-add-music-to-playlist',
  standalone: true,
  imports: [],
  templateUrl: './add-music-to-playlist.component.html',
  styleUrl: './add-music-to-playlist.component.css'
})
export class AddMusicToPlaylistComponent {
  isModalVisible: boolean = false;

  @Output() closeRequest = new EventEmitter<void>();
   onClose(): void {
    this.closeRequest.emit();
  }
}
