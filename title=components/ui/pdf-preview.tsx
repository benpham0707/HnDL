"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export function PDFPreview({ isOpen, onClose, pdfUrl, title = "Document Preview" }: PDFPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh]">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
} 