import withFavorite from "@src/common/withFavorite";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Article extends Component {
  render() {
    const {
      slug,
      author,
      createdAt,
      description,
      favoritesCount,
      title,
      favorited,
    } = this.props;
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a>
            <img src={author.image} alt="" />
          </a>
          <div className="info">
            <a className="author">{author.username}</a>
            <span className="date">
              {dayjs(createdAt).format("YYYY-MM-DD")}
            </span>
          </div>
          <button
            className={classNames("btn btn-sm pull-xs-right", {
              "btn-outline-primary": !favorited,
              "btn-primary": favorited,
              disabled: this.props.favoriteArticleStatus === "pending",
            })}
            onClick={() => this.props.favorite(slug, favorited)}
          >
            <i className="ion-heart"></i> {favoritesCount}
          </button>
        </div>
        <Link to={`/article/${slug}`} className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    );
  }
}

export default withFavorite(connect()(Article));
