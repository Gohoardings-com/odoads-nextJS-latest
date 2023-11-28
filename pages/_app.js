import React, { useEffect } from "react";
import { SSRProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../redux/store";
import AccountProvider from "../apis/contextApi";
import "../styles/globals.scss";
import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";

function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <SSRProvider>
      <AccountProvider>
      <ToastContainer autoClose={2000} />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AccountProvider>
    </SSRProvider>
  );
}

export default App;
