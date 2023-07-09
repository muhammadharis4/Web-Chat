import React from 'react'
import "../CSS/Common.css";

function JoinRoom(props) {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center min-abs-height" style={{ '--min-height': '70vh' }}>
        <div className='card p-4'>
          <h3 className='card-header text-center pb-2'>Join a Chat Room</h3>
          <div className="pt-4 min-abs-width" style={{ '--min-width': '20vw' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(event) => {
                props.setUsername(event.target.value);
              }}
            />
          </div>

          <div className="pt-2 min-abs-width" style={{ '--min-width': '20vw' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Room number"
              onChange={(event) => {
                props.setRoom(event.target.value);
              }}
            />
          </div>

          <div className="pt-4 min-abs-width text-end" style={{ '--min-width': '20vw' }}>
            <button
              type="button"
              className="btn btn-outline-info"
              disabled={props.username === "" || props.room === "" ? true : false}
              onClick={props.joinRoom}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinRoom
