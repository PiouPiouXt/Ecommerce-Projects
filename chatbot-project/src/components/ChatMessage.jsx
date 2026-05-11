import UserProfileImage from '../assets/user.png';
import RobotProfileImage from '../assets/robot.png';
import './ChatMessage.css'


export function ChatMessage({ message, sender }) { //(props ... props.message, props.sender)

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>

      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}