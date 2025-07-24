import { TestBed } from '@angular/core/testing';

import { MusicaPlaylistService } from './musica-playlist.service';

describe('MusicaPlaylistService', () => {
  let service: MusicaPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
