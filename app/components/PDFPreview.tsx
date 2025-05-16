import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PDFPreviewProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function PDFPreview({ url, title, onClose }: PDFPreviewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 p-4">
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&view=FitH`}
          className="w-full h-full"
          title={title}
        />
      </div>
    </div>
  );
} 