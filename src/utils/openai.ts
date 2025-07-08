import { Message } from "../types/message";

export const callOpenAI = async (
  messages: Message[],
  apiKey: string
): Promise<string> => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // obligatoire pour OpenRouter
      "X-Title": "SanaBot",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct", // ou "openai/gpt-3.5-turbo", "anthropic/claude-3-haiku"...
      messages: messages,
    }),
  });

  if (!response.ok) {
    console.error("Erreur OpenRouter:", await response.text());
    throw new Error("Erreur OpenRouter");
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
