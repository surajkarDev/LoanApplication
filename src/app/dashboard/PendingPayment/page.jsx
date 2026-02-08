'use client';
import React, { Component } from "react";

class PendingPayment extends Component {
  /* =========================
     1. MOUNTING PHASE
     ========================= */

  constructor(props) {
    super(props);
    console.log("constructor");

    this.state = {
      count: 0,
      show: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    // return null or updated state
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
    // API calls, subscriptions, timers
  }

  /* =========================
     2. UPDATING PHASE
     ========================= */

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true; // false will stop re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    // capture DOM info (scroll position etc.)
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    // respond to state/prop changes
  }

  /* =========================
     3. UNMOUNTING PHASE
     ========================= */

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // cleanup: timers, listeners
  }

  /* =========================
     4. ERROR HANDLING
     ========================= */

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError");
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch", error, info);
    // log error
  }

  /* =========================
     HANDLERS
     ========================= */

  increment = () => {
    this.setState(prev =>({ 
      count: prev.count + 1 
    }));
  };

  /* =========================
     RENDER
     ========================= */

  render() {
    console.log("render");

    return [
      // <div style={{ padding: "20px" }}>
        <h2 key="title">React Class Lifecycle Demo</h2>,
        <p key="count" >Count: {this.state.count}</p>,
        <button key="btn" onClick={this.increment}>Increment</button>
      // </div>
    // );
    ];
  }
}

export default PendingPayment;
