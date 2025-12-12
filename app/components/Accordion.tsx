"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: JSX.Element;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <div
            key={index}
            className="backdrop-blur-md bg-white/40 border border-white/50 shadow-md rounded-xl transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className="text-xl font-semibold">{item.title}</span>
              <ChevronDown
                size={22}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-screen p-4 pt-0" : "max-h-0"
              }`}
            >
              <div className="text-lg leading-relaxed">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
