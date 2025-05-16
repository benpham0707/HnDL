import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq1 = () => {
  const faqs = [
    {
      question: "What services does HnDL provide for tradespeople?",
      answer:
        "HnDL provides comprehensive business backend services including website development, invoicing systems, business registration, legal compliance, and ongoing business management support tailored specifically for trades.",
    },
    {
      question: "How long does it take to set up my business with HnDL?",
      answer:
        "The basic setup, including business registration and website development, typically takes 2-3 weeks. We handle all the paperwork and technical details to get you up and running as quickly as possible.",
    },
    {
      question: "Do I need any technical knowledge to use HnDL's services?",
      answer:
        "No technical knowledge is required. We handle all the technical aspects of your business backend, from website management to digital invoicing. Our systems are designed to be user-friendly for tradespeople.",
    },
    {
      question: "Can I customize my services based on my trade's specific needs?",
      answer:
        "Yes, our services are fully customizable to match your specific trade and business needs. We'll work with you to ensure you have the right tools and support for your particular industry.",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
          Frequently asked questions
        </h1>
        {faqs.map((faq, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default Faq1;