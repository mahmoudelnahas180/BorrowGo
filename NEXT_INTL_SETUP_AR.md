# دليل إعداد وتشغيل تعدد اللغات (Internationalization) باستخدام next-intl

هذا الدليل يشرح الخطوات التي تم اتخاذها لتفعيل اللغة العربية والإنجليزية في مشروع Next.js (App Router) الحالي.

## 1. التثبيت (Installation)

أولاً، يجب تثبيت مكتبة `next-intl`:

```bash
npm install next-intl
```

## 2. هيكلة الملفات (File Structure)

تم إنشاء هيكل الملفات التالي لدعم اللغات:

```
/
├── messages/           # ملفات الترجمة (ملف لكل لغة)
│   ├── en.json
│   └── ar.json
├── i18n/               # إعدادات المكتبة
│   ├── request.ts      # تحميل ملفات الترجمة
│   ├── routing.ts      # تعريف اللغات
│   └── navigation.ts   # أدوات التنقل (Link, useRouter, etc.)
├── app/
│   ├── [locale]/       # المجلد الرئيسي للمسارات المترجمة
│   │   ├── layout.tsx  # Layout خاص باللغات (يوفر NextIntlClientProvider)
│   │   └── page.tsx    # الصفحة الرئيسية
│   ├── page.tsx        # صفحة الجذر (تقوم بإعادة التوجيه للغة الافتراضية)
│   └── layout.tsx      # Layout الجذر (أساسي جداً)
├── middleware.ts       # وسيط لتوجيه المسارات حسب اللغة
└── next.config.ts      # تفعيل إضافة next-intl
```

## 3. ملفات الإعداد (Configuration)

### أ. ملفات الترجمة (`messages/*.json`)

تحتوي على النصوص بملفات JSON.
مثال (`messages/en.json`):

```json
{
  "HomePage": {
    "title": "Hello world!"
  }
}
```

### ب. إعداد التوجيه (`i18n/routing.ts`)

يحدد اللغات المدعومة واللغة الافتراضية.

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed", // أو "always"
});
```

### ج. طلب وتحميل الترجمة (`i18n/request.ts`)

يقوم بتحميل ملف الـ JSON بناءً على اللغة المطلوبة.

### د. تعريف أدوات التنقل (`i18n/navigation.ts`)

نستخدم هذه الأدوات بدلاً من أدوات `next/navigation` و `next/link` العادية لضمان بقاء اللغة في الرابط.

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

### هـ. الوسيط (`middleware.ts`)

ملف مهم جداً في الجذر، يقوم باعتراض الطلبات وتوجيهها للغة المناسبة (مثلاً تحويل `/` إلى `/en`).

### و. `next.config.ts`

يجب تغليف إعدادات Next.js بـ `withNextIntl`.

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
```

## 4. هيكلة App Router

### المجلد `app/[locale]`

هذا هو "المجلد السحري". أي صفحة بداخله ستحصل على `locale` (اللغة الحالية) كـ `param`.

**`app/[locale]/layout.tsx`**:
هنا نستخدم `NextIntlClientProvider` لتوفير الترجمات لكل المكونات (Client Components) بداخله.

```tsx
const messages = await getMessages();
return (
  <NextIntlClientProvider messages={messages}>
    {children}
  </NextIntlClientProvider>
);
```

### الجذر `app/page.tsx`

هذه الصفحة تعمل فقط لإعادة توجيه المستخدم من `example.com` إلى `example.com/en`.

```tsx
import { redirect } from "next/navigation";
export default function RootPage() {
  redirect("/en");
}
```

## 5. الاستخدام داخل المكونات (Usage)

### عرض النصوص (Server & Client Components)

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}
```

### تغيير اللغة (Language Switcher)

أنشأنا `components/LanguageSwitcher.tsx` لتغيير اللغة باستخدام:

```tsx
import { usePathname, useRouter } from "@/i18n/navigation";

// ...
router.replace(pathname, { locale: "ar" });
```

---

**ملاحظة:** عند إضافة نص جديد، يجب إضافته في `messages/en.json` **و** `messages/ar.json` بنفس الاسم (Key).
