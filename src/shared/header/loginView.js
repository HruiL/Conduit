import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class LoginView extends Component {
  render() {
    // 如果未登录，就渲染null
    if (!this.props.user.token) return null;
    // 如果登录了 渲染登录状态的视图
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Article
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>
      </ul>
    );
  }
}
// 将用户信息映射到组件内部props中
const mapStateToProps = (state) => ({ user: state.userReducer.user });
export default connect(mapStateToProps)(LoginView);
