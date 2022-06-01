import styled from "styled-components";

export const HeaderWraper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LeftWraper = styled.div`
  width: 210px;

  display: flex;
  justify-content: space-between;
  .icon {
    font-size: 20px;
    color: white;
  }

  .title {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }
`;

export const RightWraper = styled.div`
  color: white;

  .login {
    cursor: pointer;
  }

  .admin-info {
    .welcome {
      margin-left: 8px;
      font-size: 15px;
    }
  }
`;
