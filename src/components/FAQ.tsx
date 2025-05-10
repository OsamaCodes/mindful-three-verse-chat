
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Is MindfulAI a replacement for therapy?",
      answer: "No, MindfulAI is designed to be a supplementary resource and not a replacement for traditional mental health therapy. We encourage users to continue working with licensed mental health professionals and to use our chatbot as additional support between sessions or for immediate coping strategies.",
    },
    {
      question: "How does MindfulAI protect my privacy?",
      answer: "We take privacy very seriously. All conversations are encrypted end-to-end, and we do not share your personal information with third parties. Your data is used only to improve your experience and provide better support. You can delete your conversation history at any time.",
    },
    {
      question: "What kind of mental health issues can MindfulAI help with?",
      answer: "MindfulAI can provide support for common concerns like anxiety, stress, mild depression, sleep issues, and mindfulness practices. However, it is not designed to handle crisis situations or severe mental health conditions that require immediate professional intervention.",
    },
    {
      question: "Is the chatbot available 24/7?",
      answer: "Yes, MindfulAI is available 24/7, providing support whenever you need it. This makes it a valuable resource during times when immediate human support might not be available.",
    },
    {
      question: "What training data is used for MindfulAI?",
      answer: "MindfulAI is trained on specialized mental health literature, evidence-based therapeutic approaches like CBT and DBT, and under the supervision of mental health professionals. We continuously update our training with the latest research while ensuring all data is anonymized and ethical.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-mindful-100">
            <AccordionTrigger className="text-left font-medium text-mindful-800 hover:text-soothing-600 py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-mindful-600 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
