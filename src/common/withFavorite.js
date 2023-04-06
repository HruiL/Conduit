import { favoriteActicle, unFavoriteArticle } from "@src/requests/article";
import { updateArticleCreator } from "@src/store/creators/article.creator";
import { AxiosError } from "axios";
import React from "react";
import { connect } from "react-redux";

export default function withFavorite(Component) {
  class WithFavorite extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        favoriteArticleStatus: "idle",
        favoriteArticleError: null,
      };
      this.favorite = this.favorite.bind(this);
    }
    // 点赞/取消点赞文章
    async favorite(slug, favorited) {
      // 如果是正在发送请求点赞/取消点赞的状态 就阻止代码继续向下执行多次重复发送网络请求
      if (this.state.favoriteArticleStatus === "pending") return;
      this.setState({
        favoriteArticleStatus: "pending",
        favoriteArticleError: null,
      });
      // 如果favorited为false 点赞文章 为 true 取消点赞
      try {
        const response = await (favorited
          ? unFavoriteArticle(slug)
          : favoriteActicle(slug));
        this.setState({
          favoriteArticleStatus: "success",
          favoriteArticleError: null,
        });
        this.props.dispatch(updateArticleCreator(response.article));
      } catch (error) {
        if (error instanceof AxiosError) {
          this.setState({
            favoriteArticleStatus: "error",
            favoriteArticleError: error.response.data?.errors,
          });
        }
      }
    }
    render() {
      return (
        <Component {...this.props} {...this.state} favorite={this.favorite} />
      );
    }
  }
  return connect()(WithFavorite);
}
