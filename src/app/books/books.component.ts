import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  @Input({ required: true }) selected!: boolean;
  @Input({ required: true }) book!: Book;
  @Output() select = new EventEmitter<string>();

  onSelectBook() {
    this.select.emit(this.book.id);
  }
}
