"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NumberGrid from "../../../components/dashboard/NumberGrid";
import CartSummary from "../../../components/dashboard/CartSummary";

export default function SelecaoNumeros() {
  const router = useRouter();
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetch("/api/numbers");
        const data = await response.json();
        setNumbers(data);
      } catch (error) {
        console.error("Erro ao carregar números:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNumbers();
  }, []);

  const handleSelectNumber = (number) => {
    if (!number.available || number.paymentStatus === "paid") return;

    setSelectedNumbers((prev) => {
      const exists = prev.some((selected) => selected.id === number.id);
      return exists
        ? prev.filter((selected) => selected.id !== number.id)
        : [...prev, number];
    });
  };

  const numbersPerPage =
    typeof window !== "undefined" && window.innerWidth < 768 ? 20 : 50;
  const currentNumbers = numbers.slice(
    (page - 1) * numbersPerPage,
    page * numbersPerPage
  );

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Escolha seus números
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NumberGrid
            numbers={currentNumbers}
            selectedNumbers={selectedNumbers}
            onSelectNumber={handleSelectNumber}
            loading={loading}
          />

          {/* Paginação otimizada */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto py-2">
            {Array.from({
              length: Math.ceil(numbers.length / numbersPerPage),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`min-w-10 h-10 rounded-full flex-shrink-0 ${
                  page === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary
            selectedNumbers={selectedNumbers}
            onCheckout={() => router.push("/dashboard/pagamento")}
          />
        </div>
      </div>
    </>
  );
}
