import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type NavbarProps = {
  links: {
    name: string;
    href: string;
  }[];
};

export default function NavBar({ links }: NavbarProps) {
  const pathname = usePathname();
  const pathonly = pathname.replace(/^\/(en|ar)/, "");
  console.log(pathonly);
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-5 justify-between items-center bg">
        {links.map((link) => {
          const isActive = pathonly === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`no-underline text-base font-medium transition-colors duration-200 
                     ${
                       isActive
                         ? "text-link-active font-bold"
                         : "text-text-primary hover:text-primary"
                     }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
