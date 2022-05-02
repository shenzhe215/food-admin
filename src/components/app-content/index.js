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
        {/* <Menu
          mode="inline"
          defaultSelectedKeys={["/home"]}
          defaultOpenKeys={["/home"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={(item) => {
            const { key } = item;
            navigate(key);
          }}
        >
          <MenuItem key="/home" icon={<UserOutlined />}>
            首页
          </MenuItem>
          <SubMenu key="food" icon={<UserOutlined />} title="菜品管理">
            <MenuItem key="/food" icon={<UserOutlined />}>
              菜品列表
            </MenuItem>
            <MenuItem key="/food/type" icon={<UserOutlined />}>
              菜品分类
            </MenuItem>
          </SubMenu>
          <SubMenu key="coupon" icon={<UserOutlined />} title="优惠券管理">
            <MenuItem key="/coupon" icon={<UserOutlined />}>
              优惠券列表
            </MenuItem>
          </SubMenu>
          <SubMenu key="banner" icon={<UserOutlined />} title="轮播图管理">
            <MenuItem key="/banner" icon={<UserOutlined />}>
              轮播图管理
            </MenuItem>
          </SubMenu>
          <SubMenu key="member" icon={<UserOutlined />} title="会员管理">
            <MenuItem key="/member" icon={<UserOutlined />}>
              会员列表
            </MenuItem>
          </SubMenu>
          <SubMenu key="order" icon={<UserOutlined />} title="订单管理">
            <MenuItem key="/order" icon={<UserOutlined />}>
              订单列表
            </MenuItem>
          </SubMenu>
        </Menu> */}
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
