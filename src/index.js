import React from "react";
import ReactDOM from "react-dom/client";

import "@/assets/css/reset.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import App from "./App";
// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
