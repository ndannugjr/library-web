import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooksService } from '../books.service';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';


@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.css',
})
export class NewBookComponent {
  @Input({ required: true }) bookId!: string;
  @Output() close = new EventEmitter<Book>();

  enteredTitle = '';
  enteredAuthor = '';
  enteredIsbn = '';
  enteredPublishedDate = '';
  enteredSummary = '';

  constructor(private booksService: BooksService) {}

  onSubmit() {
    this.booksService
      .createBook({
        id: String(this.bookId),
        title: this.enteredTitle,
        author: this.enteredAuthor,
        isbn: this.enteredIsbn,
        publishedDate: this.enteredPublishedDate,
        summary: this.enteredSummary,
      })
      .subscribe((res) => {
        console.log(res);
      });

    this.close.emit({
      id: String(this.bookId),
      title: this.enteredTitle,
      author: this.enteredAuthor,
      isbn: this.enteredIsbn,
      publishedDate: this.enteredPublishedDate,
      summary: this.enteredSummary,
    });
  }
  onCancel() {
    this.close.emit({
      id: '0',
      title: this.enteredTitle,
      author: this.enteredAuthor,
      isbn: this.enteredIsbn,
      publishedDate: this.enteredPublishedDate,
      summary: this.enteredSummary,
    });
  }
}
