import React, { useState, useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ArrowRight } from 'react-bootstrap-icons';
import "../CSS/Chat.css";
import "../CSS/Common.css";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const scrollRef = useRef(null);

    const sendMessage = async () => {

        const messageData = {
            room: room,
            sender: username,
            message: currentMessage,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messageList]);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-abs-height" style={{ '--min-height': '80vh' }}>
            <div className="card min-abs-width" style={{ '--min-width': '26vw' }}>
                <div className="card-header text-center">Live Chat</div>
                <div className="card-body overflow-auto" ref={scrollRef} style={{ maxHeight: "350px", minHeight: "350px" }}>
                    <ScrollToBottom>
                        {messageList.map((message, index) => (
                            <div
                                className={`message-row ${message.sender === username ? "message-row-right" : ""
                                    }`}
                                key={index}
                            >
                                <div
                                    className={`message-bubble ${message.sender === username ? "message-bubble-right" : "message-bubble-left"
                                        }`}
                                >
                                    {message.sender !== username && (
                                        <div className="message-sender">~{message.sender}</div>
                                    )}
                                    <div className="message-content">{message.message}</div>
                                    <div className="message-time">{message.time}</div>
                                </div>
                            </div>
                        ))}
                    </ScrollToBottom>
                </div>
                <div className="card-footer d-flex p-1">
                    <input
                        type="text"
                        className="form-control border-left-0 rounded-end-0"
                        placeholder="Type a message"
                        onChange={(event) => setCurrentMessage(event.target.value)}
                        value={currentMessage}
                        onKeyPress={(event) => {
                            event.key === "Enter" && currentMessage !== "" && sendMessage();
                        }}
                    />
                    <button
                        type="button"
                        disabled={currentMessage === ""}
                        className="btn btn-outline-secondary btn-block border-right-0 rounded-start-0"
                        onClick={sendMessage}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
