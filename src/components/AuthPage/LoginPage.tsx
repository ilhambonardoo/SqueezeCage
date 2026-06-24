"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useMounted } from "@/src/hooks/useMounted";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const mounted = useMounted();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login Berhasil!");
        router.push("/dashboard");
      } else {
        toast.error("Email/Username atau password salah!");
      }
    } catch {
      toast.error("Gagal terhubung ke server!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
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
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 mb-6">
              <Image
                width={50}
                height={50}
                alt="Logo Dark"
                src={"/logo/SuqueezeCage_Light.webp"}
              />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Masuk untuk mengelola peternakan Anda
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-semibold text-neutral-700 mb-2 ml-1"
              >
                Email atau Username
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                className="appearance-none block w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="nama@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-neutral-700"
                >
                  Kata Sandi
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white shadow-lg shadow-amber-200 transition-all transform active:scale-[0.98] ${
                isLoading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                <span> Masuk</span>
              )}
            </button>
            <p className="text-sm pt-8 text-neutral-500">
              Belum punya akun? Hubungi admin yang tertera di{" "}
              <a
                href="https://wa.me/6285389371126"
                className="hover:text-black underline hover:font-semibold"
                target="_blank"
              >
                kontak
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
