import React, { useState } from 'react';

const MessagingPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        // API call to send message (to be implemented)
        setMessages([...messages, { content: message }]);
        setMessage('');
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessagingPage;
