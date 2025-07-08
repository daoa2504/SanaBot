import React from "react";
import { Message } from "../types/message";

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div style={{
      width: "100%",
      maxWidth: "600px",
      height: "400px",
      overflowY: "auto",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      marginBottom: "1rem"
    }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1rem",
            textAlign: msg.role === "user" ? "right" : "left"
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "12px",
              backgroundColor: msg.role === "user" ? "#dcf8c6" : "#ffffff",
              border: "1px solid #ddd",
              maxWidth: "80%"
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
