import { requestComments } from "@src/requests/comments";
import { requestCommentsCreator } from "@src/store/creators/comment.creator";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CommentItem from "./Item";

class CommentList extends Component {
  // 页面挂载完成之后 请求文章评论列表
  componentDidMount() {
    this.props.dispatch(
      requestCommentsCreator(() =>
        requestComments(this.props.match.params.slug)
      )
    );
  }
  render() {
    const { comments } = this.props;
    // 如果还没有发送请求 什么都不显示
    if (comments.status === "idle") return null;
    // 如果正在发请求
    if (comments.status === "pending") return <div>loading...</div>;
    // 如果请求发送失败，显示错误信息
    if (comments.status === "error")
      return <div>{JSON.stringify(comments.error)}</div>;
    // 将本地保存的字典数据转化为数组
    const commentsList = Object.values(comments.result);
    // 请求成功，但是没有数据
    if (!commentsList.length) return <div>No Comment yet...</div>;
    // 请求成功，也有数据
    return commentsList.map((comment) => (
      <CommentItem key={comment.id} {...comment} user={this.props.user} />
    ));
  }
}
const mapStateToProps = (state) => ({
  comments: state.articleDetailReducer.comments,
  user: state.userReducer.user,
});
export default withRouter(connect(mapStateToProps)(CommentList));
