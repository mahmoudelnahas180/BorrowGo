# Next Themes Master Guide

هذا الملف يجمع كل ما يخص `ThemeProvider` وخطوات الإعداد والاستخدام داخل مشروع Next.js (App Router) في هذا المستودع.

## 1) الهدف
- تفعيل وضعين للواجهة (Light/Dark) مع دعم نظام التشغيل.
- ربط الثيم بـ Tailwind عبر `class` على عنصر `html`.
- تجنب مشاكل الـ hydration عند تحميل الثيم.

## 2) المتطلبات
- مكتبة `next-themes`.
- تفعيل `darkMode: "class"` في Tailwind.
- وجود `ThemeProvider` مغلف على مستوى التطبيق.

## 3) الوضع الحالي في المشروع
- `ThemeProvider` موجود هنا: [components/theme-provider.tsx](forntend/components/theme-provider.tsx)
- مفعّل في الجذر هنا: [app/layout.tsx](forntend/app/layout.tsx)
- `Tailwind` مضبوط على `class` هنا: [tailwind.config.ts](forntend/tailwind.config.ts)

## 4) الخطوات الكاملة (من الصفر)

### الخطوة 1: تثبيت المكتبة
```bash
npm install next-themes
```

### الخطوة 2: إنشاء ThemeProvider
أنشئ الملف التالي أو تأكد أنه مطابق:
```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
```

### الخطوة 3: لف التطبيق بالـ Provider
في `RootLayout` (App Router):
```tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

> مهم: `suppressHydrationWarning` يقلل وميض الثيم عند بداية التحميل.

### الخطوة 4: تفعيل Tailwind للـ Dark Mode
في Tailwind config:
```ts
darkMode: "class",
```

### الخطوة 5: استخدام الثيم في المكونات
أي مكوّن يستخدم `useTheme` لازم يكون `"use client"`:
```tsx
"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
```

## 5) كيف يشتغل الربط مع Tailwind
- `next-themes` يضيف كلاس `dark` على عنصر `html`.
- Tailwind يقرأ الكلاس ويطبق قواعد `dark:`.

مثال:
```tsx
<div className="bg-white text-black dark:bg-black dark:text-white">
  Content
</div>
```

## 6) خيارات مهمة في NextThemesProvider
- `attribute="class"`: ضروري لـ Tailwind.
- `defaultTheme="system"`: يستخدم وضع النظام كافتراضي.
- `enableSystem`: يراقب تغييرات نظام التشغيل.
- `themes`: لو عندك ثيمات مخصصة (مثلا: `"dim"`, `"dark"`, `"light"`).
- `disableTransitionOnChange`: يمنع الوميض عند التبديل (اختياري).

مثال مع ثيمات مخصصة:
```tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  themes={["light", "dark", "dim"]}
>
  {children}
</NextThemesProvider>
```

## 7) أخطاء شائعة وحلولها
- **الثيم لا يتغير**: تأكد أن المكوّن فيه `"use client"` وأنك مستخدم `useTheme`.
- **Dark mode لا يعمل**: تأكد أن `darkMode: "class"` في Tailwind وأن `attribute="class"` موجود.
- **وميض عند التحميل**: تأكد من `suppressHydrationWarning` في `<html>`.
- **الـ theme undefined أول تحميل**: هذا طبيعي؛ اعمل guard لو محتاج:
```tsx
if (!theme) return null;
```

## 8) Checklist سريع
- [ ] `next-themes` مثبت
- [ ] [components/theme-provider.tsx](forntend/components/theme-provider.tsx) موجود
- [ ] [app/layout.tsx](forntend/app/layout.tsx) ملفوف بـ `ThemeProvider`
- [ ] [tailwind.config.ts](forntend/tailwind.config.ts) فيه `darkMode: "class"`
- [ ] زر التبديل مستخدم في مكوّن client

## 9) خطوات إضافية (اختياري)
- إضافة أيقونات للـ toggle.
- حفظ الثيم في Local Storage (موجود تلقائيا في `next-themes`).
- إنشاء ألوان خاصة للثيم في Tailwind.

---
لو محتاج أمثلة خاصة بالمشروع الحالي أو تصميم زر تبديل مخصص، قولي تعمل شكل إيه.
