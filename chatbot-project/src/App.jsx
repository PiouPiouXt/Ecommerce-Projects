import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages' //default export can be imported with any name, but named export must be imported with the same name as it was exported
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  //const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];   //current data
  // const setChatMessages = array[1] ; //function that uptades the data
  return (
    <div className="app-container">
      {(chatMessages.length === 0) &&
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below
        </p>
      }
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
