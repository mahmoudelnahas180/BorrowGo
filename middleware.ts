import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1️⃣ استخراج اللغة (ar أو en) والمسار بدون اللغة
  // مثال: /ar/admin -> المسار الصافي هو /admin واللغة ar
  const pathnameParts = pathname.split("/");
  const locale = routing.locales.includes(pathnameParts[1] as any)
    ? pathnameParts[1]
    : "ar";
  const purePathname = pathname.replace(`/${locale}`, "") || "/";
  // ❗ لو مفيش توكن وبيحاول يدخل admin
  if (!token && purePathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // if (token) {
  //   try {
  //     const decoded: any = jwtDecode(token);

  //     // 2️⃣ إذا كان المستخدم "عادي" ويحاول دخول صفحات الأدمين -> يرجعه للرئيسية بنفس لغته
  //     if (purePathname.startsWith("/admin") && decoded.role !== "admin") {
  //       return NextResponse.redirect(new URL(`/${locale}`, request.url));
  //     }

  //     // 3️⃣ إذا كان المستخدم "أدمن" ويفتح الصفحة الرئيسية أو الدخول -> يرسله للأدمين بنفس لغته
  //     const isAuthPage =
  //       purePathname.startsWith("/login") ||
  //       purePathname.startsWith("/register");
  //     const isRootPage = purePathname === "/";

  //     if (decoded.role === "admin" && (isAuthPage || isRootPage)) {
  //       return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
  //     }
  //   } catch (error) {
  //     console.error("❌ JWT Error:", error);
  //   }
  // }
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      console.log("Decoded Token:", decoded);

      // ✅ التحقق من انتهاء التوكن
      const currentTime = Date.now() / 1000; // بالثواني

      if (!decoded.exp || decoded.exp < currentTime) {
        const response = NextResponse.redirect(
          new URL(`/${locale}/login`, request.url),
        );

        // 🧹 حذف التوكن
        response.cookies.delete("token");

        return response;
      }

      // 🔒 حماية صفحات الأدمن
      if (purePathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }

      // 🔁 تحويل الأدمن تلقائيًا
      const isAuthPage =
        purePathname.startsWith("/login") ||
        purePathname.startsWith("/register");
      const isRootPage = purePathname === "/";

      if (decoded.role === "admin" && (isAuthPage || isRootPage)) {
        return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
      }
    } catch (error) {
      console.error("❌ JWT Error:", error);

      // ❌ التوكن بايظ -> امسحه وارجع login
      const response = NextResponse.redirect(
        new URL(`/${locale}/login`, request.url),
      );

      response.cookies.delete("token");

      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
