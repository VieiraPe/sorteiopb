"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" text-white py-4 px-6 flex justify-between items-center shadow-lg rounded-b-lg">
      <h1 className="text-2xl font-bold">Sorteio iPhone 16</h1>
      <nav className="hidden md:flex items-center">
        <a href="#" className="mx-4 relative group smooth">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
        </a>
        <a href="#detalhes" className="mx-4 relative group smooth">
          Detalhes
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
        </a>
        <Link href="/dashboard/participar" className="mx-4 relative group">
          Participar
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
        </Link>
      </nav>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors"
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-6 bg-blue-700 rounded-lg shadow-lg p-4 w-48">
          <a
            href="/page.js"
            className="block mb-3 text-lg py-2 px-4 hover:bg-blue-600 rounded transition-colors"
          >
            Home
          </a>
          <a
            href="#detalhes"
            className="block mb-3 text-lg py-2 px-4 hover:bg-blue-600 rounded transition-colors"
          >
            Detalhes
          </a>
          <Link
            href="/dashboard/participar"
            className="block text-lg py-2 px-4 hover:bg-blue-600 rounded transition-colors"
          >
            Participar
          </Link>
        </div>
      )}
    </header>
  );
}
