import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header.tsx';
import { HomePage } from './pages/home-page/HomePage.tsx';
import { Footer } from './Components/Footer/Footer.tsx';
import { NotFoundPage } from './pages/not-found/NotFoundPage.tsx';
import { ErrorBoudary } from './Components/ErrorBoudary/ErrorBoudary.tsx';

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
