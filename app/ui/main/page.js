"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "../../../lib/firebase";

export default function Main() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleParticipar = () => {
    router.push(user ? "/dashboard" : "/login");
  };

  return (
    <main className="relative overflow-hidden">
      {/* Efeitos de fundo modernos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-purple-900 opacity-95"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 min-h-[80vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Conteúdo de texto */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-blue-300 text-sm font-medium">
                Sorteio Ativo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ganhe um{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
                iPhone 16
              </span>
              <br />
              com apenas um clique
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
              Participe do maior sorteio do ano e tenha a chance de levar para
              casa o smartphone mais desejado do mercado!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleParticipar}
                className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10">Participar Agora</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <button className="px-8 py-4 border border-blue-400/30 bg-blue-900/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-blue-900/30 transition-all duration-300">
                Ver Regras
              </button>
            </div>

            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span className="text-gray-300 text-sm">Entrega garantida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span className="text-gray-300 text-sm">100% seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span className="text-gray-300 text-sm">Suporte 24h</span>
              </div>
            </div>
          </div>

          {/* Container da imagem - Tamanho reduzido pela metade */}
          <div className="relative w-full max-w-md mx-auto aspect-square lg:aspect-[9/16] scale-75 lg:scale-90 origin-center">
            <Image
              src="/iphone-16.png"
              fill
              alt="iPhone 16 Pro"
              className="object-contain object-bottom drop-shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 30vw"
              priority
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      className="w-5 h-5 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
}
