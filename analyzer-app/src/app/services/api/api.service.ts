import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volume } from '../../models/volume/volume';
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private categoriesApiURL = 'assets/api/categories.json';
  private dataApiURL = 'assets/api/volumes-${id}.json'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.categoriesApiURL);
  }

  getDataByCategory(id: Number): Observable<Volume[]> {
    return this.http.get<Volume[]>(this.dataApiURL.replace('${id}', id.toString()));
  }
}
