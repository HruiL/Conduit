import { followAuthor, unFollowAuthor } from "@src/requests/profile";
import { updateProfileCreator } from "@src/store/creators/profile.creator";
import { AxiosError } from "axios";
import { Component } from "react";
import { connect } from "react-redux";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 记录关注/取消关注作者的请求状态
      followAuthorStatus: "idle",
      // 记录关注/取消关注作者的错误信息
      followAuthorError: null,
    };
    // 修改关注/取消关注 事件函数的this指向
    this.follow_unFollow_Author = this.follow_unFollow_Author.bind(this);
  }
  // 关注/取消关注作者
  async follow_unFollow_Author(author) {
    // 更改请求状态为pending
    this.setState({
      followAuthorStatus: "pending",
      followAuthorError: null,
    });
    // 发送请求 捕获错误
    try {
      // 根据关注状态的不同 发送不同的网络请求
      const response = await (author.following
        ? unFollowAuthor(author.username)
        : followAuthor(author.username));
      // 发送指令，更改本地文章列表的作者信息
      this.props.dispatch(updateProfileCreator(response.profile));
      // 更改请求状态为success
      this.setState({
        followAuthorStatus: "success",
        followAuthorError: null,
      });
    } catch (error) {
      // 保存错误信息
      if (error instanceof AxiosError) {
        this.setState({
          followAuthorStatus: "error",
          followAuthorError: error.response?.data?.errors,
        });
      }
    }
  }
  render() {
    // 调用 调用者传递过来的render方法，传递复用的逻辑，在此渲染传递过来的元素
    return this.props.render(this.state, this.follow_unFollow_Author);
  }
}
export default connect()(Follow);
