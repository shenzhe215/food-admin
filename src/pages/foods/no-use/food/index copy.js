import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  Upload,
  message,
} from "antd";
import {} from "@ant-design/icons";
import {} from "../store/actionCreators";
import { addFoodInfo, updateFoodInfo } from "@/service/food";

// 上传之前调用的方法
function beforeAvatarUpload(file) {
  const isJPG = file.type === "image/jpeg";

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    this.$message.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    this.$message.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}

const FDFood = memo((props) => {
  // redux hooks
  // 组件与redux关联：获取数据(useSelector)和进行操作
  const { foodInfo, typeList } = useSelector(
    (state) => ({
      typeList: state.getIn(["food", "typeList"]),
      foodInfo: state.getIn(["food", "foodInfo"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // other state
  const [form] = Form.useForm();
  const [foodId, setFoodId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [foodInfoVo, setFoodInfoVo] = useState({});
  const [fileList, setFileList] = useState([]);

  // 表单验证
  const validateMessages = {
    // ...
  };

  //  hooks
  useEffect(() => {
    if ("id" in params) {
      setIsUpdate(true);
      setFoodId(params.id);

      const { title, typeId, price, cover, isChara, status, description } =
        foodInfo;
      form.setFieldsValue({
        title: title,
        typeId: typeId,
        price: price,
        cover: cover,
        isChara: isChara,
        status: status,
        description: description,
      });
    } else {
      setIsUpdate(false);
      setFileList({});
    }
  }, []);

  useEffect(() => {
    setFoodInfoVo(foodInfo);
    let newFileList = [
      {
        uid: "-1",
        url: foodInfo.cover,
      },
    ];
    setFileList(newFileList);
  }, [foodInfo]);

  // other hooks
  const onFinish = (values) => {
    if (!isUpdate) {
      addFoodInfo(values).then((res) => {
        if (res.code === 20000) {
          // 提示信息
          message.success({
            content: `添加菜品信息成功`,
          });
        } else {
          // 提示信息
          message.success({
            content: res.message,
          });
        }
      });
    } else {
      values.id = foodId;
      updateFoodInfo(values).then((res) => {
        if (res.code === 20000) {
          // 提示信息
          message.success({
            content: `更新菜品信息成功`,
          });
        } else {
          // 提示信息
          message.success({
            content: res.message,
          });
        }
      });
    }
    // dispatch(getLocationAction());
    // 路由跳转
    navigate(`/foodservice/list`);
  };
  // const handleSubmit = useCallback(() => {
  //   if (!isUpdate) {
  //     addFoodInfo(foodInfoVo).then((response) => {
  //       // 提示信息
  //       message.success({
  //         content: `添加菜品信息成功`,
  //       });
  //       // 路由跳转
  //       navigate(`/foodservice/list`);
  //     });
  //   } else {
  //     updateFoodInfo(foodInfoVo).then((response) => {
  //       // 提示信息
  //       message.success({
  //         content: `更新菜品信息成功`,
  //       });
  //       // 路由跳转
  //       navigate(`/foodservice/list`);
  //     });
  //   }
  // }, [foodInfoVo, isUpdate]);

  // 上传封面
  const handleAvatarSuccess = useCallback(
    (info) => {
      const { file, fileList } = info;
      const status = file.status;
      setFileList(fileList.slice());
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setFoodInfoVo({
          ...foodInfoVo,
          cover: file.response.data.url,
        });
        message.success({
          content: `${info.file.name} 图片上传成功`,
        });
      } else if (status === "error") {
        message.error({
          content: `${info.file.name} 图片上传失败`,
        });
      }
      setFileList(fileList);
    },
    [fileList]
  );

  const handleCoverRemove = useCallback((file) => {
    setFileList({});
  });

  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="名称" name={"title"}>
          <Input
            // value={foodInfoVo.title}
            // onChange={(e) => {
            //   setFoodInfoVo({
            //     ...foodInfoVo,
            //     title: e.target.value,
            //   });
            // }}
            width="200px"
          />
        </Form.Item>
        <Form.Item label="分类" name="typeId">
          <Select
            style={{ width: 120 }}
            // value={foodInfoVo.typeId}
            // onChange={(value) => {
            //   setFoodInfoVo({
            //     ...foodInfoVo,
            //     typeId: value,
            //   });
            // }}
          >
            {typeList.map((type, index) => (
              <Select.Option key={index} value={type.id}>
                {type.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="价格" name={"price"}>
          <InputNumber
            min="0"
            max="999"
            step="1"
            // value={foodInfoVo.price}
            // onChange={(value) => {
            //   setFoodInfoVo({
            //     ...foodInfoVo,
            //     price: value,
            //   });
            // }}
          />
        </Form.Item>
        <Form.Item label="上传图片" name={"cover"}>
          <Upload
            maxCount="1"
            beforeUpload={beforeAvatarUpload}
            onChange={handleAvatarSuccess}
            action="http://127.0.0.1:9001/foodoss/fileoss"
            fileList={fileList}
            listType="picture-card"
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item label="是否为特色" name={"isChara"}>
          <Radio.Group
          // value={foodInfoVo.isChara}
          // onChange={(e) => {
          //   setFoodInfoVo({
          //     ...foodInfoVo,
          //     isChara: e.target.value,
          //   });
          // }}
          >
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="描述" name={"description"}>
          <Input.TextArea
          // value={foodInfoVo.description}
          // onChange={(e) => {
          //   setFoodInfoVo({
          //     ...foodInfoVo,
          //     description: e.target.value,
          //   });
          // }}
          />
        </Form.Item>

        <Form.Item label="确认">
          <Button
            type="primary"
            // onClick={handleSubmit}
            htmlType={"submit"}
          >
            确认{(isUpdate && "更新") || "提交"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default FDFood;
