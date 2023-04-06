import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Layout from "./shared/layout";
import { createBrowserHistory } from "history";
import ArticlePage from "./pages/articlePage";
import ArticleEditorPage from "./pages/articleEditorPage";
// 只有页面组件才可以拿到路由信息对象，非组件拿不到路由信息对象，所以要使用Router组件，并传递history属性，将路由信息传递进去
export const browserHistory = createBrowserHistory();
// console.log(browserHistory);
export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path="/">
            <Layout>
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/article/:slug" component={ArticlePage} />
                <Route path="/editor/:slug" component={ArticleEditorPage} />
                <Route path="/editor" component={ArticleEditorPage} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    );
  }
}
