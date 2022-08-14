import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(public gifsService: GifsService) {}

  getHistory() {
    return this.gifsService.searchHistory;
  }

  handleSidebarClick(listItem: string) {
    this.gifsService.searchGifs(listItem);
  }

}
