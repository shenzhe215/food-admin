import React, { memo, useEffect, useState, useCallback } from "react";
import {
  Button,
  Table,
  Input,
  message,
  Modal,
  Form,
  Space,
  Select,
  Upload,
} from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  pageBanner,
  addBanner,
  updateBanner,
  removeBanner,
  pageConditionBanner,
} from "@/service/banner";
import { FDBannerWraper, TableArea } from "./style";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("文件大小必须小于 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const FDBanner = memo(() => {
  // other state
  const [bannerList, setBannerList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [visiable, setVisiable] = useState(false);
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  // 获取Banner列表
  const fetchBannerList = () => {
    pageBanner(1, pagination.pageSize).then((res) => {
      if (res.code === 20000) {
        setBannerList(res.data.list);
        setTotal(res.data.total);
      } else {
        message.error("获取菜品信息失败！");
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchBannerList();
  }, []);

  // other hooks
  // 表单提交
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      imageUrl: imageUrl,
    };
    if (!update) {
      addBanner(values).then((res) => {
        if (res.code === 20000) {
          message.success("添加成功");
          setVisiable(false);
          fetchBannerList();
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      values.id = id;
      updateBanner(values).then((res) => {
        if (res.code === 20000) {
          message.success("更新成功");
          fetchBannerList();
          setVisiable(false);
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  // 搜索表单提交
  const onFinishSearch = (fieldsValue) => {
    pageConditionBanner(1, pagination.pageSize, fieldsValue).then((res) => {
      if (res.code === 20000) {
        setBannerList(res.data.list);
        setTotal(res.data.total);
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
      content: "您确定要删除该图片么？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        removeBanner(record.id).then((res) => {
          if (res.code === 20000) {
            message.success({
              content: `删除成功`,
            });
            fetchBannerList();
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
    setFileList([]);
    setImageUrl(record.imageUrl);
    console.log(record);
    form.setFieldsValue({
      ...record,
      // imageUrl: record.imageUrl,
    });
    setVisiable(true);
  };

  // 新增菜品
  const handleAdd = () => {
    setUpdate(false);
    setImageUrl("");
    setFileList([]);
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
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "图片",
      dataIndex: "imageUrl",
      key: "title",
      render: (record) => <img src={record} width="200px" height={"140px"} />,
    },
    {
      title: "链接地址",
      dataIndex: "linkUrl",
      key: "linkUrl",
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
      return `总共有 ${total} 条数据`;
    },
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  // 图片上传
  const handleChange = (info) => {
    const { file, fileList } = info;
    const status = file.status;
    console.log(info);
    setFileList(fileList.slice());
    if (status === "uploading") {
      setLoading(true);
      console.log("uploading...");
      return;
    }
    if (status === "done") {
      setImageUrl(info.file.response.data.url);
      setLoading(false);
    }
    if (status === "error") {
      message.error({
        content: `${info.file.name} 图片上传失败`,
      });
    }
    setFileList([]);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <FDBannerWraper>
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
          dataSource={bannerList}
          columns={columns}
          bordered={true}
          rowKey={(record) => {
            return record.id;
          }}
          pagination={paginationObj}
        />
      </TableArea>
      <Modal
        visible={visiable}
        title={(update && "更新轮播图信息") || "添加轮播图"}
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
          <Form.Item
            label="轮播图"
            rules={[{ required: true }]}
            name="imageUrl"
            // valuePropName="fileList"
            // getValueFromEvent={normFile}
          >
            <Upload
              maxCount="1"
              listType="picture-card"
              action="http://127.0.0.1:9001/foodoss/fileoss"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              fileList={fileList}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="imageUrl" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="链接地址" name={"linkUrl"}>
            <Input />
          </Form.Item>
          <Form.Item label="排序号" name={"sort"}>
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
    </FDBannerWraper>
  );
});

export default FDBanner;
