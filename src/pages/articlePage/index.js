import { requestArticleDetailBySlug } from "@src/requests/article";
import { requestDetailArticleCreator } from "@src/store/creators/detailArticle.creator";
import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleBanner from "./banner";
import ArticleContent from "./content";
import { CommentForm, CommentList } from "./comment";
import ArticleMeta from "./meta";
import { Link } from "react-router-dom";
class ArticlePage extends Component {
  componentDidMount() {
    this.props.dispatch(
      requestDetailArticleCreator(() =>
        requestArticleDetailBySlug(this.props.match.params.slug)
      )
    );
  }
  render() {
    const { user } = this.props;
    return (
      <div className="article-page">
        <ArticleBanner />
        <div className="container page">
          <ArticleContent />
          <hr />
          <div className="article-actions">
            <ArticleMeta />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {!Object.keys(user).length ? (
                <p>
                  <Link to="/login">Sign in</Link>
                  &nbsp;or&nbsp;
                  <Link to="/register">sign up</Link>
                  &nbsp;to add comments on this article.
                </p>
              ) : (
                <>
                  <CommentForm />
                  <CommentList />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ user: state.userReducer.user });
export default connect(mapStateToProps)(ArticlePage);
