"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  businessType?: string;
}

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage: (message: string) => void;
  onBusinessTypeChange?: (businessType: string | null) => void;
}

export default function ChatInterface({ 
  messages = [],
  onSendMessage,
  onBusinessTypeChange 
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      try {
        await onSendMessage(input);
      } finally {
        setIsLoading(false);
      }
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto mb-4">
        {Array.isArray(messages) && messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]' 
                : 'bg-muted text-muted-foreground max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>HnDL is on the job...</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Send'
          )}
        </Button>
      </form>
    </div>
  );
}
