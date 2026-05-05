import { Component } from 'react';
import './book-line.css';

interface Book {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface BookProps {
  book: Book;
}

export class BookLine extends Component<BookProps> {
  render() {
    const { title, author_name, first_publish_year } = this.props.book;
    return (
      <tr className={'book-line'}>
        <td className={'book-title'}>{title}</td>
        <td className={'author-name'}>{author_name}</td>
        <td>{first_publish_year}</td>
      </tr>
    );
  }
}
