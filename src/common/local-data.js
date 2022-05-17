import { createFromIconfontCN } from "@ant-design/icons/lib";

export const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3351915_eo1cfhf68mf.js", // 在 iconfont.cn 上生成
});

export const menuItems = [
  {
    key: "/home",
    icon: <MyIcon type="icon-shouye" />,
    label: "首页",
  },
  {
    key: "food",
    label: "菜品管理",
    icon: <MyIcon type="icon-food1" />,

    children: [
      { key: "/food", label: "菜品列表" },
      { key: "/food/type", label: "菜品分类" },
    ],
  },
  {
    key: "coupon",
    label: "优惠券管理",
    icon: <MyIcon type="icon-coupons" />,
    children: [{ key: "/coupon", label: "优惠券列表" }],
  },
  {
    key: "banner",
    label: "轮播图管理",
    icon: <MyIcon type="icon-banner" />,
    children: [{ key: "/banner", label: "轮播图管理" }],
  },
  {
    key: "member",
    label: "会员管理",
    icon: <MyIcon type="icon-members" />,
    children: [{ key: "/member", label: "会员列表" }],
  },
  {
    key: "order",
    label: "订单管理",
    icon: <MyIcon type="icon-dingdan" />,
    children: [{ key: "/order", label: "订单列表" }],
  },
];
