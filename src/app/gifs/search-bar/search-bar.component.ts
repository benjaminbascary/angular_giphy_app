import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  constructor(private searchGifsService: GifsService) { };



  // With non-null assertion operator and generic type
  @ViewChild('searchText') searchText!: ElementRef<HTMLInputElement>;

  search() {
    const searchValue = this.searchText.nativeElement.value
    if (searchValue) {
      this.searchGifsService.searchGifs(searchValue.trim());
      this.searchText.nativeElement.value = '';
    }
  }



}
