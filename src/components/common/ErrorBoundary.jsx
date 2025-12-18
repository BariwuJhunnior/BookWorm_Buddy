import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log error for debugging
    // You can integrate with a logging service here
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border rounded bg-red-50 text-red-700 max-w-sm">
          <strong>Something went wrong rendering this book.</strong>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
