import { useState } from "react";
export default function FilterBar({ onFilter }) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleClick = () => {
    onFilter({ category, date });
  };

  return (
    <div className="flex gap-4 mb-4">
      <select value={category} onChange={e => setCategory(e.target.value)} className="input">
        <option value="">Все категории</option>
        <option value="экология">Экология</option>
        <option value="волонтёрство">Волонтёрство</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
      <button onClick={handleClick} className="btn bg-green-500 text-white">Фильтровать</button>
    </div>
  );
}
