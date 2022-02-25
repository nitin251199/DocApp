import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToBottom from "react-scroll-to-bottom";
import sendLogo from "../images/send.png";
import "./Chat.css";
import { Button, Fab, IconButton } from "@material-ui/core";
import Dropzone from "react-dropzone";
import { postDataAndImage, ServerURL } from "../../FetchNodeServices";
import { PhotoCamera } from "@material-ui/icons";
import GetAppIcon from "@material-ui/icons/GetApp";
import Modal from "@material-ui/core/Modal";
import printJS from "print-js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Chat({ socket, username, room }, props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [message, setMessage] = useState("");

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = (messageContent) => {
    setOpen(true);
    setMessage(messageContent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {message !== "" ? (
        <>
          <img
            style={{
              maxWidth: 400,
              paddingBottom: 5,
              paddingTop: 5,
              borderRadius: 10,
            }}
            src={`${ServerURL}/${message.message.substring(
              7,
              message.message.length
            )}`}
            alt="image"
          />
          <div style={{ position: "absolute", top: "5%", left: "88%" }}>
            <Fab
              onClick={() =>
                printJS(
                  `${ServerURL}/${message.message.substring(
                    7,
                    message.message.length
                  )}`,
                  "image"
                )
              }
              size="medium"
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <GetAppIcon />
            </Fab>
          </div>
        </>
      ) : null}
    </div>
  );

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [msgType, setMsgType] = useState("");

  const handleDrop = async (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("picture", files[0]);
    var result = await postDataAndImage("users/chatpictures", formData, config);
    if (result.success) {
      setCurrentMessage(result.url);
      setMsgType("VideoOrImage");
      const messageData = {
        room: room,
        author: username,
        message: result.url,
        type: msgType,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        type: msgType,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    {messageContent.message.substring(0, 6) === "public" ? (
                      // video or image
                      messageContent.message.substring(
                        messageContent.message.length - 3,
                        messageContent.message.length
                      ) === "mp4" ? (
                        <video
                          style={{
                            maxWidth: 200,
                            paddingBottom: 5,
                            paddingTop: 5,
                            borderRadius: 10,
                          }}
                          src={`${ServerURL}/${messageContent.message.substring(
                            7,
                            messageContent.message.length
                          )}`}
                          alt="video"
                          type="video/mp4"
                          controls
                        />
                      ) : (
                        <img
                          onClick={() => handleOpen(messageContent)}
                          style={{
                            maxWidth: 200,
                            paddingBottom: 5,
                            paddingTop: 5,
                            borderRadius: 10,
                          }}
                          src={`${ServerURL}/${messageContent.message.substring(
                            7,
                            messageContent.message.length
                          )}`}
                          alt="image"
                        />
                      )
                    ) : (
                      <p>{messageContent.message}</p>
                    )}
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
            setMsgType("text");
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <Dropzone onDrop={(files) => handleDrop(files)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} >
                <input {...getInputProps()} />
                <Button
                  color="primary"
                  size="large"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={sendMessage}>
          <img src={sendLogo} alt="send" width="25px" />
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default Chat;
