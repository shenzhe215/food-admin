import styled from "styled-components";
export const ContentWrapper = styled.div`
  height: auto;

  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
`;

export const SiderMenuWrapper = styled.div`
  height: calc(100% - 64px);
  background: #fff;
  width: 200px;
  float: left;
`;

export const ContentInsideWrapper = styled.div`
  height: 100%;
`;
