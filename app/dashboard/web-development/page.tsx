"use client";

import { useState } from "react";
import ChatInterface from "@/components/chat/chat-interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function WebDevelopmentPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev: Message[]) => [...prev, userMessage]);

    try {
      // Include the new message in the messages array for the API call
      const updatedMessages = [...messages, userMessage];
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: updatedMessages,
          chatbotType: "general"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      
      // Add assistant message to chat
      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.message 
      };
      setMessages((prev: Message[]) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message to chat
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your message. Please try again.",
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-theme(spacing.12))]">
      {/* Left side: Website Preview */}
      <div className="flex-1 p-6 overflow-auto">
        <Card className="border-wood bg-wood">
          <CardHeader>
            <CardTitle>Website Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border-tan bg-tan">
              <iframe 
                src="http://localhost:3000" 
                className="w-full h-full"
                title="Website Preview"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Right side: Chat interface */}
      <div className="w-[400px] p-6 border-l bg-muted/10">
        <ChatInterface 
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
