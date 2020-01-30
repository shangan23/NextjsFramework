import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theming/redTheme';

export default withRedux(initStore, { debug: true })(
  class MyApp extends App {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <React.Fragment>
          <Head>
            <title>My page</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </React.Fragment>

      );
    }
  }
);
