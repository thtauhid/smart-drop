export function Footer() {
  return (
    <footer className="border-t-4 border-amber-800 bg-amber-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-amber-700">
            © {new Date().getFullYear()} Smart Drop. All files are automatically
            deleted after 24 hours.
          </p>
          {/* <div className="flex justify-center gap-4 text-sm">
            <a href="#" className="text-amber-800 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-amber-800 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-amber-800 hover:underline">
              Contact
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
