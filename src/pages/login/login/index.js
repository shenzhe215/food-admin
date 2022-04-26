// import React, { useState, useEffect, memo } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Checkbox,
//   notification,
//   Layout,
//   Spin,
//   Divider,
// } from "antd";
// import { user } from "@ant-design/icons";

// import { FormWraper, LoginWraper } from "./style";
// import { Link } from "react-router-dom";
// // import "./index.less";

// const Login = memo(() => {
//   const [loading, setLoading] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     password: "",
//   });

//   const { isVisible } = useSelector(
//     (state) => ({
//       isVisible: state.getIn(['loginState', 'isVisible']),
//     }),
//     shallowEqual
//   )

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 这里可以做权限校验 模拟接口返回用户权限标识
//     switch (values.username) {
//       case "admin":
//         values.auth = 0;
//         break;
//       default:
//         values.auth = 1;
//     }
//     localStorage.setItem("user", JSON.stringify(values));
//     setLoading(true);
//     setTimeout(() => {
//       message.success("登录成功!");
//       props.history.push("/");
//     }, 2000);
//   };

//   useEffect(() => {
//     notification.open({
//       message: "欢迎使用后台管理平台",
//       duration: 3,
//     });
//     return () => {
//       notification.destroy();
//     };
//   }, []);

//   return (
//     <LoginWraper>
//       <div className="login-container">
//         <FormWraper>
//           <Form
//             className="content"
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//           >
//             <div className="title">
//               <h2>用户登录</h2>
//             </div>
//             <Divider />
//             <Spin spinning={loading} tip="登录中...">
//               <Form.Item
//                 label="用户名"
//                 name="username"
//                 rules={[
//                   {
//                     required: true,
//                     message: "请输入用户名!",
//                   },
//                 ]}
//               >
//                 <Input
//                   className="inputText"
//                   onChange={(e) => {
//                     setUserInfo({
//                       ...userInfo,
//                       username: e.target.value,
//                     });
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="密码"
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "请输入密码!",
//                   },
//                 ]}
//               >
//                 <Input.Password
//                   className="inputText"
//                   onChange={(e) => {
//                     setUserInfo({
//                       ...userInfo,
//                       password: e.target.value,
//                     });
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 wrapperCol={{
//                   offset: 8,
//                   span: 16,
//                 }}
//               >
//                 <Link to="/register">
//                   <Button type="default">注册</Button>
//                 </Link>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="submitBtn"
//                   onClick={handleSubmit}
//                 >
//                   提交
//                 </Button>
//               </Form.Item>
//             </Spin>
//           </Form>
//         </FormWraper>
//       </div>
//     </LoginWraper>
//   );
// });

// export default Login;
