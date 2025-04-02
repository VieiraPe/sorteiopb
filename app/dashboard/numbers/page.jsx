import NumberGrid from "../../../components/dashboard/NumberGrid";
import CartSummary from "../../../components/dashboard/CartSummary";

export default function NumbersPage() {
  // ... mesma implementação anterior
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Escolha seus números
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NumberGrid
            numbers={currentNumbers}
            selectedNumbers={selectedNumbers}
            onSelectNumber={handleSelectNumber}
          />
        </div>

        <div className="lg:col-span-1">
          <CartSummary
            selectedNumbers={selectedNumbers}
            pricePerNumber={50}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
