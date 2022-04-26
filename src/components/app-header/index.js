import React, { memo } from "react";

import { Layout, Menu, Breadcrumb } from "antd";

const FDAppHeader = memo(() => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}></Menu>
    </Header>
  );
});

export default FDAppHeader;
