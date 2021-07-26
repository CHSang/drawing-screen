import styled from "styled-components";

export const CanvasStyled = styled.canvas`  
  border: 1px solid white;
`
export const WrapperStyled = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
    background-color: #242f41;
    color: white;

  .content {
    display: flex;
    flex-direction: row;

    .left {
      display: flex;
      flex-direction: column;

      .footer {
        margin-bottom: 10px;
      }
    }

    .right {
      margin-left:20px;
    }
  }

  .header {
    background-color: #161d29;
    color: #eeeeee;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    pointer-events: none;
  }
`
