import { Component } from 'react';
import './Header.css';
import { Search } from '../../assets/Search.tsx';
import { BookIcon } from '../../assets/BookIcon.tsx';

interface PropsHeader {
  handleSearch: (query: string) => void;
  searchQuery: string;
}

interface HeaderState {
  inputValue: string;
}

export class Header extends Component<PropsHeader, HeaderState> {
  state: HeaderState = {
    inputValue: localStorage.getItem('input-value') || '',
  };

  searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExpOnlyEngSym = /^[a-zA-Z\s]*$/;
    const value = e.target.value;

    if (regExpOnlyEngSym.test(value)) {
      this.setState({ inputValue: e.target.value });
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      if (this.state.inputValue.trim() === this.props.searchQuery){
        return
      }

      if (value.trim().length >= 3) {
        this.searchDebounceTimer = setTimeout(() => {
          this.props.handleSearch(value);
          localStorage.setItem('input-value', value);
        }, 600);
      }
    }
  };

  handleSearchClick = () => {
    if (this.state.inputValue.trim()) {
      this.props.handleSearch(this.state.inputValue);
    }
  };

  handleEnterClick = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
  };

  render() {
    return (
      <header>
        <div className={'logo'}>
          <div className={'logo-container'}>
            <BookIcon />
            <div className={'text-logo-container'}>
              <span className={'text-logo'}>findyoubook.com</span>
              <span className={'text-logo-description'}>
                read.think.improve.inspired
              </span>
            </div>
          </div>
        </div>
        <div className={'search-container'}>
          <input
            type={'text'}
            className={'search-input'}
            placeholder={'Search books... 👀'}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleEnterClick}
          />
          <button className={'search-button'} onClick={this.handleSearchClick}>
            <div className={'search-icon-container'}>
              <Search />
            </div>
          </button>
        </div>
      </header>
    );
  }
}
