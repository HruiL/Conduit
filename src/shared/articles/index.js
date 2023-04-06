import React, { Component } from "react";
import { connect } from "react-redux";
import Article from "./article";

class Articles extends Component {
  render() {
    const { result, status, error } = this.props.articles;
    // 如果正在请求 渲染正在加载
    if (status === "pending")
      return <div className="article-preview">loading...</div>;
    // 如果有错误信息，渲染错误信息
    if (status === "error")
      return <div className="article-preview">{error}</div>;
    // 否则的话 就是请求正常 渲染文章列表
    const articleList = Object.values(result);
    // 如果没有文章数据
    if (!articleList.length) {
      return <div className="article-preview">No Articles are here... yet</div>;
    }
    // 有文章数据 调用Article组件 渲染文章
    return articleList.map((article) => {
      return <Article key={article.slug} {...article} />;
    });
  }
}
// 将文章数据映射到组件内部的props中
const mapStateToProps = (state) => ({
  articles: state.articleReducer.articles,
});

export default connect(mapStateToProps)(Articles);
