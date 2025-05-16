import { Button } from "@/components/ui/button";

const CTA10 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Ready to Focus on Your Craft?
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              Let us handle your business backend while you focus on what you do best. Join hundreds of successful tradespeople who trust HnDL.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline">Schedule a Demo</Button>
            <Button asChild>
              <a href="/auth">Get Started Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA10;
