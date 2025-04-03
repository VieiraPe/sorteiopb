import Navbar from "./ui/navbar/page.jsx";
import Main from "../app/ui/main/page.js";
import SectionDetalhes from "./ui/section-detalhes/page.js";
require("dotenv").config();

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-700">
      <header className="">
        <Navbar />
      </header>

      {/* Seção Principal */}
      <main className="min-h-[50vh]">
        {" "}
        {/* Alterado de h-screen para min-h-[50vh] */}
        <Main />
      </main>

      {/* Detalhes da Rifa */}
      <div className="min-h-[50vh] w-full">
        {" "}
        {/* Alterado de h-screen w-screen */}
        <SectionDetalhes />
      </div>

      {/* Rodapé */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; 2025 Sorteio iPhone 16. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
