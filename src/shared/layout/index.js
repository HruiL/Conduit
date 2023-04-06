import React, { Component } from "react";
import Footer from "../footer";
import Header from "../header";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
