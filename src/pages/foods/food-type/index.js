import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Button,
  Table,
  Input,
  message,
  Modal,
  Form,
  Space,
} from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getAllType,
  getTypeByTitle,
  removeType,
  updateType,
  addType,
} from "@/service/food";
import { FDTypeWraper, TableArea } from "./style";

const FDFoodType = memo(() => {
  // state

  // other state
  const [typeList, setTypeList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [visiable, setVisiable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  // 获取菜品列表
  const fetchTypeList = () => {
    getAllType().then((res) => {
      if (res.code === 20000) {
        console.log(res);
        setTypeList(res.data.list);
      } else {
        message.error("获取菜品信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchTypeList();
  }, []);

  // other hooks
  // 表单提交
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
    };
    if (!update) {
      addType(values).then((res) => {
        if (res.code === 20000) {
          message.success("添加成功");
          setVisiable(false);
          fetchTypeList();
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      values.id = id;
      updateType(values).then((res) => {
        if (res.code === 20000) {
          message.success("更新成功");
          fetchTypeList();
          setVisiable(false);
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  // 搜索表单提交
  const onFinishSearch = (fieldsValue) => {
    console.log(fieldsValue);
    getTypeByTitle(fieldsValue).then((res) => {
      if (res.code === 20000) {
        setTypeList(res.data.list);
      } else {
        message.error(res.message);
      }
    });
  };

  // 删除菜品分类
  const handleRemove = (record) => {
    Modal.confirm({
      title: "您正在执行删除操作",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除该分类么？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        removeType(record.id).then((res) => {
          if (res.code === 20000) {
            message.success({
              content: `删除成功`,
            });
            fetchTypeList();
          } else {
            message.error({
              content: res.message,
            });
          }
        });
      },
    });
  };

  // 编辑菜品分类信息
  const handleEdit = (record) => {
    setUpdate(true);
    setId(record.id);
    form.setFieldsValue({
      ...record,
    });
    setVisiable(true);
  };

  // 新增菜品
  const handleAdd = () => {
    setUpdate(false);
    form.resetFields();
    setVisiable(true);
  };

  // render
  // 表单样式
  const formItemLayout = {
    labelCol: { span: 4, offset: 4 },
    wrapperCol: { span: 12 },
  };

  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12, offset: 8 },
  };

  const columns = [
    {
      title: "编号",
      key: "num",
      render: (text, record, index) => index + 1,
    },
    {
      title: "菜品分类名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "排序号",
      dataIndex: "sort",
      key: "sort",
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
    <FDTypeWraper>
      <div className="foodUp">
        <Form layout="inline" onFinish={onFinishSearch}>
          <Form.Item label="名称" name={"title"}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </Button>
      </div>
      <TableArea>
        <Table
          dataSource={typeList}
          columns={columns}
          bordered={true}
          rowKey={(record) => {
            return record.id;
          }}
        />
      </TableArea>
      <Modal
        visible={visiable}
        title={(update && "更新分类信息") || "添加分类"}
        okText={"确定"}
        cancelText={"取消"}
        onCancel={() => {
          setVisiable(false);
        }}
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
        <Form
          layout="horizontal"
          onFinish={onFinish}
          form={form}
          {...formItemLayout}
          validateMessages={validateMessages}
        >
          <Form.Item label="名称" name={"title"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="排序号" name={"sort"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <div className="operationBox">
              <Button block type="primary" htmlType="submit">
                {(update && "更新") || "保存"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </FDTypeWraper>
  );
});

export default FDFoodType;
