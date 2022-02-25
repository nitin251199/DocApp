import React from 'react'
import "./Message.css";


const Message = ({room, time, username, message, classs },props) => {
    if (username) {
        return (
            <>
            <div className={`messageBox ${classs}`}  >
                {`${username}: ${message.message}`}
            </div>
            <div className="message-meta">
            <p id="time">{time}</p>
            <p id="author">{username}</p>
          </div>
          </>
        )
    }
    else {


        return (
            <>
            <div className={`messageBox ${classs}`}>
                {`You: ${message.message}`}
            </div>
            <div className="message-meta">
            <p id="time">{time}</p>
            <p id="author">{username}</p>
          </div>
            </>
        )
    }
}

export default Message
