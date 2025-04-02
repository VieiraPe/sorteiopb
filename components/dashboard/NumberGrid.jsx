export default function NumberGrid({
  numbers,
  selectedNumbers,
  onSelectNumber,
}) {
  const getNumberState = (number) => {
    if (number.paymentStatus === "paid") return "paid";
    if (!number.available) return "unavailable";
    return selectedNumbers.some((n) => n.id === number.id)
      ? "selected"
      : "available";
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {numbers.map((number) => {
        const state = getNumberState(number);
        const baseClasses =
          "h-12 flex items-center justify-center rounded-lg transition-all";

        const stateClasses = {
          paid: "bg-gray-700 text-gray-500 cursor-not-allowed",
          unavailable: "bg-gray-700/30 text-gray-500 cursor-not-allowed",
          selected: "bg-purple-600 text-white",
          available: "bg-blue-600/30 hover:bg-blue-600/50 text-white",
        };

        return (
          <button
            key={number.id}
            onClick={() => onSelectNumber(number)}
            disabled={state === "paid" || state === "unavailable"}
            className={`${baseClasses} ${stateClasses[state]}`}
            title={state === "paid" ? "Número já comprado" : ""}
          >
            {number.id}
          </button>
        );
      })}
    </div>
  );
}
