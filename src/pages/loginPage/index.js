import { loginRequest } from "@src/requests/auth";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { connect } from "react-redux";
import { saveUserCreator } from "@src/store/creators/user.creator";
import { toast } from "react-toastify";
import classNames from "classnames";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "",
        password: "",
      },
      loginRequestStatus: "idle",
      loginRequestError: "",
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  // 更新表单数据
  updateFormState(event) {
    this.setState({
      ...this.state,
      user: { ...this.state.user, [event.target.name]: event.target.value },
    });
  }
  // 点击sing in发送登录请求

  async submitForm(event) {
    //阻止表单默认行为
    event.preventDefault();
    // 如果正在发送请求，阻止代码继续向下执行，防止多次重复发送登录请求
    if (this.state.loginRequestStatus === "pending") return;
    // 修改请求状态
    this.setState({
      loginRequestStatus: "pending",
      loginRequestError: "",
    });
    // 发送请求 捕获错误
    try {
      // 发送请求
      const response = await loginRequest(this.state.user);
      // 保存登录用户的信息
      this.props.dispatch(saveUserCreator(response.user));
      // 弹框提示登录成功
      toast("登录成功", { position: "top-center", autoClose: 1000 });
      // 修改请求状态为失败
      this.setState({ loginRequestStatus: "success", loginRequestError: "" });
      // 登录成功跳转到首页
      this.props.history.push(this.props.location.redirectUrl || "/");
    } catch (e) {
      // 如果错误是axios类型的，我们才可以通过e.response.data.errors拿到错误对象
      if (e instanceof AxiosError) {
        this.setState({
          loginRequestStatus: "error",
          loginRequestError: e.response.data.errors,
        });
      }
    }
  }
  // 渲染错误信息
  renderError() {
    // 解构请求状态和错误对象
    const { loginRequestStatus, loginRequestError } = this.state;
    // 如果没有错误信息就不渲染
    if (loginRequestStatus !== "error") return null;
    console.log(loginRequestError);
    return (
      <ul className="error-messages">
        {Object.keys(loginRequestError).map((error) => {
          return (
            <li key={error}>
              {error}: {loginRequestError[error].join("_")}
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    // 如果登录了 就跳转到首页
    if (this.props.token) {
      return <Redirect to={this.props.location.redirectUrl || "/"} />;
    }
    // 如果没有登录 就渲染登录页
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              {this.renderError()}
              <form onSubmit={this.submitForm}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={this.state.user.email}
                    onChange={this.updateFormState}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.updateFormState}
                  />
                </fieldset>
                <button
                  className={classNames(
                    "btn btn-lg btn-primary pull-xs-right",
                    {
                      disabled: this.state.loginRequestStatus === "pending",
                    }
                  )}
                  disabled={this.state.loginRequestStatus === "pending"}
                >
                  {this.state.loginRequestStatus === "pending"
                    ? "登录中..."
                    : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ token: state.userReducer.user.token });
export default connect(mapStateToProps)(Login);
