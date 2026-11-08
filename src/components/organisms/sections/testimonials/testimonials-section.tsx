"use client";

import { RESUME_DATA } from "@/data/resume-data";
import { useState } from "react";
import { TestimonialCard } from "./testimonial-card";

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

      {/* items-start is critical here to keep other cards from jumping */}
      <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
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
