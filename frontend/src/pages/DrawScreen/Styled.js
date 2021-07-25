import styled from "styled-components";

export const CanvasStyled = styled.canvas`  
  border: 1px solid white;
`

export const WrapperStyled = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #242f41;
  color: white;

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
