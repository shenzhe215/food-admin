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
import { addFoodInfo, updateFoodInfo } from "@/service/food";
import {
  changeFoodInfoAction,
  changeFoodCoverAction,
} from "../store/actionCreators";
import { FDFoodInfoWraper } from "./style";

const FDFood = memo((props) => {
  // redux hooks
  // 组件与redux关联：获取数据(useSelector)和进行操作
  const { foodInfo, typeList, cover } = useSelector(
    (state) => ({
      typeList: state.getIn(["food", "typeList"]),
      foodInfo: state.getIn(["food", "foodInfo"]),
      cover: state.getIn(["food", "cover"]),
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

      if (foodInfo.cover === "") {
        setFileList([]);
      } else {
        // 设置图片信息
        let newFileList = [
          {
            uid: "-1",
            url: foodInfo.cover,
          },
        ];
        setFileList(newFileList);
      }

      const { title, typeId, price, cover, isChara, status, description } =
        foodInfo;
      form.setFieldsValue({
        title: title,
        typeId: typeId,
        price: price,
        cover: cover,
        status: status,
        description: description,
      });
    } else {
      dispatch(changeFoodInfoAction({}));
      dispatch(changeFoodCoverAction(""));
      setIsUpdate(false);
      setFileList([]);
    }
  }, [foodInfo, cover]);

  // other hooks
  const onFinish = (values) => {
    values.cover = cover;
    values.status = "Normal";
    if (!isUpdate) {
      addFoodInfo(values).then((res) => {
        if (res.code === 20000) {
          // 提示信息
          message.success({
            content: `添加菜品信息成功`,
          });
        } else {
          // 提示信息
          message.error({
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
          message.error({
            content: res.message,
          });
        }
      });
    }
    // dispatch(getLocationAction());
    // 路由跳转
    navigate(`/foodservice/list`);
  };

  // 上传封面

  const handleAvatarSuccess = (info) => {
    const { file, fileList } = info;
    const status = file.status;
    setFileList(fileList.slice());
    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
      dispatch(changeFoodCoverAction(file.response.data.url));
      message.success({
        content: `${info.file.name} 图片上传成功`,
      });
    } else if (status === "error") {
      message.error({
        content: `${info.file.name} 图片上传失败`,
      });
    }
    setFileList(fileList);
  };


  // 上传之前调用的方法
  const beforeAvatarUpload = (file) => {
    const isJPG = file.type === "image/jpeg";

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
      setFileList([]);
      message.error({
        content: `上传头像图片只能是 JPG 格式!`,
      });
    }
    if (!isLt2M) {
      setFileList([]);
      message.error({
        content: `上传头像图片大小不能超过 2MB!`,
      });
    }
    return isJPG && isLt2M;
  };

  const handleCoverRemove = (file) => {
    setFileList([]);
  };

  return (
    <FDFoodInfoWraper>
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
          <Input width="200px" />
        </Form.Item>
        <Form.Item label="分类" name="typeId">
          <Select style={{ width: 120 }}>
            {typeList.map((type, index) => (
              <Select.Option key={index} value={type.id}>
                {type.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="价格" name={"price"}>
          <InputNumber min="0" max="9999" step="1" />
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
        {/* <Form.Item label="是否为特色" name={"isChara"}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item> */}

        <Form.Item label="描述" name={"description"}>
          <Input.TextArea />
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
    </FDFoodInfoWraper>
  );
});

export default FDFood;
