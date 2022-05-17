import React, { memo } from "react";

import { Layout } from "antd";
import { MyIcon } from "@/common/local-data";
import { LeftWraper, RightWraper, HeaderWraper } from "./style";

const FDAppHeader = memo(() => {
  const { Header } = Layout;
  return (
    <Header>
      <HeaderWraper>
        <LeftWraper>
          <span className="icon">
            <MyIcon type="icon-food1-copy" />
          </span>
          <span className="title">湘情土菜馆系统后台</span>
        </LeftWraper>
        <RightWraper>
          <span className="login">登录</span>
        </RightWraper>
      </HeaderWraper>
    </Header>
  );
});

export default FDAppHeader;
