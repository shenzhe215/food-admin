import React, { memo, Suspense } from "react";
import routes from "@/router";
import { useNavigate, useRoutes } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ContentWrapper,
  SiderMenuWrapper,
  ContentInsideWrapper,
} from "./style";
import { menuItems } from "@/common/local-data";
function RouteElement() {
  const element = useRoutes(routes);
  return element;
}

const FDAppContent = memo(() => {
  const navigate = useNavigate();
  const { Content, Sider } = Layout;
  return (
    <ContentWrapper>
      <SiderMenuWrapper className="site-layout-background">
        <Menu
          items={menuItems}
          mode="inline"
          defaultSelectedKeys={["/home"]}
          defaultOpenKeys={["/home"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={(item) => {
            const { key } = item;
            navigate(key);
          }}
        />
      </SiderMenuWrapper>
      <ContentInsideWrapper>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Suspense fallback={<div>page loading</div>}>
              <RouteElement />
            </Suspense>
          </Content>
        </Layout>
      </ContentInsideWrapper>
    </ContentWrapper>
  );
});

export default FDAppContent;
