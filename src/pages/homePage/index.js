import Sidebar from "@src/pages/homePage/sidebar";
import React, { Component } from "react";
import Banner from "./banner";
import MainView from "./mainView";
import { Helmet } from "react-helmet";
export default class HomePage extends Component {
  render() {
    return (
      <>
        <div className="home-page">
          <Helmet>
            <title>home-conduit</title>
            <meta
              name="description"
              content="a place to share knowledge"
            ></meta>
          </Helmet>
          <Banner />
          <div className="container page">
            <div className="row">
              <div className="col-md-9">
                <MainView />
              </div>
              <div className="col-md-3">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
