import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header';
import { HomePage } from './pages/home-page/HomePage';
import { Footer } from './Components/Footer/Footer';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ErrorBoudary } from './Components/ErrorBoudary/ErrorBoudary';

export class App extends Component {
  state = {
    searchQuery: localStorage.getItem('input-value') || '',
  };
  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <ErrorBoudary>
        <BrowserRouter>
          <Header
            handleSearch={this.handleSearch}
            searchQuery={this.state.searchQuery}
          />
          <Routes>
            <Route
              path={'/'}
              element={<HomePage query={this.state.searchQuery} />}
            />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ErrorBoudary>
    );
  }
}
