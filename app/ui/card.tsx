type CardItem = {
  id?: number;
  name: string;
  total: number;
  week: string;
};

type CardProps = {
  items: CardItem[];
};
const Card: React.FC<CardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition"
        >
          <span className="text-sm text-gray-500">{item.name}</span>

          <span className="text-2xl font-bold text-black">{item.total}</span>

          <span className="text-xs text-gray-400">{item.week}</span>
        </div>
      ))}
    </div>
  );
};

export default Card;
