import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleMeta from "../meta";

class ArticleBanner extends Component {
  render() {
    const { article } = this.props;
    if (article.status !== "success") return null;
    return (
      <div className="banner">
        <div className="container">
          <h1>{article.result.title}</h1>
          <ArticleMeta />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  article: state.articleDetailReducer.article,
});
export default connect(mapStateToProps)(ArticleBanner);
