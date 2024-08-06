import { Component, DestroyRef, inject } from '@angular/core';
import { Book } from './models/book.model';
import { BooksService } from './books/books.service';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { HeaderComponent } from './header/header.component';
import { NewBookComponent } from './books/new-book/new-book.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksComponent, BookComponent, HeaderComponent, NewBookComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  books: Book[] = [];
  selectedBookId?: string;
  isAddingBook = false;
  private destroyRef = inject(DestroyRef);

  constructor(private booksService: BooksService) {}
  ngOnInit(): void {
    const subscription = this.booksService.getBooks().subscribe({
      next: (res) => (this.books = res),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    console.log(this.books);
  }

  get selectedBook() {
    return this.books.find((s) => s.id === this.selectedBookId);
  }

  get bookId() {
    const ids = this.books.map((p) => Number(p.id));
    return String(Math.max(...ids));
  }

  onSelectBook(id: string) {
    this.selectedBookId = id;
  }

  onStartAddBook() {
    this.isAddingBook = true;
  }

  onCloseAddBook(book: Book) {
    this.isAddingBook = false;
    if (book.id != '0') {
      this.books.push(book);
    }
  }
}
