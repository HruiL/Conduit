import { delComment } from "@src/requests/comments";
import { delCommentCreator } from "@src/store/creators/comment.creator";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CommentItem extends Component {
  constructor() {
    super();
    this.state = {
      // 记录删除评论的状态
      delCommentRequestStatus: "idle",
      // 记录删除评论的错误信息
      delCommentRequestError: null,
    };
    this.deleteCommentHanlder = this.deleteCommentHanlder.bind(this);
  }
  // 点击评论的删除按钮
  async deleteCommentHanlder(id) {
    // 获取当前评论的文章id
    const slug = this.props.match.params.slug;
    // 将删除评论的状态改为pending
    this.setState({
      delCommentRequestStatus: "pending",
      delCommentRequestError: null,
    });
    // 发送请求 捕获错误
    try {
      // 发送请求
      await delComment(slug, id);
      // 删除本地文章
      this.props.dispatch(delCommentCreator(id));
      // 将删除评论的状态改为success
      this.setState({
        delCommentRequestStatus: "success",
        delCommentRequestError: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // 将删除评论的状态改为error
        this.setState({
          delCommentRequestStatus: "error",
          delCommentRequestError: error.response?.data?.errors,
        });
      } else {
        console.log(error);
      }
    }
  }
  render() {
    const { author, user } = this.props;

    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{this.props.body}</p>
        </div>
        <div className="card-footer">
          <a href="" className="comment-author">
            <img src={author.image} className="comment-author-img" alt="" />
          </a>
          &nbsp;
          <a href="" className="comment-author">
            {author.username}
          </a>
          <span className="date-posted">
            {dayjs(this.props.createdAt).format("YYYY-MM-DD")}
          </span>
          {author.username === user.username && (
            <span
              className="mod-options"
              onClick={() => this.deleteCommentHanlder(this.props.id)}
            >
              <i className="ion-trash-a"></i>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(CommentItem));
