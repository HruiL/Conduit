import React, { Component } from "react";
import LoginoutView from "./loginoutView";
import LoginView from "./loginView";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand">conduit</a>
          {/* 渲染登录状态的导航视图 */}
          <LoginView />
          {/* 渲染未登录状态的导航视图 */}
          <LoginoutView />
        </div>
      </nav>
    );
  }
}
