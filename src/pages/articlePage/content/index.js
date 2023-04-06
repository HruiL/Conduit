import React, { Component } from "react";
import { connect } from "react-redux";

class ArticleContent extends Component {
  render() {
    const { article } = this.props;
    if (article.status !== "success") return null;
    return (
      <div className="row article-content">
        <div className="col-md-12">
          <div style={{ marginBottom: 25 }}>{article.result.body}</div>
          <ul className="tag-list">
            {article.result.tagList.map((tag) => (
              <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  article: state.articleDetailReducer.article,
});
export default connect(mapStateToProps)(ArticleContent);
