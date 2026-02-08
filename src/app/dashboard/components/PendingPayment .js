import React, {Component} from "react";
class PendingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userStatus === "online" && !state.isOnline) {
      return { isOnline: true };
    }

    if (props.userStatus === "offline" && state.isOnline) {
      return { isOnline: false };
    }

    return null; // very important
  }

  render() {
    return <p>Status: {this.state.isOnline ? "Online" : "Offline"}</p>;
  }
}
