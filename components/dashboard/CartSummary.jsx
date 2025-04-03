const CartSummary = ({ selectedNumbers, onCheckout }) => {
  const totalPrice =
    selectedNumbers?.reduce((sum, num) => {
      const price = Number(num?.price) || 0;
      return sum + price;
    }, 0) || 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
      <h2 className="text-xl font-bold text-white mb-4">Resumo do Carrinho</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-300">
          <span>Itens selecionados:</span>
          <span>{selectedNumbers?.length || 0}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Total:</span>
          <span className="text-green-500 font-bold">
            R$ {totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
          disabled={!selectedNumbers?.length}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
