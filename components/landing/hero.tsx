import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero1 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              For Tradespeople
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Focus on Your Trade, We'll HnDL the Rest
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              HnDL manages your entire business backend - from website development and invoicing to business setup and legal registration. Let us handle the paperwork while you focus on what you do best.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto" asChild>
                <a href="/auth">Get Started</a>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src="/logo.png"
            alt="HnDL Business Management"
            className="max-h-[32rem] w-full rounded-md object-contain bg-background/50 p-16 rotate-45 transform transition-transform duration-500 hover:rotate-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero1;
