import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cep = searchParams.get("cep");

    if (!cep || !/^\d{8}$/.test(cep)) {
      return NextResponse.json(
        { error: "CEP inválido. Envie um CEP com 8 dígitos." },
        { status: 400 }
      );
    }

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do CEP.");
    }

    const data = await response.json();

    if (data.erro) {
      return NextResponse.json(
        { error: "CEP não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao processar a solicitação." },
      { status: 500 }
    );
  }
}
