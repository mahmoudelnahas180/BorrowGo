import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
const CategoryCard = () => {
  const t = useTranslations("Categories");
  const tc = useTranslations("categorieObject");
  const categories = [
    {
      id: 1,
      name: tc("name"),
      example: tc("example"),
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: tc("name"),
      example: tc("example"),
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 3,
      name: tc("name"),
      example: tc("example"),
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      name: tc("name"),
      example: tc("example"),
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  return (
    <>
      {categories.map((category) => (
        <Link
          href={`/categories/${category.id}`}
          key={category.id}
          className="
      group
      bg-surface
      rounded-2xl
      overflow-hidden
      border border-border
      shadow-sm
      hover:shadow-lg
      transition-all duration-300
    "
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="
          object-cover
          transition-transform duration-300
          group-hover:scale-105
        "
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-text-primary text-lg font-semibold mb-1">
              {category.name}
            </h3>

            <p className="text-text-secondary text-sm line-clamp-2">
              {category.example}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CategoryCard;
