import React from "react";
const Login = React.lazy((_) => import("../pages/login/login"));
const FDFoodType = React.lazy((_) => import("@/pages/foods/food-type"));
const FDFood = React.lazy((_) => import("@/pages/foods"));
const FDMember = React.lazy((_) => import("@/pages/members"));
const FDCoupon = React.lazy((_) => import("@/pages/coupon"));
const FDOrder = React.lazy((_) => import("@/pages/order"));
const FDHome = React.lazy((_) => import("@/pages/home"));
const FDBanner = React.lazy((_) => import("@/pages/banner"));
const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <FDHome />,
  },
  {
    path: "/food",
    children: [
      { path: "", element: <FDFood /> },
      { path: "type", element: <FDFoodType /> },
    ],
  },
  {
    path: "/member",
    element: <FDMember />,
  },
  {
    path: "/banner",
    element: <FDBanner />,
  },
  {
    path: "/coupon",
    element: <FDCoupon />,
  },
  {
    path: "/order",
    element: <FDOrder />,
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
