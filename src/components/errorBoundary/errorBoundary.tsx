import React, { ErrorInfo } from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    console.log("ERROR OCCURED", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ooops! Error occured. Please, reload page</h1>;
    }
    return this.props.children;
  }
}
