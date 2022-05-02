import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllOrder,
  getOrderCondition,
  getOrderDetail,
} from "@/service/order";
import {
  Button,
  Table,
  Input,
  message,
  DatePicker,
  Modal,
  Form,
  Select,
  Space,
  Image,
} from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import moment from "moment";
import { FDOrderWraper, TableArea } from "./style";

const FDOrder = memo(() => {
  // other state
  const dateFormat = "YYYY-MM-DD";
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [visiable, setVisiable] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  // 获取优惠券列表
  const fetchOrderList = () => {
    getAllOrder().then((res) => {
      if (res.code === 20000) {
        setOrderList(res.data.list);
        setPagination({
          ...pagination,
          current: 1,
          total: res.data.list.length,
        });
      } else {
        message.error("获取订单信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchOrderList();
  }, []);

  // other hooks
  const getDetail = (record) => {
    const { id, orderNo } = record;
    setOrderNo(orderNo);
    getOrderDetail(id).then((res) => {
      if (res.code === 20000) {
        setOrderDetail(res.data.list);
        setVisiable(true);
      } else {
        message.error("获取订单详情失败");
      }
    });
  };

  // 搜索表单提交
  const onFinishSearch = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      begin: moment(fieldsValue["begin"]).format(dateFormat),
      end: moment(fieldsValue["end"]).format(dateFormat),
    };
    getOrderCondition(fieldsValue).then((res) => {
      if (res.code === 20000) {
        setOrderList(res.data.list);
        setPagination({
          ...pagination,
          current: 1,
          total: res.data.list.length,
        });
      } else {
        message.error(res.message);
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
      title: "用户名",
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
      title: "订单状态",
      dataIndex: "status",
      key: "location",
      render: (text) =>
        text === 0 ? "未支付" : text === 1 ? "已支付，待收货" : "已收货",
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
        <Button type="primary" onClick={getDetail.bind(null, record)}>
          订单详情
        </Button>
      ),
    },
  ];

  const detailColumns = [
    {
      title: "菜品名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "菜品图片",
      dataIndex: "cover",
      key: "cover",
      render: (record) => <img src={record} width="80px" height={"50px"} />,
    },

    {
      title: "购买数量",
      dataIndex: "buyNum",
      key: "buyNum",
    },
    {
      title: "菜品价格￥",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "优惠价￥",
      key: "ratePrice",
      render: (text, record) =>
        record.ratePrice ? record.ratePrice : record.price,
    },
  ];

  // 页面改变
  const paginationChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize });
  };

  const paginationObj = {
    ...pagination,
    showQuickJumper: true,
    // 显示每页多少条数据
    showSizeChanger: true,
    hideOnSinglePage: false,
    pageSizeOptions: ["10", "30", "50", "100"],
    onChange: paginationChange,
    onShowSizeChange: paginationChange,
    // 总数
    showTotal: function () {
      return `总共有 ${pagination.total} 条数据`;
    },
  };

  return (
    <FDOrderWraper>
      <div className="OrderUp">
        <Form layout="inline" onFinish={onFinishSearch} form={form}>
          <Form.Item label="订单号" name={"orderNo"}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name={"mobile"}>
            <Input />
          </Form.Item>
          <Form.Item label="起始时间" name={"begin"}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="终止时间" name={"end"}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="订单状态:" name={"status"}>
            <Select style={{ width: 120 }}>
              <Select.Option value={""}>所有订单</Select.Option>
              <Select.Option value={0}>未支付</Select.Option>
              <Select.Option value={1}>已支付，待付款</Select.Option>
              <Select.Option value={2}>订单完成</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
              >
                搜索
              </Button>
              <Button
                type="default"
                icon={<RedoOutlined />}
                onClick={() => {
                  form.resetFields();
                  fetchOrderList();
                }}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <TableArea>
        <Table
          dataSource={orderList}
          columns={columns}
          bordered={true}
          pagination={paginationObj}
          rowKey={(record) => {
            return record.id;
          }}
        />
      </TableArea>
      <Modal
        title={"订单号" + orderNo + "  订单详情"}
        visible={visiable}
        onCancel={() => {
          setVisiable(false);
        }}
        width={800}
        footer={[
          <Button
            onClick={() => {
              setVisiable(false);
            }}
          >
            取消
          </Button>,
        ]}
      >
        <Table
          dataSource={orderDetail}
          columns={detailColumns}
          bordered={true}
          pagination={false}
          rowKey={(record) => {
            return record.id;
          }}
        ></Table>
      </Modal>
    </FDOrderWraper>
  );
});

export default FDOrder;
