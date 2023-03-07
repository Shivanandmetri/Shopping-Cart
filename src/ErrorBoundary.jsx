import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,

  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.log(info);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      return <p className="text-red-500 text-center text-2xl font-bold">{error.message}</p>;
    }
    return children;
  }
}
