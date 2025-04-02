import Link from "next/link";
import { FaTicketAlt, FaShoppingCart, FaUser } from "react-icons/fa";

export default function DashboardNavbar() {
  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/dashboard"
            className="flex items-center text-xl font-bold"
          >
            <span className="text-white">
              Rifa<span className="text-purple-400">Premiada</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard/selecao"
              className="text-white hover:text-purple-300 flex items-center"
            >
              <FaTicketAlt className="mr-2" />
              <span className="hidden md:inline">Escolher Números</span>
            </Link>

            <Link
              href="/dashboard/bilhetes"
              className="text-white hover:text-purple-300 flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              <span className="hidden md:inline">Meus Bilhetes</span>
            </Link>

            <Link
              href="/dashboard"
              className="text-white hover:text-purple-300 flex items-center"
            >
              <FaUser className="mr-2" />
              <span className="hidden md:inline">Minha Conta</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
