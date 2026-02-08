'use client';
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Providers from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Providers>
            <HeaderWrapper />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
