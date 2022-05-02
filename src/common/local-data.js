import { UserOutlined } from "@ant-design/icons";
export const menuItems = [
  {
    key: "/home",
    icon: <UserOutlined />,
    label: "首页",
  },
  {
    key: "food",
    label: "菜品管理",
    icon: <UserOutlined />,
    children: [
      { key: "/food", label: "菜品列表", icon: <UserOutlined /> },
      { key: "/food/type", label: "菜品分类", icon: <UserOutlined /> },
    ],
  },
  {
    key: "coupon",
    label: "优惠券管理",
    icon: <UserOutlined />,
    children: [{ key: "/coupon", label: "优惠券列表", icon: <UserOutlined /> }],
  },
  {
    key: "banner",
    label: "轮播图管理",
    icon: <UserOutlined />,
    children: [{ key: "/banner", label: "轮播图管理", icon: <UserOutlined /> }],
  },
  {
    key: "member",
    label: "会员管理",
    icon: <UserOutlined />,
    children: [{ key: "/member", label: "会员列表", icon: <UserOutlined /> }],
  },
  {
    key: "order",
    label: "订单管理",
    icon: <UserOutlined />,
    children: [{ key: "/order", label: "订单列表", icon: <UserOutlined /> }],
  },
];
