import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class LoginoutView extends Component {
  render() {
    // 如果是登录状态，渲染 null
    if (this.props.user.token) return null;
    // 如果是未登录，渲染未登录状态的视图
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Sign up
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <img src={this.props.user.image} className="user-pic" alt="" />
            {this.props.user.username}
          </a>
        </li>
      </ul>
    );
  }
}
// 将用户信息映射到组件内部props中
const mapStateToProps = (state) => ({ user: state.userReducer.user });
export default connect(mapStateToProps)(LoginoutView);
