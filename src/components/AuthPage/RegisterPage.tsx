"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { signIn } from "next-auth/react";
import { Beef, ArrowLeft } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nama,
          username,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registrasi Berhasil! Silahkan login");
        signIn();
      } else {
        toast.error(data.error || "Registrasi gagal! Silahkan coba lagi");
      }
    } catch {
      toast.error("Gagal terhubung ke server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden text-neutral-900">
      <div className="max-w-md w-full space-y-8 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-amber-700 transition-colors mb-4 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali ke Beranda
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-neutral-100 transition-all">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 mb-6">
              <Beef className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
              Buat Akun Baru
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Mulai kelola peternakan IoT Anda hari ini
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5 ml-1 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5 ml-1 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5 ml-1 uppercase tracking-wider">
                Alamat Email
              </label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5 ml-1 uppercase tracking-wider">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white shadow-lg shadow-amber-200 transition-all transform active:scale-[0.98] mt-4 ${
                isLoading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              }`}
            >
              {isLoading ? "Mendaftarkan..." : "Buat Akun Peternak"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              Sudah punya akun?{" "}
              <button
                onClick={() => signIn()}
                className="font-bold text-amber-700 hover:underline cursor-pointer"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
