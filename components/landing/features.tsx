import {
  Globe,
  Receipt,
  FileText,
  Building2,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    title: "Website Development",
    description:
      "Get a professional website tailored to your trade, showcasing your services and making it easy for clients to find you.",
    icon: <Globe className="size-4 md:size-6" />,
  },
  {
    title: "Invoicing & Payments",
    description:
      "Streamlined invoicing system to manage your billing, track payments, and maintain professional relationships with clients.",
    icon: <Receipt className="size-4 md:size-6" />,
  },
  {
    title: "Legal Registration",
    description:
      "We handle all the paperwork for business registration, licenses, and permits specific to your trade.",
    icon: <FileText className="size-4 md:size-6" />,
  },
  {
    title: "Business Structure Setup",
    description:
      "Expert guidance on choosing and setting up the right business structure for your trade business.",
    icon: <Building2 className="size-4 md:size-6" />,
  },
  {
    title: "Compliance Management",
    description:
      "Stay compliant with industry regulations and requirements. We keep track of deadlines and renewals.",
    icon: <Shield className="size-4 md:size-6" />,
  },
  {
    title: "Time-Saving Solutions",
    description:
      "Save hours on administrative tasks with our integrated business management solutions.",
    icon: <Clock className="size-4 md:size-6" />,
  },
];

const Feature17 = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-screen-xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">Services</p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
          Everything You Need to Run Your Trade Business
        </h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature17;