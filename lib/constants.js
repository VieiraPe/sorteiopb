export const NUMBERS_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  available: true, // Inicialmente todos disponíveis
  price: 50.0,
  owner: null, // Será preenchido quando comprado
  paymentStatus: "pending", // 'paid', 'pending', 'failed'
}));

export const CART_ITEMS = [];
