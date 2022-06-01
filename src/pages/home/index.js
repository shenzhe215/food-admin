import React, { memo, useEffect, useState, useCallback } from "react";
import { getOrderByType, sendOrder, pageConditionOrder } from "@/service/order";
import { Button, message, Table } from "antd";
import moment from "moment";
import { FDHomeWraper, TableArea } from "./style";

const FDHome = memo(() => {
  const [orderList, setOrderList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  const orderQuery = { status: 1 };

  const fetchOrder = () => {
    pageConditionOrder(1, 10, orderQuery).then((res) => {
      if (res.code === 20000) {
        setOrderList(res.data.list);
        setPagination({ ...pagination, total: res.data.total });
      } else {
        message.error("获取订单失败", 1);
      }
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // other hooks
  const handleSend = (record) => {
    const { id, orderNo } = record;
    sendOrder(id).then((res) => {
      if (res.code === 20000) {
        message.success("发货成功", 1);
        fetchOrder();
      } else {
        message.error("发货失败", 1);
      }
    });
  };

  const columns = [
    {
      title: "订单号",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "订单详情",
      children: [
        {
          title: "菜品名称",
          key: "foodTitle",
          width: 150,
          render: (text, record) => (
            <div>
              {record.foodList.map((food) => (
                <p>{food.title}</p>
              ))}
            </div>
          ),
        },
        {
          title: "购买数量",
          key: "buyNum",
          width: 50,
          render: (text, record) => (
            <div>
              {record.foodList.map((food) => (
                <p>{food.buyNum}</p>
              ))}
            </div>
          ),
        },
        {
          title: "菜品价格￥",
          key: "foodPrice",
          width: 50,
          render: (text, record) => (
            <div>
              {record.foodList.map((food) => (
                <p>{food.price}</p>
              ))}
            </div>
          ),
        },
        {
          title: "优惠价￥",
          key: "foodRatePrice",
          width: 50,
          render: (text, record) => (
            <div>
              {record.foodList.map((food) => (
                <p>{food.ratePrice === null ? food.price : food.ratePrice}</p>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      title: "收货人",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "配送地址",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "总费用￥",
      dataIndex: "totalFee",
      key: "totalFee",
    },
    {
      title: "优惠价￥",
      key: "rateFee",
      render: (text, record) =>
        record.rateFee ? record.rateFee : record.totalFee,
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
      key: "location",
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <Button type="primary" onClick={handleSend.bind(null, record)}>
          确认发货
        </Button>
      ),
    },
  ];

  // 页面改变
  const paginationChange = (current, pageSize) => {
    // setPagination({ ...pagination, current, pageSize });
    pageConditionOrder(current, pageSize, orderQuery).then((res) => {
      if (res.code === 20000) {
        setOrderList(res.data.list);
        setPagination({
          ...pagination,
          total: res.data.total,
          current,
          pageSize,
        });
      } else {
        message.error("获取订单失败", 1);
      }
    });
  };

  const paginationObj = {
    ...pagination,
    showQuickJumper: true,
    // 显示每页多少条数据
    showSizeChanger: true,
    hideOnSinglePage: false,
    pageSizeOptions: ["10", "20", "30", "50", "100"],
    onChange: paginationChange,
    onShowSizeChange: paginationChange,
    // 总数
    showTotal: function () {
      return `总共有 ${pagination.total} 条数据`;
    },
  };
  return (
    <FDHomeWraper>
      <div className="table-area">
        <Table
          dataSource={orderList}
          columns={columns}
          bordered={true}
          pagination={paginationObj}
          rowKey={(record) => {
            return record.id;
          }}
        />
      </div>
    </FDHomeWraper>
  );
});

export default FDHome;
