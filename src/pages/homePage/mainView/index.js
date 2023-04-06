import { Tabs, TabItem } from "../../../shared/tabs";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  requestArticlesCreator,
  setupActiveTabNameCreator,
} from "@src/store/creators/article.creator";
import {
  requestArticles,
  requestFollowAuthorArticles,
} from "@src/requests/article";
import Articles from "@src/shared/articles";

class MainView extends Component {
  constructor() {
    super();
    this.requestAriticles = this.requestAriticles.bind(this);
    this.requestFollowAuthorArticles =
      this.requestFollowAuthorArticles.bind(this);
  }
  // 页面挂载完成
  componentDidMount() {
    if (this.props.token) {
      // 如果登录了就将YourFeed Tab栏高亮 发送获取feed文章列表的请求
      this.requestFollowAuthorArticles();
    } else {
      // 如果没登录将Global Feed Tab栏高亮 发送获取global文章列表的请求
      this.requestAriticles();
    }
  }

  // 点击了Global Feed
  requestAriticles() {
    // 设置tab高亮
    this.props.dispatch(setupActiveTabNameCreator("Global Feed"));
    // 发送获取global文章的请求
    this.props.dispatch(requestArticlesCreator(requestArticles));
  }
  // 点击了Your Feed
  requestFollowAuthorArticles() {
    // 设置tab高亮
    this.props.dispatch(setupActiveTabNameCreator("Your Feed"));
    // 发送获取your feed文章的请求
    this.props.dispatch(requestArticlesCreator(requestFollowAuthorArticles));
  }
  render() {
    const { token, activeTabName, activeTagName } = this.props;
    return (
      <>
        <div className="feed-toggle">
          {/* 如果用户登录了 就显示Your Feed tab栏 */}
          <Tabs>
            {token && (
              <TabItem
                active={activeTabName === "Your Feed"}
                onClick={this.requestFollowAuthorArticles}
              >
                Your Feed
              </TabItem>
            )}
            <TabItem
              active={activeTabName === "Global Feed"}
              onClick={this.requestAriticles}
            >
              Global Feed
            </TabItem>
            {activeTabName === "Tag Name" && (
              <TabItem active={activeTabName === "Tag Name"}>
                {activeTagName}
              </TabItem>
            )}
          </Tabs>
        </div>
        <Articles />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.userReducer.user.token,
  activeTabName: state.articleReducer.activeTabName,
  articles: state.articleReducer.articles,
  activeTagName: state.tagReducer.activeTagName,
});
export default connect(mapStateToProps)(MainView);
