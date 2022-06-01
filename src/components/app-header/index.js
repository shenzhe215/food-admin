import React, { memo, useState, useEffect } from "react";

import { Layout, Modal, Button, Form, Input, message, Avatar } from "antd";
import { MyIcon } from "@/common/local-data";
import { LeftWraper, RightWraper, HeaderWraper } from "./style";
import { getCaptcha, verify, handleLogin } from "@/service/login";

// 默认头像
const DEFAULT_AVATAR =
  "https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg";

const FDAppHeader = memo(() => {
  const { Header } = Layout;
  const [visiable, setVisiable] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [captcha, setCaptcha] = useState();
  const [key, setKey] = useState();
  const [adminInfo, setAdminInfo] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const pwdReg = /[0-9a-zA-Z._-]{5,20}/;
  const captchaReg = /[a-zA-Z0-9]{5}/;
  const fetchCaptcha = () => {
    getCaptcha().then((res) => {
      if (res.code === 20000) {
        setCaptcha(res.data.image);
        setKey(res.data.key);
      }
    });
  };

  // hooks
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // 表单提交
  const onFinish = (values) => {
    const { captcha } = values;
    var verifyVo = {
      code: captcha,
      key: key,
    };
    verify(verifyVo).then((res) => {
      if (res.code === 20000) {
        handleLogin(values).then((res) => {
          if (res.code === 20000) {
            setAdminInfo(res.data.user);
            message.success("登录成功", 1);
            setIsLogin(true);
            setVisiable(false);
          } else {
            message.error(res.message, 1);
          }
        });
      } else {
        fetchCaptcha();
        message.error("验证码错误", 1);
      }
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const formTailLayout = {
    wrapperCol: { span: 16, offset: 18 },
  };
  return (
    <Header>
      <HeaderWraper>
        <LeftWraper>
          <span className="icon">
            <MyIcon type="icon-food1-copy" />
          </span>
          <span className="title">湘情土菜馆系统后台</span>
        </LeftWraper>
        <RightWraper>
          {(isLogin && (
            <span className="admin-info">
              <Avatar src={adminInfo.salt || DEFAULT_AVATAR}></Avatar>
              <span className="welcome">欢迎{adminInfo.nickName}</span>
            </span>
          )) || (
            <span
              className="login"
              onClick={() => {
                setVisiable(true);
                fetchCaptcha();
              }}
            >
              登录
            </span>
          )}
        </RightWraper>
      </HeaderWraper>
      <Modal
        visible={visiable}
        title={"管理员登录"}
        okText={"登录"}
        width={500}
        cancelText={"取消"}
        onCancel={() => {
          setVisiable(false);
        }}
        footer={[]}
      >
        <Form
          {...formItemLayout}
          layout="horizontal"
          onFinish={onFinish}
          labelAlign="right"
          size="large"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                // pattern: ,
                message: `请输入正确的用户名`,
              },
              { required: true, message: "请输入你的用户名" },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { pattern: pwdReg, message: "密码最短6位" },
              { required: true, message: "请输入密码!" },
            ]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[
              {
                pattern: captchaReg,
                message: `请输入验证码`,
              },
              { required: true, message: "请输入验证码" },
            ]}
          >
            <Input
              placeholder="请输入验证码"
              addonAfter={
                <img
                  onClick={fetchCaptcha}
                  src={captcha}
                  width="130px"
                  height="38px"
                />
              }
            />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
});

export default FDAppHeader;
