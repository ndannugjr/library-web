import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  @Input({ required: true }) book!: Book;
}
