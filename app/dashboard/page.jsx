import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Minha Conta</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
        <Link
          href="/dashboard/selecao"
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg transition-colors"
        >
          Escolher Números
        </Link>
        <Link
          href="/dashboard/bilhetes"
          className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg transition-colors"
        >
          Meus Bilhetes
        </Link>
      </div>
    </div>
  );
}
