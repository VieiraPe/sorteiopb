// src/lib/pagamento.js
export const gerarCobrancaPix = async (valor) => {
  const resposta = await fetch("/api/gerar-pix", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ valor }),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao gerar PIX");
  }

  return resposta.json();
};
