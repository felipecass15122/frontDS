import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicPlaylistComponent } from './add-music-playlist.component';

describe('AddMusicPlaylistComponent', () => {
  let component: AddMusicPlaylistComponent;
  let fixture: ComponentFixture<AddMusicPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMusicPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMusicPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
