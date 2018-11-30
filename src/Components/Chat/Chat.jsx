import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import './_chat.scss';
import socketConnection from '../../helper/socket';

const socket = socketConnection();

/* eslint-disable */

class Chat extends Component {
  state = {
    handle: '',
    to: '',
    message: '',
    data: []
  };

  componentDidMount() {
    socket.on('chatData', data => console.log(data));

    socket.on('typing', (res) => {
      const out = document.getElementById('feedback');
      out.innerHTML = `<p>${res}</p>`;
    });

    socket.on('chat message', (res) => {
      const out = document.getElementById('output');
      out.innerHTML += `<p>${res}</p>`;
    });

    socket.on('chat message', (data) => {
      console.log(data);
    });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  sendContent= () => {
    const { handle, to, message } = this.state;
    socket.emit('register', handle);
    // socket.emit('new', handle);
    // axios.post('http://localhost:4500/api/chat', this.state).then(
      //   (response) => {
        //     console.log(response);
        //   }
        // );
    socket.emit('chat message', { receiver: to, msg: message });
  }

  handlePress = () => {
    const { handle, to } = this.state;
    socket.emit('typing', { receiver: to, msg: `${handle} is typing` });
  }

  render() {
    return (
      <Fragment>
        <div id="Hala-chat">
          <div id="chat-window">
            <div id="output" />
            <div id="feedback" />
          </div>
          <input name="handle" id="handle" type="file" placeholder="handle" />
          <input onChange={this.onChange} name="handle" id="handle" type="text" placeholder="handle" />
          <input onChange={this.onChange} name="to" id="handle" type="text" placeholder="to" />
          <input
            onChange={this.onChange}
            onKeyPress={this.handlePress}
            name="message"
            id="message"
            type="text"
            placeholder="message"
          />
          <button onClick={this.sendContent} type="button" id="send">Send</button>
        </div>
      </Fragment>
    );
  }
}

export default Chat;
