"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NUMBERS_DATA } from "../../../lib/constants";

export default function PagamentoPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("pix");

  useEffect(() => {
    // Recuperar do localStorage ou contexto
    const savedCart = JSON.parse(localStorage.getItem("rifa-cart")) || [];
    setCart(savedCart);
  }, []);

  const handlePayment = async () => {
    try {
      // Simular chamada à API
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numbers: cart.map((item) => item.id),
          paymentMethod,
        }),
      });

      if (response.ok) {
        // Atualizar status dos números
        const updatedNumbers = NUMBERS_DATA.map((num) =>
          cart.some((item) => item.id === num.id)
            ? { ...num, paymentStatus: "paid", available: false }
            : num
        );

        // Salvar no "banco de dados" (na prática, seria sua API)
        localStorage.setItem("rifa-numbers", JSON.stringify(updatedNumbers));

        // Limpar carrinho
        localStorage.removeItem("rifa-cart");

        router.push("/dashboard/bilhetes?payment=success");
      }
    } catch (error) {
      console.error("Erro no pagamento:", error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = paymentMethod === "pix" ? total * 0.01 : 0;
  const finalTotal = total - discount;

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Forma de pagamento */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
            <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
            {/* Opções de pagamento... */}
          </div>

          {/* Números selecionados */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-4">Seus Números</h2>
            <div className="grid grid-cols-4 gap-2">
              {cart.map((num) => (
                <div
                  key={num.id}
                  className="bg-purple-600/80 text-white text-center py-1 px-2 rounded"
                >
                  {num.id}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Resumo</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>{cart.length} números</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>

              {paymentMethod === "pix" && (
                <div className="flex justify-between">
                  <span>Desconto PIX (1%)</span>
                  <span className="text-green-400">
                    -R$ {discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="border-t border-white/20 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all"
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
