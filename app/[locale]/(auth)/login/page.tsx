"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios from "@/lib/axios/axios";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/login", {
        email,
        password,
      });

      const token = res.data.data.token;

      // حفظ التوكن في localStorage والـ Cookies
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;

      // معرفة الـ Role من الـ Token ثم التحويل
      const decoded: any = jwtDecode(token);
      if (decoded.role === "admin") {
        window.location.href = "/ar/admin";
      } else {
        window.location.href = "/ar";
      }
    } catch (err) {
      alert("Login Failed");
      console.error(err);
    }
  };
  const t = useTranslations("LoginPage");

  return (
    <main className="min-h-[calc(100vh-80px)] bg-bg flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md bg-surface rounded-2xl border border-border shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-900 mb-1">
            {t("title")}
          </h1>
          <p className="text-text-secondary">{t("subtitle")}</p>
        </div>

        <form
          className="space-y-4"
          action="#"
          method="post"
          onSubmit={(e) => {
            handleLogin(e);
          }}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-text-primary">
              {t("email")}
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-text-primary">
              {t("password")}
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
              id="password"
              name="password"
              type="password"
              required
              placeholder={t("passwordPlaceholder")}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex items-center gap-2 text-text-secondary">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-border accent-primary"
              />
              {t("rememberMe")}
            </label>
            <Link
              href="/forgot-password"
              className="font-semibold text-primary hover:text-primary-600 transition-colors">
              {t("forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-button-primary px-4 py-3 font-bold text-button-primary-text transition-colors hover:bg-button-primary-hover">
            {t("signIn")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-text-secondary">
          {t("noAccount")}{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:text-primary-600 transition-colors">
            {t("createAccount")}
          </Link>
        </p>
      </section>
    </main>
  );
}
