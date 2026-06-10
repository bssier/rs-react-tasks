import { Component, type ErrorInfo } from 'react';
import type { ReactNode } from 'react';
import './ErrorBoudary.css';
import { Link } from 'react-router';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoudary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  handleResetError() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <main className={'error-boudary-container'}>
            <h1> Something went wrong. </h1>
            <p className={'not-found-text'}>
              back to{' '}
              <Link to={'/'} onClick={this.handleResetError}>
                main page
              </Link>
            </p>
          </main>
        )
      );
    }

    return this.props.children;
  }
}
