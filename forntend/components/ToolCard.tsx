// create a component for tool card using typescript
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function ToolCard({ tool }: { tool: any }) {
  const t = useTranslations("ToolCard");
  return (
    <div className="bg-surface rounded-lg overflow-hidden ">
      <Image
        src={tool.image}
        alt={tool.name}
        width={100}
        height={100}
        className="w-full h-48 object-cover   "
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1>{tool.name}</h1>
          <p>{tool.price}</p>
        </div>
        <p className="text-sm text-gray-500">{tool.description}</p>
        {/* i need width 100% */}
        <Link
          href={`/tool/${tool.id}`}
          className="btn block text-white px-4 py-2 rounded-lg mt-5 text-center w-full"
        >
          {t("bookNow")}
        </Link>
      </div>
    </div>
  );
}
