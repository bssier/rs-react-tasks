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

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExpOnlyEngSym = /^[a-zA-Z\s]*$/;
    const value = e.target.value;

    if (regExpOnlyEngSym.test(value)) {
      this.setState({ inputValue: value });
    }
  };

  handleSearchClick = () => {
    const valueWithoutspace = this.state.inputValue.trim().trimStart();

    if (valueWithoutspace === this.props.searchQuery) {
      this.setState({ inputValue: valueWithoutspace });
      return;
    }

    if (valueWithoutspace.length >= 3) {
      this.props.handleSearch(valueWithoutspace);
      this.setState({ inputValue: valueWithoutspace });
      localStorage.setItem('input-value', valueWithoutspace);
    }
  };

  handleEnterClick = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
  };
  generateError = () => {
    this.setState(() => {
      throw new Error('Special error');
    });
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
        <div className={'error-generate-container'}>
          <button onClick={this.generateError}>Generate Error</button>
        </div>
      </header>
    );
  }
}
