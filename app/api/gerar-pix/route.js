// src/app/api/gerar-pix/route.js
import axios from "axios";

export async function POST(request) {
  const { valor } = await request.json();

  try {
    // Substitua pela URL da API do seu gateway de pagamento
    const resposta = await axios.post("https://api.gerenciarpix.com.br/cobrancas", {
      valor,
      chavePix: "SUA_CHAVE_PIX", // Chave PIX do recebedor
      descricao: "Pagamento para sorteio",
    });

    return new Response(JSON.stringify({
      qrCode: resposta.data.qrCode,
      codigoPix: resposta.data.codigoPix,
    }), { status: 200 });
  } catch (erro) {
    return new Response(JSON.stringify({ erro: "Erro ao gerar PIX" }), {
      status: 500,
    });
  }
}