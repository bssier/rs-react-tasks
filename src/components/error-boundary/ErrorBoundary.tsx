import { Component, type ErrorInfo } from 'react';
import type { ReactNode } from 'react';
import './ErrorBoundary.css';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  public handleResetError = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main className="error-boudary-container">
            <h1> Something went wrong. </h1>
            <p className="not-found-text">
              back to{' '}
              <Link to="/" onClick={this.handleResetError}>
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
