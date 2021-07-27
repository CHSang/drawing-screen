import React, { useEffect, useRef, useState, useCallback } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { WrapperStyled } from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
const { v4: uuidv4 } = require("uuid");

const socket = io.connect("http://localhost:5000/");
let myVideoStream;

function VideoCall({roomId}) {
  const videoContainerRef = useRef(null);
  const [icon, setIcon] = useState({
    video: faVideo,
    micro: faMicrophone,
  });
  const [peerIds, setPeerIds] = useState([]);

  useEffect(() => {
    if (!roomId) {
       return; 
    }
    const peer = new Peer(undefined, {
      host: "/",
      port: "5001",
    });

     peer.on("open", (id) => {
      console.log("room id in video" + roomId);
      socket.emit("join-room", roomId, id);
    });

    socket.on("user-disconnected", (userId) => {
      if (peerIds[userId]) peerIds[userId].close();
    });

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        myVideoStream = stream;
        let video = document.createElement("video");
        video.muted = true;
        addVideoStream(video, stream);

        peer.on("call", (call) => {
          console.log("receive peer");
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          connectNewUser(userId, stream, peer);
        });
      });
  }, [roomId]);

  const connectNewUser = useCallback((userId, stream, peer) => {
    setTimeout(() => {
      const call = peer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
        peerIds[userId] = call;
        setPeerIds(peerIds);
      });
      call.on("close", () => {
        video.remove();
      });
    }, 500);
  }, []);

  const addVideoStream = useCallback((video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
      if (videoContainerRef && videoContainerRef.current) videoContainerRef.current.append(video);
    });
  }, []);

  const stopVideoButtonClickHandler = useCallback(() => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    setIcon({ ...icon, video: enabled ? faVideoSlash : faVideo });
    myVideoStream.getVideoTracks()[0].enabled = !enabled;
  }, []);

  const muteButtonClickHandler = useCallback(() => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    setIcon({ ...icon, micro: enabled ? faMicrophoneSlash : faMicrophone });
    myVideoStream.getAudioTracks()[0].enabled = !enabled;
  }, []);

  return (
    <WrapperStyled>
      <div className="video-content">
        <div className="video_section">
          <div className="video-container" ref={videoContainerRef}></div>
        </div>
        <div className="command-section">
          <FontAwesomeIcon
            className="icon"
            icon={icon.video}
            onClick={stopVideoButtonClickHandler}
          />
          <FontAwesomeIcon
            icon={icon.micro}
            className="icon"
            onClick={muteButtonClickHandler}
          />
        </div>
      </div>
    </WrapperStyled>
  );
}

export default VideoCall;
