import { FaqContent } from "@/components/faq-content";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HelpCircle } from "lucide-react";

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-amber-200 p-3 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-amber-700" />
            </div>
            <h1 className="text-4xl font-bold font-serif text-amber-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Everything you need to know about Smart Drop, the simplest way to
              share files securely.
            </p>
          </div>

          <div className="border-4 border-amber-800 rounded-lg p-6 bg-amber-100 shadow-[8px_8px_0px_0px_rgba(146,64,14,1)]">
            <FaqContent />
          </div>

          <div className="mt-10 text-center">
            <p className="text-amber-800 mb-4">
              Still have questions? Shoot me an email at
              {" heytauhid@outlook.com"}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
