"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BilhetesPage() {
  const searchParams = useSearchParams();
  const [purchasedNumbers, setPurchasedNumbers] = useState([]);
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    // Buscar números comprados pelo usuário
    const fetchPurchasedNumbers = async () => {
      const response = await fetch("/api/numbers");
      const allNumbers = await response.json();
      const userNumbers = allNumbers.filter(
        (num) => num.paymentStatus === "paid" && num.owner === "current-user-id"
      );
      setPurchasedNumbers(userNumbers);
    };
    fetchPurchasedNumbers();
  }, []);

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Meus Bilhetes</h1>

      {paymentSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg mb-6">
          Pagamento confirmado! Seus números estão reservados.
        </div>
      )}

      {purchasedNumbers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {purchasedNumbers.map((num) => (
            <div
              key={num.id}
              className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold">{num.id}</div>
              <div className="text-sm text-purple-300">Pago</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 rounded-xl p-8 text-center">
          <p className="text-white/70">Você ainda não possui bilhetes</p>
          <a
            href="/dashboard/selecao"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300"
          >
            Escolher números agora
          </a>
        </div>
      )}
    </>
  );
}
