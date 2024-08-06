import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../../models/book.model';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { NewBookComponent } from '../new-book/new-book.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [BookDetailsComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnChanges {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) bookId!: string;

  book: Book = {
    id: '0',
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    summary: '',
  };

  isAddingBook = false;

  constructor(private bookService: BooksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId'] && changes['bookId'].currentValue) {
      this.bookService.getBookById(this.bookId).subscribe({
        next: (res) => {
          this.book = res;
        },
      });

      console.log(this.book);
    }
  }

  get selectedBook() {
    return this.book;
  }
}
