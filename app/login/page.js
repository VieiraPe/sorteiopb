"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { FaGoogle, FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerData.name.trim()) errors.name = "Nome completo é obrigatório";
    if (!cpfRegex.test(registerData.cpf))
      errors.cpf = "CPF inválido (formato: 000.000.000-00)";
    if (!emailRegex.test(registerData.email)) errors.email = "Email inválido";
    if (!phoneRegex.test(registerData.phone))
      errors.phone = "Telefone inválido (formato: (00) 00000-0000)";
    if (registerData.password.length < 6)
      errors.password = "Senha deve ter pelo menos 6 caracteres";

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Formatação de campos
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      setShowRegisterModal(false);
      router.push("/dashboard");
    } catch (err) {
      setError(`Erro ao criar conta: ${err.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      setError("Erro ao fazer login com Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-black">
      {/* Modal de Cadastro */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Criar Conta
              </h2>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Campos do formulário de cadastro */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      registerErrors.name
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                  />
                  {registerErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      registerErrors.cpf
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                    value={registerData.cpf}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        cpf: formatCPF(e.target.value),
                      })
                    }
                    maxLength="14"
                  />
                  {registerErrors.cpf && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.cpf}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      registerErrors.email
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                  />
                  {registerErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    placeholder="(00) 00000-0000"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      registerErrors.phone
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        phone: formatPhone(e.target.value),
                      })
                    }
                    maxLength="15"
                  />
                  {registerErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        registerErrors.password
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-blue-300"
                      }`}
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3.5 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-4 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    Criar Conta
                  </button>
                  <button
                    type="button"
                    className="w-full text-gray-600 hover:text-gray-800"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    Voltar para Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de Login */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h1>
          <p className="text-gray-600">Faça login para acessar sua conta</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
            <FaInfoCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md font-medium"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            <FaGoogle className="text-red-500" />
            Entrar com Google
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
