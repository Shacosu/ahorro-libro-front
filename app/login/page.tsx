"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/library',
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-200 relative">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-14 z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#004e59]">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#004e59]">Email</label>
            <input
              type="email"
              placeholder="cuenta@ahorrolibro.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-[#004e59] rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#004e59]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#004e59]">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#004e59] rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#004e59]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#004e59] text-white p-2 rounded mt-2 hover:bg-[#003940] transition-colors duration-500"
          >
            Iniciar sesión
          </button>
          <div className="flex justify-center items-center mt-4">
            <Link href="/register" className="text-[#004e59]">¿No tienes una cuenta? Registrate</Link>
          </div>
        </form>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full pointer-events-none">
        <path fill="#004e59" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default LoginPage;