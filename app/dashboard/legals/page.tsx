"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Building, Heart, Receipt, FileText, Wrench, Lightbulb, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDFPreview } from "@/components/ui/pdf-preview";
import { useState } from "react";

// Organize documents by category with varying numbers
const documents = {
  licenses: [
    {
      id: 1,
      title: "Business License",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-15",
      category: "licenses",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 2,
      title: "Operating Permit",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-14",
      category: "licenses",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 3,
      title: "Food Service License",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-13",
      category: "licenses",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  insurance: [
    {
      id: 4,
      title: "Liability Insurance",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-12",
      category: "insurance",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  health: [
    {
      id: 5,
      title: "Safety Protocol",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-11",
      category: "health",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 6,
      title: "Emergency Procedures",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-10",
      category: "health",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 7,
      title: "First Aid Guidelines",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-09",
      category: "health",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 8,
      title: "Workplace Safety Manual",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-08",
      category: "health",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  tax: [
    {
      id: 9,
      title: "Tax Registration Form",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-07",
      category: "tax",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 10,
      title: "Tax Compliance Guide",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-06",
      category: "tax",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  contracts: [
    {
      id: 11,
      title: "Client Agreement Template",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-05",
      category: "contracts",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 12,
      title: "Service Contract",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-04",
      category: "contracts",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 13,
      title: "Non-Disclosure Agreement",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-03",
      category: "contracts",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 14,
      title: "Employment Contract",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-02",
      category: "contracts",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 15,
      title: "Vendor Agreement",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-03-01",
      category: "contracts",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  equipment: [
    {
      id: 16,
      title: "Equipment Guidelines",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-02-29",
      category: "equipment",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
  intellectual: [
    {
      id: 17,
      title: "IP Protection Guide",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-02-28",
      category: "intellectual",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 18,
      title: "Trademark Registration",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-02-27",
      category: "intellectual",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
    {
      id: 19,
      title: "Copyright Guidelines",
      type: "PDF",
      pdfUrl: "/legal/license.pdf",
      updatedAt: "2024-02-26",
      category: "intellectual",
      signed: Math.random() < 0.5  // Randomly assign signed status
    },
  ],
};

const legalCategories = [
  {
    icon: Building,
    title: "Licenses and Permits",
    description: "Required permits to operate legally",
    id: "licenses",
    color: "bg-wood hover:bg-wood/90 border-wood",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: Shield,
    title: "Insurance Requirements",
    description: "Coverage types to protect your business",
    id: "insurance",
    color: "bg-sage hover:bg-sage/90 border-sage",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: Heart,
    title: "Health and Safety Regulations",
    description: "Rules for maintaining a safe workplace",
    id: "health",
    color: "bg-tan hover:bg-tan/90 border-tan",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: Receipt,
    title: "Tax Requirements",
    description: "Tax documents and filing obligations",
    id: "tax",
    color: "bg-wood hover:bg-wood/90 border-wood",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: FileText,
    title: "Contracts and Client Agreements",
    description: "Templates for client documentation",
    id: "contracts",
    color: "bg-sage hover:bg-sage/90 border-sage",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: Wrench,
    title: "Equipment and Material Regulations",
    description: "Guidelines for tools and materials",
    id: "equipment",
    color: "bg-tan hover:bg-tan/90 border-tan",
    iconColor: "text-[hsl(var(--primary))]"
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property",
    description: "Protect your designs and branding",
    id: "intellectual",
    color: "bg-wood hover:bg-wood/90 border-wood",
    iconColor: "text-[hsl(var(--primary))]"
  }
];

export default function LegalsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("licenses");

  const handlePreview = (pdfUrl: string, title: string) => {
    setSelectedPdf(pdfUrl);
    setSelectedTitle(title);
  };

  const handleDownload = (pdfUrl: string, title: string) => {
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get current documents based on selected category
  const currentDocuments = documents[selectedCategory as keyof typeof documents] || [];

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))]">
      {/* Left side: Scrollable list */}
      <div className="w-[400px] border-r">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {legalCategories.map((category) => (
              <Card 
                key={category.id} 
                className={`cursor-pointer transition-colors border ${
                  selectedCategory === category.id 
                    ? category.color
                    : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                    <CardTitle className={`text-lg ${
                      selectedCategory === category.id ? category.iconColor : ''
                    }`}>
                      {category.title}
                    </CardTitle>
                  </div>
                  <CardDescription className={
                    selectedCategory === category.id 
                      ? 'text-foreground/60'
                      : ''
                  }>
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right side: Document visualizer */}
      <div className="flex-1 p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            {legalCategories.find(cat => cat.id === selectedCategory)?.title || "Legal Documents"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Preview and download legal document templates</p>
        </div>

        {/* Document grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {currentDocuments.map((doc) => (
            <Card key={doc.id} className={`overflow-hidden bg-tan border-tan hover:bg-tan/90`}>
              <div className="aspect-[3/4] relative bg-background">
                {/* PDF preview thumbnail */}
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => handlePreview(doc.pdfUrl, doc.title)}
                >
                  <embed
                    src={`${doc.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH`}
                    type="application/pdf"
                    className="w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.innerHTML = `<div class="flex items-center justify-center w-full h-full">
                        <FileText className="h-12 w-12 text-muted-foreground/40" />
                      </div>`;
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                  <div className="absolute inset-0 hover:bg-black/5 transition-colors" />
                </div>
              </div>
              <CardHeader className="p-2 bg-tan">
                <CardTitle className="text-xs font-medium">{doc.title}</CardTitle>
                <CardDescription className="text-[10px]">
                  Updated {doc.updatedAt}
                </CardDescription>
                <div className="flex gap-1 mt-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-7 text-xs bg-background hover:bg-background/90"
                    onClick={() => handlePreview(doc.pdfUrl, doc.title)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-7 text-xs bg-background hover:bg-background/90"
                    onClick={() => handleDownload(doc.pdfUrl, doc.title)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
                <div className={`text-xs mt-2 p-1 text-center rounded-sm ${
                  doc.signed ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  {doc.signed ? 'Signed' : 'Not Signed'}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* PDF Preview Dialog */}
        {selectedPdf && (
          <PDFPreview 
            isOpen={true}
            onClose={() => setSelectedPdf(null)}
            pdfUrl={selectedPdf}
            title={selectedTitle}
          />
        )}
      </div>
    </div>
  );
} 