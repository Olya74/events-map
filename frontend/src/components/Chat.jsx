import {use, useEffect,useState} from 'react'
import {io} from 'socket.io-client'
import api from '../api'

const socket = io('http://localhost:8834')

function Chat(eventId,user) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    useEffect(() => {
        socket.emit('joinRoom', eventId);
        api.get(`/events/${eventId}/chat`).then(res=>{
            setMessages(res.data);
        });
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        socket.on('chatHistory', (history) => {
            setMessages(history);
        });
        return () => {
            socket.off('message');
            socket.off('chatHistory');
        };
    }
    , [eventId]);
    const sendMessage = () => {
        if (text.trim()) {
            socket.emit('sendMessage', {eventId,userId:user.id, text});
            setText('');
        }
    }
   
  return (
    <div>
      <h2>Event Chat</h2>
      <div className="chat-box">
        {messages.map((message) => (
          <p key={message.id} className="message">
            <strong>{message.userId}: </strong>
            {message.text}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .chat-box {
          border: 1px solid #ccc;
          padding: 10px;
          height: 300px;
          overflow: hidden;
          
        }
        .message {
          margin: 5px 0;
        }
        .chat-input {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        input {
          width: 80%;
          padding: 5px;
        }
        button {
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
}

export default Chat
