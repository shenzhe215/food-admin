import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCouponList, addCoupon, deleteCoupon } from "@/service/coupon";
import {
  Button,
  Table,
  Input,
  message,
  Modal,
  Form,
  DatePicker,
  Radio,
  Space,
} from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { FDCouponWraper, TableArea } from "./style";
import moment from "moment";
import { set } from "immutable";

const FDCoupon = memo(() => {
  // state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // other state
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const [couponList, setCouponList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [visiable, setVisiable] = useState(false);
  const [beginTime, setBeginTime] = useState(moment(new Date()));
  const [endTime, setEndTime] = useState(moment(new Date()));
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  const numberReg = /^[0-9]+(\.?[0-9]+)?$/;
  // 获取优惠券列表
  const fetchCouponList = () => {
    getCouponList().then((res) => {
      if (res.code === 20000) {
        setCouponList(res.data.list);
        setPagination({ ...pagination, total: res.data.list.length });
      } else {
        message.error("获取优惠券信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchCouponList();
  }, []);

  // other hooks
  // 表单提交
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      beginTime: moment(fieldsValue["beginTime"]).format(dateFormat),
      endTime: moment(fieldsValue["endTime"]).format(dateFormat),
    };

    if (!update) {
      addCoupon(values).then((res) => {
        if (res.code === 20000) {
          message.success("添加成功");
          setVisiable(false);
          fetchCouponList();
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      //   values.id = id;
      addCoupon(values).then((res) => {
        if (res.code === 20000) {
          message.success("更新成功");
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  // 删除消费券
  const handleRemove = (record) => {
    Modal.confirm({
      title: "您正在执行删除操作",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除该优惠券么？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteCoupon(record.id).then((res) => {
          if (res.code === 20000) {
            fetchCouponList();
          } else {
            message.error(res.data.message);
          }
        });
      },
    });
  };

  // 编辑消费券
  const handleEdit = (record) => {
    const {
      id,
      title,
      type,
      endTime,
      requirement,
      description,
      beginTime,
      num,
    } = record;
    setUpdate(true);
    form.setFieldsValue({
      title: title,
      type: type,
      requirement: requirement,
      endTime: moment(endTime),
      description: description,
      beginTime: moment(beginTime),
      num: num,
    });
    setVisiable(true);
  };

  // 新增消费券
  const handleAdd = () => {
    setUpdate(false);
    form.resetFields();
    setVisiable(true);
  };
  // render
  // 表单样式
  const formItemLayout = {
    labelCol: { span: 4, offset: 5 },
    wrapperCol: { span: 8 },
  };

  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 9 },
  };

  const columns = [
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (text, record) => {
        {
          return text === 1 ? "满减" : "打折";
        }
      },
    },
    {
      title: "优惠信息",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "条件(满多少元)",
      dataIndex: "requirement",
      key: "requirement",
    },
    {
      title: "描述信息",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "期限时间",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "张数",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={handleEdit.bind(null, record)}>
            修改
          </Button>
          <Button type="danger" onClick={handleRemove.bind(null, record)}>
            删除
          </Button>
        </Space>
      ),
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

  // 表单校验
  const validateMessages = {
    required: "${label} 是必填字段!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <FDCouponWraper>
      <div className="couponUp">
        <Button type="primary" onClick={handleAdd}>
          新增
        </Button>
      </div>
      <TableArea>
        <Table
          dataSource={couponList}
          columns={columns}
          bordered={true}
          pagination={paginationObj}
          rowKey={(record) => {
            return record.id;
          }}
        />
      </TableArea>
      <Modal
        visible={visiable}
        title={(update && "更新优惠券信息") || "添加优惠券"}
        okText={"确定"}
        cancelText={"取消"}
        onCancel={() => {
          setVisiable(false);
        }}
      >
        <Form
          layout="horizontal"
          onFinish={onFinish}
          form={form}
          {...formItemLayout}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="名称"
            name={"title"}
            rules={[
              { required: true },
              { pattern: numberReg, message: "输入数字" },
            ]}
          >
            <Input placeholder="优惠多少" />
          </Form.Item>
          <Form.Item label="类型" name={"type"}>
            <Radio.Group>
              <Radio value={1}>满减</Radio>
              <Radio value={2}>打折</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="条件"
            name="requirement"
            rules={[
              { required: true },
              { pattern: numberReg, message: "输入数字" },
            ]}
          >
            <Input placeholder="满多少元可用" />
          </Form.Item>
          <Form.Item label="描述信息" name="description">
            <Input.TextArea maxLength={20} showCount={true} />
          </Form.Item>
          <Form.Item
            label="起始时间"
            name={"beginTime"}
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              placeholder="选择开始时间"
              onChange={(curmoment) => {
                setBeginTime(moment(curmoment));
              }}
              disabledDate={(curmoment) => {
                return moment(curmoment) <= moment(new Date());
              }}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name={"endTime"}
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              placeholder="选择结束时间"
              format={dateFormat}
              disabledDate={(curmoment) => {
                {
                  return moment(curmoment) < moment(beginTime);
                }
              }}
              onChange={(curmoment) => {
                setEndTime(moment(curmoment));
              }}
            />
          </Form.Item>

          <Form.Item
            label="张数"
            name={"num"}
            rules={[{ pattern: /^[0-9]/, message: "输入数字" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <div className="operationBox">
              <Button block type="primary" size="middle" htmlType="submit">
                {(update && "更新") || "保存"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </FDCouponWraper>
  );
});

export default FDCoupon;
