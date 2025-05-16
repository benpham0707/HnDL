"use client";

import { useState } from "react";
import ChatInterface from "@/components/chat/chat-interface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Building, Heart, Receipt, FileText, Wrench, Lightbulb, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFPreview } from "@/components/ui/pdf-preview";

interface Message {
  role: "user" | "assistant";
  content: string;
  businessType?: string;
}

interface LegalCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  color: string;
}

interface LegalDocument {
  id: string;
  title: string;
  pdfUrl: string;
  updatedAt: string;
  signed: boolean;
}

const legalCategories: LegalCategory[] = [
  {
    id: "licenses",
    title: "Business Licenses",
    description: "Required permits and licenses for operation",
    icon: Shield,
    iconColor: "text-blue-500",
    color: "border-blue-200 bg-blue-50"
  },
  {
    id: "contracts",
    title: "Contracts",
    description: "Legal agreements and contracts",
    icon: FileText,
    iconColor: "text-green-500",
    color: "border-green-200 bg-green-50"
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "Regulatory compliance documents",
    icon: Wrench,
    iconColor: "text-purple-500",
    color: "border-purple-200 bg-purple-50"
  }
];

const currentDocuments: LegalDocument[] = [
  {
    id: "1",
    title: "Business License",
    pdfUrl: "/documents/business-license.pdf",
    updatedAt: "2024-03-15",
    signed: true
  },
  {
    id: "2",
    title: "Operating Agreement",
    pdfUrl: "/documents/operating-agreement.pdf",
    updatedAt: "2024-03-10",
    signed: false
  },
  {
    id: "3",
    title: "Tax Registration",
    pdfUrl: "/documents/tax-registration.pdf",
    updatedAt: "2024-03-05",
    signed: true
  }
];

export default function SetupPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("licenses");

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log('Client received response:', data);
      
      // Add assistant response to chat with business type if present
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.message,
        businessType: data.businessType 
      }]);

      // Update selected business type
      if (data.businessType) {
        console.log('Setting business type:', data.businessType);
        setSelectedBusinessType(data.businessType);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error processing your request." 
      }]);
    }
  };

  const isSelected = (cardType: string) => {
    // Remove spaces and special characters for comparison
    const normalizedSelected = selectedBusinessType?.replace(/\s+/g, '');
    const normalizedCard = cardType.replace(/\s+/g, '');
    return normalizedSelected === normalizedCard;
  };

  const handlePreview = (pdfUrl: string, title: string) => {
    setSelectedPdf(pdfUrl);
    setSelectedTitle(title);
  };

  const handleDownload = (pdfUrl: string, title: string) => {
    // In a real application, this would trigger a download
    console.log(`Downloading ${title} from ${pdfUrl}`);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6">
        <Tabs defaultValue="business" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="business">Business Structure</TabsTrigger>
            <TabsTrigger value="legal">Legal Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business" className="h-[calc(100%-3rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>View and manage your business details</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Business information content */}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ownership Structure</CardTitle>
                  <CardDescription>Manage business ownership and roles</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Ownership structure content */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="legal" className="h-[calc(100%-3rem)]">
            <div className="flex h-full gap-6">
              <div className="w-1/4">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {legalCategories.map((category) => (
                      <div
                        key={category.id}
                        className={cn(
                          "p-4 rounded-lg cursor-pointer transition-colors",
                          selectedCategory === category.id
                            ? category.color
                            : "hover:bg-gray-100"
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className={cn("w-5 h-5", category.iconColor)} />
                          <div>
                            <h3 className="font-medium">{category.title}</h3>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>
                          Last updated: {doc.updatedAt}
                          {doc.signed && " • Signed"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(doc.pdfUrl, doc.title)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(doc.pdfUrl, doc.title)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedPdf && (
        <div className="w-1/2 border-l">
          <PDFPreview
            url={selectedPdf}
            title={selectedTitle}
            onClose={() => setSelectedPdf(null)}
          />
        </div>
      )}
    </div>
  );
}
