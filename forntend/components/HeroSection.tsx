// react typescript component for hero section
import hero from "@/public/hero.png";
import { useTranslations } from "next-intl";
export default function HeroSection() {
  const t = useTranslations("HeroSection");
  return (
    <section className="my-4">
      <div
        className="container mx-auto
  mx-4 sm:mx-6 lg:mx-auto
  lg:w-[90%]
  w-auto
  h-[380px] sm:h-[420px] lg:h-[500px]
  bg-cover bg-center
  rounded-xl lg:rounded-2xl
  relative
"
        style={{ backgroundImage: `url(${hero.src})` }}
      >
        <div
          className="
        absolute inset-0
        bg-black/50
        rounded-xl lg:rounded-2xl
        flex flex-col
        items-center justify-center
        text-white
        px-4 sm:px-8
        text-center
      "
        >
          {/* Title */}
          <h1
            className="
          text-2xl sm:text-3xl lg:text-4xl
          font-bold
          mb-2
        "
          >
            {t("heroTitle")}
          </h1>

          {/* Description */}
          <p
            className="
          text-sm sm:text-base lg:text-lg
          max-w-xl
          mb-6
        "
          >
            {t("heroDescription")}
          </p>

          {/* Search */}
          <div
            className="
          relative
          w-full sm:w-[80%] lg:w-[50%]
          max-w-xl
        "
          >
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="
            w-full
            px-4 py-3
            rounded-lg
            text-gray-700
            outline-none
            bg-white
          "
            />

            <button
              className="
            absolute
            top-1/2 -translate-y-1/2
            ltr:right-2 rtl:left-2
            bg-button-secondary
            text-button-secondary-text
            px-4 py-2
            rounded-md
            text-sm sm:text-base
          "
            >
              {t("searchButton")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
