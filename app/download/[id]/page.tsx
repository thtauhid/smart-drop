"use client";

import { FileDownload } from "@/components/file-download";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FileArchive } from "lucide-react";
import { useParams } from "next/navigation";

export default function DownloadPage() {
  const params = useParams<{ id: string }>();

  const mockFileData = {
    id: params.id,
    name: "important-document.pdf",
    size: 2.45, // MB
    uploadedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="border-4 border-amber-800 rounded-lg p-6 bg-amber-100 shadow-[8px_8px_0px_0px_rgba(146,64,14,1)]">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-amber-200 p-3 rounded-full mb-4">
                <FileArchive className="h-10 w-10 text-amber-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-center font-serif text-amber-900">
                Smart Drop
              </h1>
              <p className="text-center mt-2">
                Someone has shared a file with you!
              </p>
            </div>

            <FileDownload fileData={mockFileData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
