import { FileUpload } from "@/components/file-upload"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="border-4 border-amber-800 rounded-lg p-6 bg-amber-100 shadow-[8px_8px_0px_0px_rgba(146,64,14,1)]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-serif text-amber-900">Smart Drop</h1>
            <p className="text-center mb-8 text-lg">
              Drop your file, get a magic link that expires in 24 hours. Simple as that!
            </p>

            <FileUpload />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-amber-700 rounded p-4 bg-amber-50 text-center">
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">📤</span>
                </div>
                <h3 className="font-bold mb-2">Upload</h3>
                <p className="text-sm">Drag & drop your file or click to browse</p>
              </div>

              <div className="border-2 border-amber-700 rounded p-4 bg-amber-50 text-center">
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="font-bold mb-2">Share</h3>
                <p className="text-sm">Get a unique link to share with anyone</p>
              </div>

              <div className="border-2 border-amber-700 rounded p-4 bg-amber-50 text-center">
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="font-bold mb-2">Expires</h3>
                <p className="text-sm">Link automatically expires after 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

