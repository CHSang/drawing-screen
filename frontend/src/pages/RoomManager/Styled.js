import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .dialog {
    width: 700px;
    background: antiquewhite;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 10px;

    .list-group {
      margin-top: 10px;
    }

    button {
      width: 450px;
      font-size: 15px;
      font-weight: 500;
    }
  }
`;
