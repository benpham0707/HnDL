  {/* PDF Preview Dialog */}
  {selectedPdf && (
    <PDFPreview 
      isOpen={true}
      onClose={() => setSelectedPdf(null)}
      pdfUrl={selectedPdf}
      title={selectedTitle}
    />
  )} 

  {/* PDF preview thumbnail */}
  <div 
    className="h-32 relative bg-muted cursor-pointer"
    onClick={() => handlePreview(doc.pdfUrl, doc.title)}
  >
    <embed
      src={`${doc.pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
      type="application/pdf"
      className="w-full h-full"
    />
  </div> 