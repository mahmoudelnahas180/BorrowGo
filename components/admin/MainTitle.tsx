export default function MainTitle({
  title,
  buttonadd,
}: {
  title: string;
  buttonadd?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        <button className="bg-button-primary hover:bg-button-primary-hover text-button-primary-text px-4 py-2 rounded-lg transition-colors shadow-sm">
          {buttonadd}
        </button>
      </div>
    </div>
  );
}
