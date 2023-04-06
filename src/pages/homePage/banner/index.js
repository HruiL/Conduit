import React, { Component } from "react";
import { connect } from "react-redux";

class Banner extends Component {
  render() {
    // 如果用户登录了，就不渲染banner背景
    if (this.props.token) return null;
    return (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">{this.props.appName.toLowerCase()}</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    );
  }
}
// 映射登录凭证token和网站信息appName
const mapStateToProps = (state) => ({
  token: state.userReducer.user.token,
  appName: state.metaReducer.appName,
});
export default connect(mapStateToProps)(Banner);
