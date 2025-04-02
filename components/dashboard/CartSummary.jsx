"use client";
import { useRouter } from "next/navigation";

const CartSummary = ({ selectedNumbers, onCheckout }) => {
  const totalPrice = selectedNumbers?.reduce((sum, num) => 
    sum + (Number(num?.price) || 0, 0) || 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
      <h2 className="text-xl font-bold mb-4">Resumo do Carrinho</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Números selecionados:</span>
          <span>{selectedNumbers?.length || 0}</span>
        </div>
        
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>
            {typeof totalPrice === 'number' ? totalPrice.toFixed(2) : "0.00"} R$
          </span>
        </div>
        
        <button
          onClick={onCheckout}
          disabled={!selectedNumbers?.length}
          className={`w-full py-2 rounded-md font-medium ${
            selectedNumbers?.length
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartSummary; // Esta linha é ESSENCIAL


git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
