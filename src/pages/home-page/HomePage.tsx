import { Component } from 'react';
import { Line } from '../../Components/Line/Line.tsx';
import './home-page.css';

interface HomePageProps {
  query: string;
}

interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

interface HomePageData {
  isLoading: boolean;
  errorMessage: string;
  items: Item[] | null;
}

export class HomePage extends Component<HomePageProps, HomePageData> {
  state: HomePageData = {
    isLoading: false,
    errorMessage: '',
    items: null,
  };

  fetchData = async (query: string) => {
    if (!query || query.trim().length < 3) return;
    this.setState({ isLoading: true, items: null, errorMessage: '' });
    const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Not found');
        }
        if (response.status >= 500) {
          throw new Error('Server error. We try fix problem, please wait');
        }
        throw new Error('Error data loading');
      }
      const data = await response.json();

      const mappedItem: Item = {
        title: data.name,
        img: data.sprites.front_default || '',
        hp: data.stats[0]?.base_stat || 0,
        attack: data.stats[1]?.base_stat || 0,
        defense: data.stats[2]?.base_stat || 0,
        speed: data.stats[5]?.base_stat || 0,
      };

      this.setState({
        items: [mappedItem],
        isLoading: false,
      });
    } catch (err) {
      let errorMessage = '';

      if (err instanceof Error) {
        errorMessage = err.message;
      }
      this.setState({ errorMessage: errorMessage, isLoading: false });
    }
  };

  componentDidMount() {
    if (this.props.query) {
      this.fetchData(this.props.query);
    }
  }

  componentDidUpdate(prevProps: HomePageProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchData(this.props.query);
    }
  }

  render() {
    const { isLoading, errorMessage } = this.state;
    return (
      <main>
        {!localStorage.getItem('input-value') && (
          <div className={'greeting-menu'}>
            <span>
              Hi, dear user! As you might have guessed, this is a app about
              search pokemons. If you want to find something, enter the pokemon
              name but it must be strictly in English.
            </span>
          </div>
        )}
        {isLoading && <div className={'loader'}>loading...</div>}
        {errorMessage && (
          <div className={'error-showing-container'}>
            <span>{errorMessage}</span>
          </div>
        )}
        <div className={'list-wrapper'}>
          <div className={'list'}>
            {this.state.items && <Line item={this.state.items[0]} />}
          </div>
        </div>
      </main>
    );
  }
}
