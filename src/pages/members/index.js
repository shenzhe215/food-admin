import React, { memo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Input, message, Form, Space, Select } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import {
  getMemberList,
  getMemberConditionList,
  disableMember,
  unDisableMember,
} from "@/service/member";
import { FDMemberWraper, TableArea } from "./style";

const FDMember = memo(() => {
  // state
  const navigate = useNavigate();

  // other state
  const [memberList, setMemberList] = useState([]);
  const [locationList, setLocationLIst] = useState([]);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  // 获取优惠券列表
  const fetchMemberList = () => {
    getMemberList().then((res) => {
      if (res.code === 20000) {
        setMemberList(res.data.list);
        setPagination({
          ...pagination,
          current: 1,
          total: res.data.list.length,
        });
      } else {
        message.error("获取会员信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchMemberList();
  }, []);

  // other hooks

  // 搜索表单提交
  const onFinishSearch = (fieldsValue) => {
    getMemberConditionList(fieldsValue).then((res) => {
      if (res.code === 20000) {
        setMemberList(res.data.list);
        setPagination({
          ...pagination,
          current: 1,
          total: res.data.list.length,
        });
      } else {
        message.error("查询会员列表失败");
      }
    });
  };

  // 禁用会员信息
  const handleDisable = (record) => {
    const { id } = record;
    disableMember(id).then((res) => {
      if (res.code !== 20000) {
        message.error("禁用用户失败");
      } else {
        fetchMemberList();
      }
    });
  };

  // 解除禁用会员信息
  const handleUndisable = (record) => {
    const { id } = record;
    unDisableMember(id).then((res) => {
      if (res.code !== 20000) {
        message.error("解除禁用用户失败");
      } else {
        fetchMemberList();
      }
    });
  };

  // render

  const columns = [
    {
      title: "会员昵称",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "会员积分",
      dataIndex: "credit",
      key: "credit",
      render: (text) => (text === null ? 0 : text),
    },
    {
      title: "是否禁用",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (text) => (text ? "已禁用" : "正常"),
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
      key: "gmtCreate",
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <Space size="middle">
          {!record.isDisabled ? (
            <Button type="danger" onClick={handleDisable.bind(null, record)}>
              禁用
            </Button>
          ) : (
            <Button type="primary" onClick={handleUndisable.bind(null, record)}>
              解除禁用
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 页面改变
  const paginationChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize });
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
    <FDMemberWraper>
      <div className="foodUp">
        <Form layout="inline" onFinish={onFinishSearch} form={form}>
          <Form.Item label="昵称" name={"nickname"}>
            <Input />
          </Form.Item>{" "}
          <Form.Item label="手机号" name={"mobile"}>
            <Input />
          </Form.Item>
          <Form.Item label="账户状态:" name={"isDisabled"}>
            <Select style={{ width: 120 }}>
              <Select.Option value={""}>全部</Select.Option>
              <Select.Option value={0}>正常</Select.Option>
              <Select.Option value={1}>已禁用</Select.Option>
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
                  fetchMemberList();
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
          dataSource={memberList}
          columns={columns}
          bordered={true}
          pagination={paginationObj}
          rowKey={(record) => {
            return record.id;
          }}
        />
      </TableArea>
    </FDMemberWraper>
  );
});

export default FDMember;
