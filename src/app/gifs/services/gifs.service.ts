import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Types and interfaces
import { Gif, GifsResponse } from 'src/app/interfaces/gif-response';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {}
  private _baseUrl = "https://api.giphy.com/v1/gifs/"
  private _apiKey: string = "FsB8DSpwZpv8TDEfeQsa5OYKSrGlIDve";
  private _searchHistory: string[] = [];
  public results: Gif[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  searchGifs(searchQuery: string) {
    if (!this._searchHistory.includes(searchQuery.toLowerCase())) {
      this._searchHistory.unshift(searchQuery.toLowerCase());
      // Sets the history to only have 10 search terms.
      this._searchHistory = this._searchHistory.slice(0, 10);
    }

    this.http.get<GifsResponse>(`${this._baseUrl}search?api_key=${this._apiKey}&q=${searchQuery}&limit=9`)
      .subscribe((response) => {
        this.results = response.data;
      })    

  }
}
