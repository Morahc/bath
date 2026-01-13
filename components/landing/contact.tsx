import { cn } from "@/lib/utils";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "../ui/button";
import ContactForm from "./contact-form";

const contactItems = [
  {
    label: "Phone",
    value: "+234 817 4467 822",
    icon: Phone,
  },
  {
    label: "Email",
    value: "contact@aura.com",
    icon: Mail,
  },
  {
    label: "Hours",
    value: ["Mon–Fri: 9am – 6pm", "Sat: 10am – 4pm"],
    icon: Clock,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="grid lg:grid-cols-2">
      <ContactForm />
      <div className="p-4 md:p-12 flex flex-col gap-4 md:gap-6">
        <h4 className="uppercase font-semibold tracking-wide">Visit our showroom</h4>
        <h2 className="text-xl md:text-2xl font-medium tracking-widest">
          1024 Design District Blvd Metropolis, NY 10012
        </h2>
        <div className="space-y-4">
          {contactItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="rounded-md p-2 border bg-white inline-flex">
                <Icon className="size-4" />
              </div>

              <div>
                <h5 className="text-sm font-semibold">{label}</h5>

                <div>
                  {Array.isArray(value) ? (
                    value.map((line) => (
                      <p key={line} className="text-sm text-foreground/60">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/60">{value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl relative h-100 overflow-hidden shadow">
            <iframe
              loading="lazy"
              allowFullScreen
              className="h-full w-full"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.5370573890677!2d-122.41941529999999!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b2555555%3A0x8800cb6c2b10db07!2s123%20Luxury%20Ln%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1234567890"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/123+Luxury+Lane,+Bath+City"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            Get Directions <MapPin />
          </a>
        </div>
      </div>
    </section>
  );
}
