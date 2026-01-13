import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function ContactUs() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-[#714955] p-6 md:p-12 rounded-2xl">
        <div className="text-secondary">
          <h2 className="text-2xl font-medium">Have a Question?</h2>
          <p className="text-sm md:text-base mt-1">
            Feel free to reach out to us with any inquiries or requests.
          </p>
        </div>
        <div>
          <a
            href="mailto:contact@aurabath.com"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-medium")}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
