import React, { memo, useEffect, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Table,
  Form,
  Button,
  Input,
  message,
  Pagination,
  Select,
  Space,
  Modal,
} from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getTypeListAction,
  removeFoodAction,
  getFoodListPageAction,
  getFoodListPageConditionAction,
  changeFoodCoverAction,
  getFoodInfoByIdAction,
} from "../store/actionCreators";
import { deleteFoodId } from "@/service/food";
import { useNavigate } from "react-router-dom";

const FDFoodList = memo(() => {
  const { Column } = Table;
  const navigate = useNavigate();
  // redux hooks
  // 组件额redux关联：获取数据(useSelector)和进行操作
  const { foodList, typeList, total } = useSelector(
    (state) => ({
      foodList: state.getIn(["food", "foodList"]),
      typeList: state.getIn(["food", "typeList"]),
      total: state.getIn(["food", "total"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // useState
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    title: "",
    typeId: "",
  });
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
  });

  // 发送网络请求
  useEffect(() => {
    dispatch(getFoodListPageAction(pageInfo.current, pageInfo.pageSize));
    dispatch(getTypeListAction());
  }, []);

  // 解决：通过添加foodinfo和cover依赖解决
  // 处理事件
  const handleEdit = useCallback(
    (record) => {
      const id = record.id;
      dispatch(getFoodInfoByIdAction(id));
      dispatch(changeFoodCoverAction(record.cover));

      // 路由跳转
      navigate(`/foodservice/food/${id}`);
    },
    [foodList, navigate]
  );

  const handlePageChange = useCallback(
    (current, pageSize) => {
      setPageInfo({
        current: current,
        pageSize: pageSize,
      });
      if (searchInfo == null) {
        dispatch(getFoodListPageAction(current, pageSize));
      } else {
        dispatch(
          getFoodListPageConditionAction(
            pageInfo.current,
            pageInfo.pageSize,
            searchInfo
          )
        );
      }
    },
    [pageInfo, searchInfo]
  );

  const handleSearch = useCallback(() => {
    dispatch(
      getFoodListPageConditionAction(
        pageInfo.current,
        pageInfo.pageSize,
        searchInfo
      )
    );
  }, [searchInfo]);

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
            dispatch(
              getFoodListPageAction(pageInfo.current, pageInfo.pageSize)
            );
          } else {
            message.error({
              content: res.message,
            });
          }
        });
        // dispatch(removeFoodAction(record.id));
      },
    });
  };

  return (
    <div>
      <Form layout="inline">
        <Form.Item label="名称:">
          <Input
            onChange={(e) => {
              setSearchInfo({
                ...searchInfo,
                title: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="类型:">
          <Select
            style={{ width: 120 }}
            onChange={(value) => {
              setSearchInfo({
                ...searchInfo,
                typeId: value,
              });
            }}
          >
            {typeList.map((type, index) => (
              <Select.Option key={index} value={type.id}>
                {type.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={(e) => handleSearch()}
          >
            搜索
          </Button>
        </Form.Item>
      </Form>
      <br />
      <Table bordered dataSource={foodList} rowKey={(record) => record.id}>
        <Column title="菜品名称" dataIndex="title" key="title" />
        <Column title="菜品分类" dataIndex="typeId" key="typeId" />
        <Column title="菜品价格" dataIndex="price" key="price" />
        <Column
          title="菜品图片"
          dataIndex="cover"
          key="cover"
          render={(record) => <img src={record} width="50px" />}
        />
        <Column
          title="菜品状态"
          dataIndex="status"
          key="status"
          render={(text) => (text === "Normal" ? "正常" : "下架")}
        />
        <Column
          title="操作"
          key="action"
          render={(record) => (
            <Space size="middle">
              <Button type="primary" onClick={handleEdit.bind(null, record)}>
                编辑
              </Button>
              <Button type="danger" onClick={handleRemove.bind(null, record)}>
                删除
              </Button>
            </Space>
          )}
        />
      </Table>
      <br />
      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        defaultPageSize={1}
        showTotal={(total) => `总共 ${total} 条`}
        onChange={(current, pageSize) => {
          handlePageChange(current, pageSize);
        }}
      />
    </div>
  );
});

export default FDFoodList;
