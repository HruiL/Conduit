import { requestArticles } from "@src/requests/article";
import { requestTags } from "@src/requests/tag";
import {
  requestArticlesCreator,
  setupActiveTabNameCreator,
} from "@src/store/creators/article.creator";
import {
  setupActiveTagNameCreator,
  requestTagsCreator,
} from "@src/store/creators/tag.creator";
import React, { Component } from "react";
import { connect } from "react-redux";

class Sidebar extends Component {
  // 组件挂载完成之后请求tags
  componentDidMount() {
    this.props.dispatch(requestTagsCreator(requestTags));
  }
  // 点击了tag标签
  setupActiveTagName(tagName) {
    // 获取到点击的tag标签，并保存到redux中
    this.props.dispatch(setupActiveTagNameCreator(tagName));
    // 设置activeTabName 为 Tag Name tab显示点击的tag标签
    this.props.dispatch(setupActiveTabNameCreator("Tag Name"));
    this.props.dispatch(
      requestArticlesCreator(() => requestArticles({ tag: tagName }))
    );
  }
  renderTags() {
    const { result, status, error } = this.props.tags;
    // 如果数据正在加载 显示加载中
    if (status === "pending") return <div className="tag-list">loding...</div>;
    // 如果数据加载失败，显示失败信息
    if (status === "error") return <div className="tag-list">{error}</div>;
    // 如果加载成功，没有数据 显示暂无数据
    if (!result.length)
      return <div className="tag-list">No tags are here... yet</div>;
    // 如果加载成功 并有数据 渲染数据
    return (
      <div className="tag-list">
        {result.map((tag) => {
          return (
            <a
              onClick={() => this.setupActiveTagName(tag)}
              className="tag-pill tag-default"
              key={tag}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div className="sidebar">
        <p>Popular Tags</p>
        {this.renderTags()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ tags: state.tagReducer.tags });
export default connect(mapStateToProps)(Sidebar);
