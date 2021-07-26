import styled from "styled-components";

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

  .video-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .command-section {
      display: flex;
      justify-content: center;
      font-size: 15px;
      padding: 10px;

      .command_button {
        display: flex;
        background: blue;
        padding: 10px;
        border-radius: 10px;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        justify-content: center;
        align-items: center;
      }
    }

    .video_wapper {
      display: flex;
      flex-direction: column;
      border-bottom-style: solid;

      .my-video {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-bottom: 13px;
        align-items: center;

        video {
          width: 150px;
          height: 150px;
          margin-right: 0px;
          border-radius: 25px;
          padding-right: 10px;
        }
      }
    }
  }
`;
