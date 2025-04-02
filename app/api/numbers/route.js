import { NUMBERS_DATA } from "../../../lib/constants";

// No endpoint /api/numbers
export async function GET() {
  try {
    const savedNumbers = JSON.parse(localStorage.getItem("NUMBERS_DB"));
    return Response.json(savedNumbers || NUMBERS_DATA);
  } catch (error) {
    return Response.json(NUMBERS_DATA);
  }
}

export async function POST(request) {
  const { numbers, paymentStatus } = await request.json();

  // Atualizar status no "banco de dados"
  const updatedNumbers = NUMBERS_DATA.map((num) =>
    numbers.includes(num.id)
      ? { ...num, paymentStatus, available: paymentStatus !== "paid" }
      : num
  );

  process.env.NUMBERS_DB = JSON.stringify(updatedNumbers);

  return Response.json({ success: true });
}
