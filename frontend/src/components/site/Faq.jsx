import { Reveal } from "./Reveal";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        q: "How long does a new website take?",
        a: "Most small business websites are ready in 3 to 6 weeks. If you need something faster, tell us — we will always give you an honest timeline before we start.",
    },
    {
        q: "How much does it cost?",
        a: "It depends on what you need. A simple, professional website costs less than most people expect. We give you a clear fixed quote up front — no hidden fees, ever.",
    },
    {
        q: "I'm not good with technology. Is that a problem?",
        a: "Not at all. Most of our clients are busy tradies and brokers, not tech people. We explain everything in plain English and handle all the technical work for you.",
    },
    {
        q: "Will my website show up on Google?",
        a: "Yes. Every site we build is set up for Google from day one. With our SEO service, we work month by month to move you higher for the searches your customers actually type.",
    },
    {
        q: "Can you help if I already have a website?",
        a: "Absolutely. We can rebuild it, improve it, or just add the missing pieces — like SEO, ads, or automatic lead follow-up. We'll tell you honestly what's worth fixing.",
    },
];

const Faq = () => (
    <section id="faq" data-testid="faq-section" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Reveal className="text-center">
                <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="faq-eyebrow">
                    Common questions
                </p>
                <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="faq-heading">
                    Straight answers, no jargon
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <Accordion type="single" collapsible className="mt-12 space-y-4" data-testid="faq-accordion">
                    {FAQS.map((f, i) => (
                        <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            data-testid={`faq-item-${i}`}
                            className="rounded-2xl border border-white/10 bg-[#161E2E] px-6 transition-colors duration-300 data-[state=open]:border-amber-500/40"
                        >
                            <AccordionTrigger
                                data-testid={`faq-trigger-${i}`}
                                className="py-5 text-left text-base font-semibold text-white hover:text-amber-400 hover:no-underline"
                            >
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent
                                data-testid={`faq-content-${i}`}
                                className="pb-5 text-sm leading-relaxed text-slate-400 sm:text-base"
                            >
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Reveal>
        </div>
    </section>
);

export default Faq;
