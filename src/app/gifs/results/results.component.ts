import { Component } from '@angular/core';
import { Gif } from 'src/app/interfaces/gif-response';

// Developer's modules
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  
  constructor(private gifsService: GifsService) {}

  get results(): Gif[] {
    return this.gifsService.results;
  }
}
