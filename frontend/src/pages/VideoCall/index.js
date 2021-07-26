import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { WrapperStyled } from "./Style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faVideo, faVideoSlash, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

const socket = io.connect("http://localhost:5000/");
const HOST_CONFIG = {
  host: "/",
  port: "5001",
};

const peerIds = [];
let myVideoStream;
const peer = new Peer(undefined, HOST_CONFIG);

function VideoCall() {
  const myVideoRef = useRef(null);
  const muteButtonRef = useRef(null);
  const stopVideoButtonRef = useRef(null);
  const [icon, setIcon] = useState({
    video: faVideo,
    micro: faMicrophone
  })

  useEffect(() => {
    peer.on("open", (id) => {
      socket.emit("join-room", id);
    });
    socket.on("user-disconnected", (userId) => {
      if (peerIds[userId]) peerIds[userId].close();
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        myVideoStream = stream;
        let video = document.createElement("video");
        video.muted = true;
        addVideoStream(video, stream, myVideoRef.current);

        peer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream, myVideoRef.current);
          });
        });

        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      });
  }, []);

  useEffect(() => {
    if (stopVideoButtonRef && stopVideoButtonRef.current) {
      stopVideoButtonRef.current.addEventListener("click", () => {
        const enabled = myVideoStream.getVideoTracks()[0].enabled;
        setIcon({ ...icon, video: enabled ? faVideoSlash : faVideo });
        toogleButton(
          stopVideoButtonRef.current,
          myVideoStream.getVideoTracks(),
        );
      });
    }
  }, [stopVideoButtonRef]);

  useEffect(() => {
    if (muteButtonRef && muteButtonRef.current) {
      muteButtonRef.current.addEventListener("click", () => {
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        setIcon({ ...icon, micro: enabled ? faMicrophoneSlash : faMicrophone });
        toogleButton(
          muteButtonRef.current,
          myVideoStream.getAudioTracks(),
        );
      });
    }
  }, [muteButtonRef]);

  const connectToNewUser = (userId, stream) => {
    setTimeout(() => {
      const call = peer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream, myVideoRef.current);
        peerIds[userId] = call;
      });

      call.on("close", () => {
        video.remove();
      });
    }, 500);
  };

  const addVideoStream = (video, stream, grid) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
      if (grid) grid.append(video);
    });
  };

  const toogleButton = (element, media, newHtml) => {
    media[0].enabled = !media[0].enabled;
  };
  return (
    <WrapperStyled>
      <div className="video-content">
        <div className="video_wapper">
          <div className="my-video" ref={myVideoRef}></div>
        </div>
        <div className="command-section">
          <div className="command_button" ref={stopVideoButtonRef}>
            <FontAwesomeIcon icon={icon.video} />
          </div>
          <div className="command_button" ref={muteButtonRef}>
            <FontAwesomeIcon icon={icon.micro} />
          </div>
        </div>
      </div>
    </WrapperStyled>
  );
}

export default VideoCall;
