
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Is this app really free?",
    answer: "Yes! You can chat with the AI and get course recommendations without paying anything.",
  },
  {
    question: "Where do the recommended courses come from?",
    answer: "We link to trusted platforms like YouTube, Khan Academy, and other free educational resources.",
  },
  {
    question: "Is this an actual course platform?",
    answer: "No, we don't host courses. We guide you to the best ones that are already available online.",
  },
  {
    question: "Can I ask about any subject?",
    answer: "Absolutely! You can ask about science, math, writing, tech — anything you're learning.",
  },
  {
    question: "Do I need to create an account?",
    answer: "Yes, creating an account helps us personalize your experience and save your learning history.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-3 rounded-xl bg-[#393e3e]">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4 cursor-pointer"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left cursor-pointer"
          >
            <span className="text-lg font-medium text-white cursor-pointer">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`mt-2 cursor-pointer text-white transition-all duration-200 ease-in-out ${
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <p className="mt-2">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
