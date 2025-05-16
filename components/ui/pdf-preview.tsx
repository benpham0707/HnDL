"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

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
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            It appears your browser does not support PDFs.{" "}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Download the PDF
            </a>
            .
          </p>
        </object>
      </DialogContent>
    </Dialog>
  );
} 