import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="border-4 border-amber-800 rounded-lg p-6 bg-amber-100 shadow-[8px_8px_0px_0px_rgba(146,64,14,1)]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-serif text-amber-900">
              Contact
            </h1>
            <p className="text-justify mb-8 text-lg">
              Shoot your query here: {"heytauhid@outlook.com"}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
