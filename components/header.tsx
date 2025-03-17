import { FileArchive } from "lucide-react";
import Link from "next/link";

export function Header() {
  const links = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ];
  return (
    <header className="border-b-4 border-amber-800 bg-amber-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FileArchive className="h-6 w-6 text-amber-700" />
          <span className="font-bold text-xl font-serif">Smart Drop</span>
        </Link>

        <nav>
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-amber-800 hover:underline font-medium"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
