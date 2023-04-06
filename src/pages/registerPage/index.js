import { registerUser } from "@src/requests/auth";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveUserCreator } from "@src/store/creators/user.creator";
import classNames from "classnames";
import { toast } from "react-toastify";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
      },
      registerRequestStatus: "idle",
      registerRequestError: null,
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.rendereErrorMessage = this.rendereErrorMessage.bind(this);
  }
  // 更新表单
  updateFormState(event) {
    // 根据输入框输入的值 更改组件状态
    // 用到了input的name属性
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      },
    });
  }
  // 保存表单数据，完成注册
  async submitForm(event) {
    // 阻止表单提交的默认行为
    event.preventDefault();
    // 阻止用户连续点击提交，不停的发送请求
    if (this.state.registerRequestStatus === "pending") return;
    // 更改组件状态 正在发送请求
    this.setState({
      registerRequestStatus: "pending",
      registerRequestError: null,
    });
    // 开始发送请求
    try {
      const res = await registerUser(this.state.user);
      console.log("regiter res", res);
      // 更改组件状态 请求发送成功
      this.setState({
        registerRequestStatus: "success",
        registerRequestError: null,
      });
      // 注册成功 弹框提示
      toast.success("注册成功", {
        // 自定关闭事件
        autoClose: 1000,
        // 位置
        position: "top-center",
      });
      this.props.history.push("/");
      // 将后端返回的数据保存到redux store中 并同步到本地存储localstorage
      this.props.dispatch(saveUserCreator(res.user));
    } catch (e) {
      // 请求失败，更改组件状态为失败态
      this.setState({
        registerRequestStatus: "error",
        registerRequestError: e.response.data.errors,
      });
    }
  }
  // 渲染错误信息
  rendereErrorMessage() {
    const { registerRequestError, registerRequestStatus } = this.state;
    if (registerRequestStatus !== "error") return null;
    return (
      <ul className="error-messages">
        {/* registerRequestError:{email:["email cannot be blank"],username:[]} */}
        {Object.keys(registerRequestError).map((key) => (
          <li key={key}>
            {key} error:
            {registerRequestError[key].map((error) => (
              <span key={error}>{error}</span>
            ))}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>
              {this.rendereErrorMessage()}
              <form onSubmit={this.submitForm}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={this.state.user.username}
                    onChange={this.updateFormState}
                  />
                </fieldset>
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
                      disabled: this.state.registerRequestStatus === "pending",
                    }
                  )}
                >
                  {this.state.registerRequestStatus === "pending"
                    ? "loading..."
                    : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(Register);
