// Core imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Types and interfaces
import { Gif, GifsResponse } from 'src/app/interfaces/gif-response';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this._searchHistory = JSON.parse(sessionStorage.getItem('history')!) || [];
    this.results = JSON.parse(sessionStorage.getItem('lastResults')!) || [];
  }
  
  private _baseUrl: string = "https://api.giphy.com/v1/gifs/search?";
  private _apiKey: string = "FsB8DSpwZpv8TDEfeQsa5OYKSrGlIDve";
  private _limit = '9'
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
      sessionStorage.setItem('history', JSON.stringify(this._searchHistory))
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', searchQuery)
      .set('limit', this._limit);

    this.http.get<GifsResponse>(`${this._baseUrl}`, { params })
      .subscribe((response) => {
        sessionStorage.setItem('lastResults', JSON.stringify(response.data));
        this.results = response.data;
      })    

  }
}
