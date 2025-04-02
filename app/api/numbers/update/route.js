import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin"; // Exemplo com Firebase

export async function POST(request) {
  try {
    const { numbers, paymentStatus } = await request.json();

    const batch = db.batch();
    numbers.forEach((numId) => {
      const numRef = db.collection("numbers").doc(numId.toString());
      batch.update(numRef, {
        paymentStatus,
        available: paymentStatus !== "paid",
      });
    });

    await batch.commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha na atualização" },
      { status: 500 }
    );
  }
}
