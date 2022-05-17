import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Button,
  Table,
  Input,
  message,
  Modal,
  Form,
  Radio,
  Space,
  Select,
  InputNumber,
  Upload,
  List,
  Comment,
} from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import {
  getAllFood,
  getAllType,
  getFoodListPage,
  addFoodInfo,
  deleteFoodId,
  updateFoodInfo,
  getFoodPage,
  getFoodById,
  getFoodPageCondition,
  getFoodCondition,
} from "@/service/food";
import { getCommentListById } from "@/service/comment";
import { FDFoodWraper, TableArea } from "./style";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    message.error("文件大小必须小于 2MB!");
  }
  return isJpgOrPng && isLt2M;
  return isJpgOrPng;
}

const FDFood = memo(() => {
  // state

  // other state
  const [foodList, setFoodList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [visiable, setVisiable] = useState(false);
  const [cmtVisiable, setCmtVisiable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState("");
  const [id, setId] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  const [fileList, setFileList] = useState([]);
  // 获取优惠券列表
  const fetchFoodList = () => {
    getAllFood().then((res) => {
      if (res.code === 20000) {
        setFoodList(res.data.list);
        setPagination({
          ...pagination,
          current: 1,
          total: res.data.list.length,
        });
      } else {
        message.error("获取菜品信息失败！");
      }
    });
  };

  const fetchCommetnList = (id) => {
    getCommentListById(id).then((res) => {
      if (res.code === 20000) {

        setCommentList(res.data.list);
      } else {
        message.error("获取评论信息失败！");
      }
    });
  };

  const fetchTypeList = () => {
    getAllType().then((res) => {
      if (res.code === 20000) {
        setTypeList(res.data.list);
      } else {
        message.error("获取菜品信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchFoodList();
    fetchTypeList();
  }, []);

  // other hooks
  // 表单提交
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      cover: cover,
    };
    if (!update) {
      addFoodInfo(values).then((res) => {
        if (res.code === 20000) {
          message.success("添加成功");
          setVisiable(false);
          fetchFoodList();
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      values.id = id;
      updateFoodInfo(values).then((res) => {
        if (res.code === 20000) {
          message.success("更新成功");
          fetchFoodList();
          setVisiable(false);
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  // 搜索表单提交
  const onFinishSearch = (fieldsValue) => {
    getFoodCondition(fieldsValue).then((res) => {
      if (res.code === 20000) {
        setFoodList(res.data.list);
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

  // 删除菜品
  const handleRemove = (record) => {
    Modal.confirm({
      title: "您正在执行删除操作",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要删除该菜品么？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteFoodId(record.id).then((res) => {
          if (res.code === 20000) {
            message.success({
              content: `删除成功`,
            });
            fetchFoodList();
          } else {
            message.error({
              content: res.message,
            });
          }
        });
      },
    });
  };

  // 编辑菜品信息
  const handleEdit = (record) => {
    const { id, typeId, title, cover, price } = record;
    setUpdate(true);
    setCover(cover);
    setId(id);
    getFoodById(id).then((res) => {
      if (res.code === 20000) {
        const { description } = res.data.item;
        form.setFieldsValue({
          ...record,
          //   title: title,
          //   typeId: typeId,
          //   price: price,
          description: description,
        });
      } else {
        message.error(res.message);
      }
    });

    setVisiable(true);
  };

  // 查看评论
  const handleComment = (record) => {
    const { id } = record;
    fetchCommetnList(id);
    setCmtVisiable(true);
  };

  // 新增菜品
  const handleAdd = () => {
    setUpdate(false);
    setCover("");
    setFileList([]);
    form.resetFields();
    setVisiable(true);
  };

  // 图片上传
  const handleChange = (info) => {
    const { file, fileList } = info;
    const status = file.status;
    setFileList(fileList.slice());
    if (status === "uploading") {
      setLoading(true);
      return;
    }
    if (status === "done") {
      setCover(info.file.response.data.url);
      setLoading(false);
    }
    if (status === "error") {
      message.error({
        content: `${info.file.name} 图片上传失败`,
      });
    }
    setFileList([]);
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
      title: "菜品名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "菜品分类",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "菜品价格(元)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "优惠价(元)",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (text) => (text === null ? "无优惠" : text),
    },
    {
      title: "菜品图片",
      dataIndex: "cover",
      key: "cover",
      render: (record) => <img src={record} width="50px" height={"50px"} />,
    },
    {
      title: "菜品状态",
      dataIndex: "status",
      key: "status",
      render: (text) => (text === "Normal" ? "正常" : "下架"),
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
          <Button type="primary" onClick={handleComment.bind(null, record)}>
            查看评论
          </Button>
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <FDFoodWraper>
      <div className="foodUp">
        <Form layout="inline" onFinish={onFinishSearch} form={searchForm}>
          <Form.Item label="名称" name={"title"}>
            <Input />
          </Form.Item>
          <Form.Item label="类型:" name={"typeId"}>
            <Select style={{ width: 120 }}>
              {typeList.map((type, index) => (
                <Select.Option key={index} value={type.id}>
                  {type.title}
                </Select.Option>
              ))}
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
                  searchForm.resetFields();
                  fetchFoodList();
                }}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </Button>
      </div>
      <TableArea>
        <Table
          dataSource={foodList}
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
        title={(update && "更新菜品信息") || "添加菜品"}
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
          <Form.Item label="类型" name={"typeId"} rules={[{ required: true }]}>
            <Select style={{ width: 120 }}>
              {typeList.map((type, index) => (
                <Select.Option key={index} value={type.id}>
                  {type.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="价格" name={"price"} rules={[{ required: true }]}>
            <InputNumber min="0" max="9999" step="1" />
          </Form.Item>{" "}
          <Form.Item label="优惠价" name={"discountPrice"}>
            <InputNumber min="0" max="9999" step="1" />
          </Form.Item>
          <Form.Item
            label="菜品状态"
            name={"status"}
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={"Normal"}>正常</Radio>
              <Radio value={"Draft"}>下架</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="菜品图片" name="cover" rules={[{ required: true }]}>
            <Upload
              maxCount="1"
              listType="picture-card"
              action="http://127.0.0.1:9001/foodoss/fileoss"
              className="cover-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              fileList={fileList}
            >
              {cover ? (
                <img src={cover} alt="cover" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea rows={4} maxLength={500} showCount={true} />
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
      <Modal
        visible={cmtVisiable}
        title={"菜品评论"}
        okText={"确定"}
        width={900}
        cancelText={"取消"}
        onCancel={() => {
          setCmtVisiable(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setCmtVisiable(false);
            }}
          >
            取消
          </Button>,
        ]}
      >
        <List
          className="comment-list"
          header={`${commentList.length} 条回复`}
          itemLayout="horizontal"
          dataSource={commentList}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.nickname}
                avatar={item.avatar}
                content={item.content}
                datetime={item.gmtCreate}
              />
            </li>
          )}
        />
      </Modal>
    </FDFoodWraper>
  );
});

export default FDFood;
