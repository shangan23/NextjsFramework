import React from 'react'
import App from 'next/app'
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "../src/themes";

const Noop = ({ children }) => children

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.Layout || Noop

    return (
      <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    )
  }
}
