// components/CategoryFilter.js
const categories = ['Sommiers', 'Combo', 'Respaldo', 'Sillones', 'Almohadas','Box','Todos',];

export const CategoryFilter = ({ onCategoryChange }) => {
  return (
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}                       className={`hover:bg-red-950/80 text-slate-50 py-1  bg-red-950 m-1  my-2 px-2 rounded-lg`}        >
          {category}
        </button>
      ))}
    </div>
  );
};


