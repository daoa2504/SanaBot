import React, { useEffect, useState } from "react";
import { Message } from "./types/message";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import ApiKeyModal from "./components/ApiKeyModal";
import { callOpenAI } from "./utils/openai";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🌿 Bonjour, je suis SanaBot. Décris-moi doucement ce que tu ressens.",
    },
  ]);

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (!storedKey) {
      setShowModal(true);
    } else {
      setApiKey(storedKey);
    }
  }, []);

  const handleUserMessage = async (userInput: string) => {
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      if (!apiKey) throw new Error("API key missing");

      const assistantReply = await callOpenAI(newMessages, apiKey);
      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "❗ Une erreur est survenue. Vérifie ta clé API.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-between py-8 px-4">
      <h1 className="text-3xl font-semibold text-green-700 mb-4">SanaBot 🌿</h1>
      <ChatWindow messages={messages} />
      <InputBar onSend={handleUserMessage} disabled={isLoading || showModal} />
      {showModal && <ApiKeyModal onSubmit={handleApiKeySubmit} />}
    </div>
  );
};

export default App;
