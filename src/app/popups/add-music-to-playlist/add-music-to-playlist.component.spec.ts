import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicToPlaylistComponent } from './add-music-to-playlist.component';

describe('AddMusicToPlaylistComponent', () => {
  let component: AddMusicToPlaylistComponent;
  let fixture: ComponentFixture<AddMusicToPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMusicToPlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMusicToPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
