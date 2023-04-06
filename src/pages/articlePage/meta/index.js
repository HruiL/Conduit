import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withFavorite from "@src/common/withFavorite";
import Follow from "@src/common/follow";
import { withRouter } from "react-router-dom";
import { AxiosError } from "axios";
import { delArticleRequest } from "@src/requests/article";
import { delDetailArticleCreator } from "@src/store/creators/detailArticle.creator";
class ArticleMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delArticleRequestStatus: "idle",
      delArticleRequestError: null,
    };
    this.delArticleHandler = this.delArticleHandler.bind(this);
  }
  // 渲染关注/取消关注作者和点赞/取消点赞文章的按钮
  renderFollowAndFavoriteButtons() {
    const { article } = this.props;
    return (
      <>
        {/* 关注和取消关注作者 逻辑复用 渲染属性实现 传递render方法 */}
        <Follow
          render={(state, follow_unFollow_Author) => (
            <button
              className={classNames("btn btn-sm", {
                "btn-outline-secondary": !article.result.author.following,
                "btn-secondary": article.result.author.following,
                disabled: state.followAuthorStatus === "pending",
              })}
              onClick={() => follow_unFollow_Author(article.result.author)}
            >
              <i className="ion-plus-round"></i>
              &nbsp; {article.result.author.following ? "Unfollow" : "Follow"}
              &nbsp; {article.result.author.username}
            </button>
          )}
        />
        &nbsp;&nbsp;
        <button
          className={classNames("btn btn-sm", {
            "btn-outline-primary": !article.result.favorited,
            "btn-primary": article.result.favorited,
            disabled: this.props.favoriteArticleStatus === "pending",
          })}
          onClick={() =>
            this.props.favorite(article.result.slug, article.result.favorited)
          }
        >
          <i className="ion-heart"></i>
          &nbsp; {!article.result.favorited ? "Favorite" : "Unfavorite"}
          &nbsp; Article
          <span className="counter">({article.result.favoritesCount})</span>
        </button>
      </>
    );
  }
  // 渲染编辑文章和删除文章的按钮
  renderEditorAndDelArticleButtons() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() =>
            this.props.history.push(`/editor/${this.props.match.params.slug}`)
          }
        >
          <i className="ion-edit"></i>
          &nbsp; Edit Article
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={this.delArticleHandler}
        >
          <i className="ion-trash-a"></i>
          &nbsp; Delete Article
        </button>
      </>
    );
  }
  // 删除文章
  async delArticleHandler() {
    // 组件状态 为pending
    this.setState({
      delArticleRequestStatus: "pending",
      delArticleRequestError: null,
    });
    // 发送请求 捕获错误
    try {
      if (!window.confirm("您确定要删除这篇文章吗？")) return;
      await delArticleRequest(this.props.match.params.slug);
      // 更新组件状态为success
      this.setState({
        delArticleRequestStatus: "success",
        delArticleRequestError: null,
      });
      // 删除完文章之后 把本地的文章也删除掉
      this.props.dispatch(delDetailArticleCreator());
      // 删除完文章之后调转到文章首页
      this.props.history.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        // 更新组件状态为error
        this.setState({
          delArticleRequestStatus: "error",
          delArticleRequestError: error.response?.data?.errors,
        });
      }
    }
  }
  render() {
    const { article } = this.props;
    if (article.status !== "success") return null;
    return (
      <div className="article-meta">
        <a href="">
          <img src={article.result.author.image} alt="" />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.result.author.username}
          </a>
          <span className="date">
            {dayjs(article.result.createdAt).format("YYYY-MM-DD")}
          </span>
        </div>
        {/* 如果文章是当前用户发布的，显示编辑/删除文章按钮 如果不是 显示关注/取消关注作者 点赞/取消点赞文章 */}
        {this.props.user.username === article.result.author.username
          ? this.renderEditorAndDelArticleButtons()
          : this.renderFollowAndFavoriteButtons()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  article: state.articleDetailReducer.article,
  user: state.userReducer.user,
});
// 复用点赞逻辑 高阶组件实现

export default withRouter(withFavorite(connect(mapStateToProps)(ArticleMeta)));
