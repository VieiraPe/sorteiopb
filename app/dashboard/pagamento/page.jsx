"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PagamentoPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isClient, setIsClient] = useState(false);

  // 1. Garantir que estamos no client-side
  useEffect(() => {
    setIsClient(true);
    syncCart();

    // 2. Listener para mudanças no mesmo navegador
    const handleCartChange = () => syncCart();
    window.addEventListener("rifa-cart-updated", handleCartChange);

    // 3. Listener para mudanças em outras abas
    const handleStorageChange = (e) => {
      if (e.key === "rifa-cart") syncCart();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("rifa-cart-updated", handleCartChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 4. Função de sincronização robusta
  const syncCart = () => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = JSON.parse(localStorage.getItem("rifa-cart")) || [];
        setCart(savedCart);
      } catch (error) {
        console.error("Erro ao ler carrinho:", error);
        setCart([]);
      }
    }
  };

  // 5. Atualizar totais de forma segura
  const getTotals = () => {
    const total = cart.reduce(
      (sum, item) => sum + (Number(item?.price) || 0),
      0
    );
    const discount = paymentMethod === "pix" ? total * 0.01 : 0;
    return {
      total,
      discount,
      finalTotal: total - discount,
    };
  };

  const { total, discount, finalTotal } = getTotals();

  // 6. Função de pagamento com sincronização
  const handlePayment = async () => {
    if (!cart.length) return;

    try {
      // Simular API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar estado global
      const updatedNumbers = JSON.parse(
        localStorage.getItem("rifa-numbers") || "[]"
      );
      const newNumbers = updatedNumbers.map((num) =>
        cart.some((item) => item.id === num.id)
          ? { ...num, status: "pago" }
          : num
      );

      localStorage.setItem("rifa-numbers", JSON.stringify(newNumbers));
      localStorage.removeItem("rifa-cart");

      // Disparar eventos de atualização
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("rifa-cart-updated"));

      router.push("/dashboard/bilhetes?success=true");
    } catch (error) {
      console.error("Pagamento falhou:", error);
    }
  };

  // 7. Renderização condicional segura
  if (!isClient) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Nenhum número selecionado</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Voltar para seleção
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {/* Seção de números selecionados */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Seus Números</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {cart.map((num) => (
                  <div
                    key={num.id}
                    className="bg-purple-600 text-center py-2 rounded"
                  >
                    <p className="font-bold">{num.id}</p>
                    <p className="text-sm">R$ {num.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Resumo do pedido */}
            <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumo</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>
                    {cart.length} número{cart.length !== 1 ? "s" : ""}
                  </span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                {paymentMethod === "pix" && (
                  <div className="flex justify-between">
                    <span>Desconto PIX</span>
                    <span className="text-green-400">
                      -R$ {discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition"
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
