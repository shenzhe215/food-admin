import styled from "styled-components";

export const LoginWraper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  /* background-color: rgba(123, 0, 0, 0.5); */
  background-image: url(${require("@/assets/img/bg.jpg")});
  /* background-image: url("src/pages/login/bg.png"); */
  /* background-image: url('./bg.jpg'); */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .title {
    text-align: center;
  }
  .login-container {
    background-image: url("./bg.jpg");
    /* width: 400px; */
    /* height: 300px; */
    width: 40%;
    height: 40%;
    /* background-color: skyblue; */
    position: absolute;
    top: 20%;
    left: 30%;
    /* margin-top: 200px;
    margin-left: -200px; */
  }
`;

export const FormWraper = styled.div`
  .inputText {
    width: 200px;
  }

  .submitBtn {
    margin-left: 70px;
  }
`;
