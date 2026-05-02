import { Component } from 'react';
import { BookLine } from '../../Components/BookLine/BookLine.tsx';
import './home-page.css';

interface HomePageProps {
  query: string;
}

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface HomePageState {
  books: Book[];
  isLoading: boolean;
  currentPage: number;
  totalBooks: number;
}

export class HomePage extends Component<HomePageProps, HomePageState> {
  state: HomePageState = {
    books: [],
    isLoading: false,
    currentPage: 1,
    totalBooks: 0,
  };

  fetchBooks = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery || searchQuery.trim().length < 3) return;
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=15&page=${page}`
      );
      const data = await response.json();
      this.setState({
        books: data.docs,
        totalBooks: data.numFound,
        isLoading: false,
        currentPage: page,
      });
    } catch (err) {
      console.log('Ошибка', err);
    }
  };

  componentDidMount() {
    if (this.props.query) {
      this.fetchBooks(this.props.query, 1);
    }
  }

  componentDidUpdate(prevProps: HomePageProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchBooks(this.props.query, 1);
    }
  }

  handlePageChange = (direction: 'next' | 'prev') => {
    const { currentPage, totalBooks } = this.state;
    const maxPage = Math.ceil(totalBooks / 15);

    if (direction === 'next' && currentPage < maxPage) {
      this.fetchBooks(this.props.query, currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      this.fetchBooks(this.props.query, currentPage - 1);
    }
  };

  render() {
    const { books, isLoading, currentPage, totalBooks } = this.state;
    const maxPage = Math.ceil(totalBooks / 15);
    return (
      <main>
        {!localStorage.getItem('input-value') && (
          <div className={'greeting-menu'}>
            <span>
              Hi, dear user! As you might have guessed, this is a book search
              app. If you want to find something, enter the author's name or the
              book's title, but it must be strictly in English.
            </span>
            <span>
              And please don't be angry about the long loading time. It's not a
              problem with your internet connection, it's just that the Book API
              is so huge that if you enter a four-character query, for example,
              it can take a very long time to find the books you need. So if you
              don't want to wait forever, make a more precise query.
            </span>
          </div>
        )}
        {isLoading && <div className={'loader'}>loading...</div>}
        {!isLoading && this.props.query && totalBooks === 0 && (
          <div className={'no-result'}>
            Sorry, we have a very large library, but we couldn't find anything
            for your request(
          </div>
        )}
        <table
          className={'book-table'}
          style={{
            display: isLoading || books.length === 0 ? 'none' : 'table',
          }}
        >
          <thead>
            <tr>
              <td>Title</td>
              <td>Author</td>
              <td>Publish year</td>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <BookLine key={book.key} book={book} />
            ))}
          </tbody>
        </table>
        {(totalBooks > 0 || isLoading) && (
          <div className={'pagination'}>
            <div
              className={'prev-button-container'}
              onClick={() => this.handlePageChange('prev')}
            >
              <span className={'prev-button'}>prev</span>
            </div>
            <div className={'counter-container'}>
              {currentPage} / {maxPage}
            </div>
            <div
              className={'next-button-container'}
              onClick={() => this.handlePageChange('next')}
            >
              <span className={'next-button'}>next</span>
            </div>
          </div>
        )}
      </main>
    );
  }
}
