import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = 'https://localhost:7029/';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'book');
  }

  createBook(book: Book) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Book>(this.baseUrl + 'book', book, httpOptions);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'book/' + bookId);
  }
}
