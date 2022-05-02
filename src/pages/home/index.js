import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllOrder,
  getOrderCondition,
  getOrderDetail,
} from "@/service/order";
import {} from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import { FDHomeWraper, TableArea } from "./style";

const FDHome = memo(() => {
  return <FDHomeWraper>Home</FDHomeWraper>;
});

export default FDHome;
