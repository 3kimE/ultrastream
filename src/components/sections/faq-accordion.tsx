"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, FAQ_CATEGORIES, type FAQCategory } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  category?: FAQCategory;
  limit?: number;
  showSearch?: boolean;
  showCategories?: boolean;
}

export function FAQAccordion({
  category,
  limit,
  showSearch = false,
  showCategories = false,
}: FAQAccordionProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");

  let faqs = FAQS;
  if (category) faqs = faqs.filter((f) => f.category === category);
  if (activeCategory !== "all") faqs = faqs.filter((f) => f.category === activeCategory);
  if (search) {
    const q = search.toLowerCase();
    faqs = faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }
  if (limit) faqs = faqs.slice(0, limit);

  return (
    <div>
      {showSearch && (
        <input
          type="search"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 text-sm"
        />
      )}

      {showCategories && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
              activeCategory === "all"
                ? "gradient-brand border-transparent text-white"
                : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            All
          </button>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                activeCategory === cat
                  ? "gradient-brand border-transparent text-white"
                  : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <Accordion multiple={false} className="space-y-3">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="glass-card border border-white/10 rounded-xl px-5 hover:border-blue-500/20 transition-colors not-last:border-b-0"
          >
            <AccordionTrigger className="text-sm font-medium text-white hover:text-blue-400 text-left py-4 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-zinc-400 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {faqs.length === 0 && (
        <div className="text-center py-10 text-zinc-500 text-sm">
          No FAQs found matching your search.
        </div>
      )}
    </div>
  );
}
