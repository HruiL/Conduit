import {
  editArticleRequest,
  publishArticleRequest,
  requestArticleDetailBySlug,
} from "@src/requests/article";
import { AxiosError } from "axios";
import classNames from "classnames";
import React, { Component } from "react";

export default class ArticleEditorPage extends Component {
  constructor(props) {
    super(props);
    // 文章相关的状态
    this.state = {
      article: {
        // 文章标题
        title: "",
        // 文章描述
        description: "",
        // 文章内容
        body: "",
        // 文章tag标签
        tagList: "",
      },
      // 记录发表文章请求的状态
      publishArticleRequestStatus: "idle",
      // 记录发表文章请求的错误信息
      publishArticleRequestError: null,
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.publishArticle = this.publishArticle.bind(this);
    this.slug = this.props.match.params.slug;
  }
  // 更新form表单的数据
  updateFormState(event) {
    this.setState({
      ...this.state,
      article: {
        ...this.state.article,
        [event.target.name]: event.target.value,
      },
    });
  }
  // 发布/编辑文章
  async publishArticle(event) {
    // 阻止表单的默认提交行为
    event.preventDefault();
    // 请求如果正在发送，避免重复发送请求，阻止代码继续向下执行
    if (this.state.publishArticleRequestStatus === "pending") return;
    // 更新发布文章的请求状态为pending
    // 错误信息的初始状态为null 这里在改状态的时候，还要继续把设置为null的原因： 如果第一次请求失败，那么publishArticleRequestError里面就会有保存的错误信息，当再次发送请求的时候，就应该把错误信息重置为null
    this.setState({
      publishArticleRequestStatus: "pending",
      publishArticleRequestError: null,
    });
    // 发送请求 捕获错误
    try {
      let res = null;
      let article = {
        ...this.state.article,
        tagList: this.state.article.tagList.split(","),
      };
      // 如果是发布文章
      if (typeof this.slug === "undefined") {
        // 发送发布文章的请求
        res = await publishArticleRequest({
          article,
        });
        // 如果是修改文章
      } else {
        res = await editArticleRequest(this.slug, article);
      }
      // 修改发布文章的请求状态为success
      this.setState({
        publishArticleRequestStatus: "success",
        publishArticleRequestError: null,
      });
      // 发布完文章之后 调转到文章详情页面
      this.props.history.push(`/article/${res.article.slug}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        this.setState({
          publishArticleRequestStatus: "error",
          publishArticleRequestError: error.response?.data?.errors,
        });
      } else {
        console.log(error);
      }
    }
  }
  async componentDidMount() {
    // 如果发布文章的，就不需要获取文章详情
    if (typeof this.slug === "undefined") return;
    // 如果是编辑文章，页面挂载完成之后获取文章详情内容
    const res = await requestArticleDetailBySlug(this.slug);
    const { title, description, body, tagList } = res.article;
    // 更改组件状态为文章的详情内容
    this.setState({
      ...this.state,
      article: {
        title,
        description,
        body,
        tagList: tagList.join(","),
      },
    });
  }
  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={this.publishArticle}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      value={this.state.article.title}
                      onChange={this.updateFormState}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      value={this.state.article.description}
                      onChange={this.updateFormState}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      name="body"
                      value={this.state.article.body}
                      onChange={this.updateFormState}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      name="tagList"
                      value={this.state.article.tagList}
                      onChange={this.updateFormState}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className={classNames(
                      "btn btn-lg pull-xs-right btn-primary",
                      {
                        disabled:
                          this.state.publishArticleRequestStatus === "pending",
                      }
                    )}
                    type="submit"
                  >
                    {typeof this.slug === "undefined"
                      ? this.state.publishArticleRequestStatus === "pending"
                        ? "Publish loading..."
                        : "Publish Article"
                      : this.state.publishArticleRequestStatus === "pending"
                      ? "edit loading..."
                      : "Edit Article"}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
