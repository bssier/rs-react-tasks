import { Component, type ErrorInfo } from 'react';
import type { ReactNode } from 'react';
import './error-boudary.css';

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

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className={'error-boudary-container'}>
            <h1> Something went wrong. </h1>
            <span className={'not-found-text'}>
              back to <a href={'/'}>main page</a>
            </span>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
