import React, { Component } from "react";

export default class Tabs extends Component {
  render() {
    return (
      <ul className="nav nav-pills outline-active">{this.props.children}</ul>
    );
  }
}
