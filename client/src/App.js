import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import JoinRoom from "./components/JoinRoom";
import Heading from "./components/Heading";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { username: username, room: room });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <Heading />
      {!showChat ? (
        <JoinRoom username={username} setUsername={setUsername} room={room} setRoom={setRoom} joinRoom={joinRoom} />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
