"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState } from "react";

const faqData = {
  general: [
    {
      question: "What is Smart Drop?",
      answer:
        "Smart Drop is a simple file sharing service that lets you upload files and share them via a unique link that automatically expires after 24 hours. No registration required!",
    },
    {
      question: "How much does Smart Drop cost?",
      answer:
        "Smart Drop is completely free for basic usage. Custom deployments with additional features are available for a fee.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No! Smart Drop is designed to be as simple as possible. You can upload and share files without creating an account or providing any personal information.",
    },
    {
      question: "How long do my files stay available?",
      answer:
        "All files are automatically deleted after 24 hours from the time of upload. This helps ensure security and privacy while keeping the service fast and reliable.",
    },
  ],
  files: [
    {
      question: "What is the maximum file size I can upload?",
      answer:
        "The free version of Smart Drop allows you to upload files up to 100MB in size. Custom deployments support single file size up to 5TB.",
    },
    {
      question: "What file types are supported?",
      answer:
        "Smart Drop supports all file types including documents, images, videos, audio files, archives, and more. But we do not support executable files for security reasons.",
    },
    {
      question: "Can I upload multiple files at once?",
      answer:
        "Currently, Smart Drop allows you to upload one file at a time. If you need to share multiple files, we recommend creating a zip or other archive file first.",
    },
    {
      question:
        "What happens if someone tries to access my file after it expires?",
      answer:
        "Once a file expires, anyone attempting to access the link will see an expiration notice. The file itself is permanently deleted from the server.",
    },
  ],
  security: [
    {
      question: "How secure is Smart Drop?",
      answer:
        "Smart Drop uses industry-standard encryption for all file transfers and storage. Files are transmitted over HTTPS and stored encrypted. The unique links are randomly generated and nearly impossible to guess.",
    },
    {
      question: "Can I password protect my files?",
      answer:
        "The free version of Smart Drop does not currently support password protection. If you need this feature, please contact me for a custom deployment.",
    },
    {
      question: "Can I see who downloaded my file?",
      answer:
        "No, Smart Drop does not track or log any information about who downloads files.",
    },
    {
      question: "What about analytics or tracking?",
      answer:
        "Umami is used to track the number of page visits. No personal information is collected or stored. We respect your privacy.",
    },
    {
      question: "How do I believe what you say?",
      answer:
        "Smart Drop is open-source. You can view the source code on GitHub. This means you can verify the security and privacy claims for yourself. Visit: https://github.com/thtauhid/smart-drop",
    },
    {
      question: "How do you handle abuse?",
      answer:
        "Smart Drop has a zero-tolerance policy for abuse. Any files that violate the terms of service will be immediately removed. If you encounter abuse, please report it.",
    },
  ],
  troubleshooting: [
    {
      question: "My upload is failing. What should I do?",
      answer:
        "First, check that your file is under the 100MB size limit. If it is, try a different browser or device. If problems persist, try breaking your file into smaller parts. If you still have issues, please contact me.",
    },
    {
      question:
        "I accidentally closed the page after uploading. Can I recover my link?",
      answer:
        "Unfortunately, if you didn't copy the link and closed the page, there's no way to recover it. This is part of the security model that ensures only you and your recipient have access to the file.",
    },
    {
      question:
        "The download link isn't working for my recipient. What could be wrong?",
      answer:
        "Check if the 24-hour period has expired. Also, make sure you copied the entire link correctly. If the recipient is in a corporate environment, their firewall might be blocking access.",
    },
    {
      question: "Can I extend the expiration time of my link?",
      answer:
        "The 24-hour expiration cannot be extended on the free plan. This is a security feature that ensures files don't remain accessible indefinitely. If you need longer expiration times, please contact me for a custom deployment.",
    },
  ],
};

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  // Filter FAQs based on search query
  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) {
      return faqData[activeTab as keyof typeof faqData];
    }

    const query = searchQuery.toLowerCase();
    const allFaqs = Object.values(faqData).flat();

    return allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search for a question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-amber-400 bg-amber-50 focus-visible:ring-amber-500"
        />
      </div>

      {!searchQuery ? (
        <Tabs
          defaultValue="general"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-amber-200 p-1">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
            >
              Files
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="troubleshooting"
              className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
            >
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          {Object.entries(faqData).map(([category, questions]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <FaqAccordion faqs={questions} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Search Results ({filteredFaqs.length})
          </h3>
          {filteredFaqs.length > 0 ? (
            <FaqAccordion faqs={filteredFaqs} />
          ) : (
            <div className="text-center py-8 bg-amber-50 border-2 border-amber-300 rounded-lg">
              <p className="text-amber-800">
                No questions found matching: {searchQuery}
              </p>
              <p className="text-sm text-amber-700 mt-2">
                Try a different search term or browse the categories
              </p>
            </div>
          )}
        </div>
      )}

      <div className="bg-amber-200 border-2 border-amber-600 rounded-lg p-4 mt-8">
        <h3 className="font-bold mb-2">Looking for something more?</h3>
        <p className="text-sm">
          If you need more features like larger file sizes, longer expiration
          times, and custom branding for your file sharing needs please email me
          at{" "}
          <span className="text-amber-800 underline font-medium">
            heytauhid@outlook.com
          </span>
          .
        </p>
      </div>
    </div>
  );
}

function FaqAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-2 border-amber-400 rounded-lg overflow-hidden bg-amber-50"
        >
          <AccordionTrigger className="px-4 py-3 hover:bg-amber-100 font-medium text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 bg-amber-50 text-amber-800">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
