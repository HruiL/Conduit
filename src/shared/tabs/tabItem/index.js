import classNames from "classnames";
import React, { Component } from "react";

export default class TabItem extends Component {
  render() {
    const { onClick, active, children } = this.props;
    return (
      <li className="nav-item">
        <a className={classNames("nav-link", { active })} onClick={onClick}>
          {children}
        </a>
      </li>
    );
  }
}
