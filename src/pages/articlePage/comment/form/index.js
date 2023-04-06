import { publishComment } from "@src/requests/comments";
import { saveCommentCreator } from "@src/store/creators/comment.creator";
import { AxiosError } from "axios";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      // 发表评论的请求状态
      publishCommentRequestStatus: "idle",
      // 发表评论的请求错误信息
      publishCommentRequestError: null,
      // 评论内容
      content: "",
    };
    this.publishComment = this.publishComment.bind(this);
  }
  async publishComment(event) {
    // 阻止表单的默认行为
    event.preventDefault();
    // 如果用户没有输入内容
    if (!this.state.content) return;
    // 如果请求正在发送
    if (this.state.publishCommentRequestStatus === "pending") return;
    // 更改请求状态为pending
    this.setState({ ...this.state, publishCommentRequestStatus: "pending" });
    // 发请求 捕获错误
    try {
      // 发送发表评论的请求
      const response = await publishComment(
        this.props.match.params.slug,
        this.state.content
      );
      // 评论发表成功之后 将服务端返回的评论添加到本地，本地渲染最近的评论列表
      this.props.dispatch(saveCommentCreator(response.comment));
      // 发表成功，修改发表评论的状态 并将文本框的内容清空
      this.setState({
        ...this.state,
        publishCommentRequestStatus: "success",
        content: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // 如果是axios请求错误，修改请求状态为error，保存错误信息
        this.setState({
          ...this.state,
          publishCommentRequestStatus: "error",
          publishCommentRequestError: error.response?.data?.errors,
        });
      } else {
        console.log(error);
      }
    }
  }
  render() {
    return (
      <>
        <form className="card comment-form" onSubmit={this.publishComment}>
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
              value={this.state.content}
              onChange={(event) =>
                this.setState({ content: event.target.value })
              }
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src="http://i.imgur.com/Qr71crq.jpg"
              className="comment-author-img"
              alt=""
            />
            <button
              className={classNames("btn btn-sm btn-primary", {
                disabled: this.state.publishCommentRequestStatus === "pending",
              })}
            >
              Post Comment
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default withRouter(connect()(CommentForm));
