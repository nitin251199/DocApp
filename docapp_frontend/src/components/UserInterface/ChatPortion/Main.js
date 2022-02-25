import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import Chat from "./Chat";
import './Chat.css'
import Chat2 from "../ChatPortion2/Chat/Chat"
import socketContext from "../../../contexts/socketContext";
import { SocketContext } from '../../../contexts/Context';



// const socket = io.connect("http://localhost:3001");


function Main(props) {
  const {socket} = useContext(SocketContext);
  const [username, setUsername] = useState(props.username);
  const [room, setRoom] = useState(props.room);
//   const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    //   setShowChat(true);
    }
  };

  useEffect( function(){
    joinRoom()
  },[])

  return (
    <>
    <div>
      {/* {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            value={username}
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            value={room}
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : ( */}
      <div>
        <Chat socket={socket} username={username} room={room} />
        </div>
        {/* <div style={{marginTop:60}}>
        <Chat2 username={username} room={room} />
        </div> */}
      {/* )} */}
    </div>
    </>
  );
}

export default Main;