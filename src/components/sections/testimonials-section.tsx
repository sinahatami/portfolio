"use client";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import {
  Quote,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "@/data/testimonial-interface";

// Component for individual testimonial
const TestimonialCard = ({
  testimonial,
  isExpanded,
  onToggle,
}: {
  testimonial: Testimonial;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const MAX_CHARS = 100;
  const shouldTruncate = testimonial.quote.length > MAX_CHARS;

  const displayQuote = isExpanded
    ? testimonial.quote
    : shouldTruncate
      ? `${testimonial.quote.slice(0, MAX_CHARS)}...`
      : testimonial.quote;

  return (
    <SpotlightCard className="flex h-full flex-col justify-between p-0">
      <CardHeader className="flex flex-row items-start justify-between px-6 pt-6 pb-0">
        <Quote className="text-accent/20 h-8 w-8 rotate-180" />
        {testimonial.fileUrl && (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-accent -mt-2 -mr-2 h-8 w-8"
            title="View Recommendation Letter"
            asChild
          >
            <a
              href={testimonial.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={16} />
            </a>
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-6 px-6 pt-4 pb-6">
        <div>
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            &quot;{displayQuote}&quot;
          </p>

          {shouldTruncate && (
            <button
              onClick={onToggle}
              className="text-accent mt-2 flex items-center gap-1 text-xs font-semibold hover:underline"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Bottom Section with specific border color to match skill badges */}
        <div className="border-border/50 group-hover:border-accent/30 mt-auto flex items-center gap-3 border-t pt-4 transition-colors">
          <div>
            <div className="text-sm leading-tight font-semibold">
              {testimonial.personalWebsite ? (
                <a
                  href={testimonial.personalWebsite}
                  target="_blank"
                  className="hover:text-accent inline-flex items-center gap-1 transition-colors"
                >
                  {testimonial.name}
                  <ExternalLink size={10} className="opacity-50" />
                </a>
              ) : (
                testimonial.name
              )}
            </div>

            <div className="text-muted-foreground text-xs">
              {testimonial.role} @{" "}
              {testimonial.companyWebsite ? (
                <a
                  href={testimonial.companyWebsite}
                  target="_blank"
                  className="hover:text-accent transition-colors hover:underline"
                >
                  {testimonial.company}
                </a>
              ) : (
                testimonial.company
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </SpotlightCard>
  );
};

// Main component
export const TestimonialsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="testimonials"
      className="container mx-auto max-w-5xl px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Endorsements <span className="bg-border h-px flex-1"></span>
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESUME_DATA.testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </section>
  );
};
