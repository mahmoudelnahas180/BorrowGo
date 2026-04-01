import { MdDashboard, MdOutlineCategory, MdOutlineSell } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { RiNewspaperLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { IconType } from "react-icons";

export interface NavItem {
  titleKey: string;
  href: string;
  icon: IconType;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { titleKey: "dashboard", href: "/admin", icon: MdDashboard },
  { titleKey: "products", href: "/admin/products", icon: FaBoxArchive },
  { titleKey: "orders", href: "/admin/orders", icon: RiNewspaperLine },
  { titleKey: "categories", href: "/admin/categories", icon: BiCategoryAlt },
  {
    titleKey: "subcategories",
    href: "/admin/subcategories",
    icon: MdOutlineCategory,
  },
  { titleKey: "users", href: "/admin/users", icon: LuUsers },
  { titleKey: "coupons", href: "/admin/coupons", icon: MdOutlineSell },
];
