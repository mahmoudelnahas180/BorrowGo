// create a component for best tool using typescript
import ToolCard from "./ToolCard";
import Hero from "@/public/hero.png";
export default function BestTool() {
  const tool = [
    {
      id: 1,
      name: "Tool 1",
      image: Hero,
      price: 10,
      description: "Tool 1 description",
    },
    {
      id: 2,
      name: "Tool 2",
      image: Hero,
      price: 20,
      description: "Tool 2 description",
    },
    {
      id: 3,
      name: "Tool 3",
      image: Hero,
      price: 30,
      description: "Tool 3 description",
    },
    {
      id: 4,
      name: "Tool 4",
      image: Hero,
      price: 40,
      description: "Tool 4 description",
    },
    {
      id: 5,
      name: "Tool 5",
      image: Hero,
      price: 50,
      description: "Tool 5 description",
    },
    {
      id: 6,
      name: "Tool 6",
      image: Hero,
      price: 60,
      description: "Tool 6 description",
    },
    {
      id: 7,
      name: "Tool 7",
      image: Hero,
      price: 70,
      description: "Tool 7 description",
    },
    {
      id: 8,
      name: "Tool 8",
      image: Hero,
      price: 80,
      description: "Tool 8 description",
    },
    {
      id: 9,
      name: "Tool 9",
      image: Hero,
      price: 90,
      description: "Tool 9 description",
    },
    {
      id: 10,
      name: "Tool 10",
      image: Hero,
      price: 100,
      description: "Tool 10 description",
    },
    {
      id: 11,
      name: "Tool 11",
      image: Hero,
      price: 110,
      description: "Tool 11 description",
    },
  ];
  return (
    <section className="my-8">
      <div className="container mx-auto bg-surface rounded-3xl shadow-sm p-8">
        <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-400">
          {tool.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
