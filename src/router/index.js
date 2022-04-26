import React from "react";
const Login = React.lazy((_) => import("../pages/login/login"));
const FDFoodList = React.lazy((_) => import("@/pages/foods/list"));
const FDFood = React.lazy((_) => import("@/pages/foods/food"));
const FDMemberList = React.lazy((_) => import("@/pages/members/list"));
const FDMember = React.lazy((_) => import("@/pages/members/member"));
const FDCoupon = React.lazy((_) => import("@/pages/coupon"));

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/foodservice",
    children: [
      { path: "list", element: <FDFoodList /> },
      { path: "food", element: <FDFood /> },
      { path: "food/:id", element: <FDFood /> },
    ],
  },
  {
    path: "/memberservice",
    children: [
      { path: "list", element: <FDMemberList /> },
      { path: "member", element: <FDMember /> },
    ],
  },
  {
    path: "/coupon",
    element: <FDCoupon />,
    children: [
      { path: "list", element: <FDCoupon /> },
      // { path: "member", element: <FDMember /> },
    ],
  },
  // {
  //   path: "/",
  //   element: <FDDiscover />,
  //   children: [
  //     {
  //       index: true,
  //       element: <FDDiscover />,
  //     },
  //     { path: "user", element: <FDDiscover /> },
  //     { path: "user/detail/:id", element: <FDDiscover /> },
  //   ],
  // },
];

export default routes;
