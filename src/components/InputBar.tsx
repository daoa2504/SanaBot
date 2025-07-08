import React, { useState } from "react";

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border border-green-300 rounded-l px-4 py-2 focus:outline-none"
        placeholder="Décris tes symptômes..."
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 disabled:opacity-50"
        disabled={disabled}
      >
        Envoyer
      </button>
    </form>
  );
};

export default InputBar;
